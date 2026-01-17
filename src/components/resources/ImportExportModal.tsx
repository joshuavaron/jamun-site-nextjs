"use client";

/**
 * ImportExportModal Component
 *
 * Modal for sharing/importing user selections via encoded strings.
 * Encodes bookmarked headings and selected subpoints into compact codes.
 *
 * Encoding: Binary bitmap → BigInt → Base-36 string
 * - Stable element ordering ensures codes work across devices
 * - Compact representation for sharing
 *
 * Uses shared storage from: @/components/mdx/subpoint-storage
 */

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { X, Copy, Check, Upload, Download, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SELECTION_CHANGE_EVENT } from "@/components/mdx/subpoint-helpers";
import {
  loadSelections,
  saveSelections,
  loadBookmarks,
  saveBookmarks,
} from "@/components/mdx/subpoint-storage";

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Encoding algorithm:
 * 1. Scan the page for all saveable elements (headings with IDs, subpoint paragraphs)
 * 2. Create a stable ordered list of all element IDs
 * 3. Create a binary string where 1 = saved, 0 = not saved
 * 4. Convert binary to BigInt, then to base-36 string (0-9, A-Z)
 *
 * This ensures:
 * - Same page structure = same element order = same codes across devices
 * - Compact representation (binary → base-36 compression)
 * - Human-readable alphanumeric codes
 */

function getAllSaveableElementIds(): string[] {
  const ids: string[] = [];

  // Get all headings with IDs (h1, h2, h3)
  const headings = document.querySelectorAll("h1[id], h2[id], h3[id]");
  headings.forEach((el) => {
    if (el.id) {
      ids.push(`h:${el.id}`);
    }
  });

  // Get all subpoint paragraphs
  const subpoints = document.querySelectorAll(".subpoint-paragraph[id]");
  subpoints.forEach((el) => {
    if (el.id) {
      ids.push(`s:${el.id}`);
    }
  });

  // Sort for consistent ordering across devices
  ids.sort();

  return ids;
}

function encodeState(
  bookmarkedHeadings: Set<string>,
  selectedSubpoints: Set<string>
): string {
  const allIds = getAllSaveableElementIds();

  if (allIds.length === 0) return "0";

  // Create binary string (reversed so index 0 is least significant bit)
  let binary = "";
  for (let i = allIds.length - 1; i >= 0; i--) {
    const id = allIds[i];
    let isSelected = false;

    if (id.startsWith("h:")) {
      isSelected = bookmarkedHeadings.has(id.slice(2));
    } else if (id.startsWith("s:")) {
      isSelected = selectedSubpoints.has(id.slice(2));
    }

    binary += isSelected ? "1" : "0";
  }

  // Convert binary to BigInt, then to base-36
  const bigInt = BigInt("0b" + binary);
  return bigInt.toString(36).toUpperCase();
}

function decodeState(code: string): { headings: Set<string>; subpoints: Set<string> } | null {
  const allIds = getAllSaveableElementIds();
  const headings = new Set<string>();
  const subpoints = new Set<string>();

  if (!code || code === "0") {
    return { headings, subpoints };
  }

  try {
    // Parse base-36 to BigInt (handle arbitrarily large numbers)
    let bigIntValue: bigint;
    try {
      const base = BigInt(36);
      bigIntValue = code.split('').reduce((acc: bigint, char: string) => {
        const digit = parseInt(char, 36);
        if (isNaN(digit)) throw new Error("Invalid character");
        return acc * base + BigInt(digit);
      }, BigInt(0));
    } catch {
      return null;
    }

    // Convert to binary string
    let binary = bigIntValue.toString(2);

    // Pad to match number of elements
    while (binary.length < allIds.length) {
      binary = "0" + binary;
    }

    // If binary is longer than elements, code is invalid for this page
    if (binary.length > allIds.length) {
      return null;
    }

    // Parse binary string (reversed - index 0 in binary is most significant)
    for (let i = 0; i < allIds.length; i++) {
      const isSelected = binary[binary.length - 1 - i] === "1";
      if (isSelected) {
        const id = allIds[i];
        if (id.startsWith("h:")) {
          headings.add(id.slice(2));
        } else if (id.startsWith("s:")) {
          subpoints.add(id.slice(2));
        }
      }
    }

    return { headings, subpoints };
  } catch {
    return null;
  }
}

export default function ImportExportModal({ isOpen, onClose }: ImportExportModalProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"export" | "import">("export");
  const [exportCode, setExportCode] = useState("");
  const [importCode, setImportCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");
  const [importError, setImportError] = useState("");

  // Generate export code when modal opens or tab changes to export
  const generateExportCode = useCallback(() => {
    const bookmarks = loadBookmarks(pathname);
    const selections = loadSelections(pathname);
    const code = encodeState(bookmarks, selections);
    setExportCode(code);
  }, [pathname]);

  useEffect(() => {
    if (isOpen && activeTab === "export") {
      // Small delay to ensure DOM is ready
      setTimeout(generateExportCode, 100);
    }
  }, [isOpen, activeTab, generateExportCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = exportCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleImport = () => {
    const trimmedCode = importCode.trim().toUpperCase();

    if (!trimmedCode) {
      setImportStatus("error");
      setImportError("Please enter a code");
      return;
    }

    // Validate characters (only 0-9, A-Z)
    if (!/^[0-9A-Z]+$/.test(trimmedCode)) {
      setImportStatus("error");
      setImportError("Invalid code format. Use only letters and numbers.");
      return;
    }

    const decoded = decodeState(trimmedCode);

    if (!decoded) {
      setImportStatus("error");
      setImportError("Invalid code for this page");
      return;
    }

    // Save using shared storage functions
    try {
      saveBookmarks(pathname, decoded.headings);
      saveSelections(pathname, decoded.subpoints);

      // Dispatch event to update UI
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent(SELECTION_CHANGE_EVENT));
      }, 0);

      setImportStatus("success");
      setImportError("");

      // Close modal after short delay
      setTimeout(() => {
        onClose();
        // Force page refresh to update all components
        window.location.reload();
      }, 1000);
    } catch {
      setImportStatus("error");
      setImportError("Failed to save. Please try again.");
    }
  };

  const handleClose = () => {
    setImportCode("");
    setImportStatus("idle");
    setImportError("");
    setCopied(false);
    onClose();
  };

  // Don't render on server or if not open
  if (!isOpen || typeof document === 'undefined') return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Save State</h2>
          <button
            onClick={handleClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => {
              setActiveTab("export");
              setImportStatus("idle");
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
              activeTab === "export"
                ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50/50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => {
              setActiveTab("import");
              setCopied(false);
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
              activeTab === "import"
                ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50/50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            <Upload className="w-4 h-4" />
            Import
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "export" ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Share this code to restore your saved items on another device:
              </p>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={exportCode}
                  className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-center font-mono text-lg tracking-wider text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
                <button
                  onClick={handleCopy}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all",
                    copied
                      ? "bg-green-100 text-green-600"
                      : "hover:bg-gray-200 text-gray-500"
                  )}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 text-center">Copied to clipboard!</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Enter a code to restore saved items:
              </p>
              <input
                type="text"
                value={importCode}
                onChange={(e) => {
                  setImportCode(e.target.value.toUpperCase());
                  setImportStatus("idle");
                  setImportError("");
                }}
                placeholder="Enter code..."
                className={cn(
                  "w-full px-4 py-3 bg-gray-50 border rounded-xl text-center font-mono text-lg tracking-wider text-gray-900",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500",
                  "placeholder:text-gray-400 placeholder:font-sans placeholder:text-base placeholder:tracking-normal",
                  importStatus === "error" && "border-red-300 focus:ring-red-500/20 focus:border-red-500"
                )}
              />
              {importStatus === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {importError}
                </div>
              )}
              {importStatus === "success" && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="w-4 h-4" />
                  Imported successfully! Refreshing...
                </div>
              )}
              <button
                onClick={handleImport}
                disabled={importStatus === "success"}
                className={cn(
                  "w-full py-3 px-4 rounded-xl font-medium transition-all",
                  importStatus === "success"
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700 active:scale-[0.98]"
                )}
              >
                {importStatus === "success" ? "Imported!" : "Import"}
              </button>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Codes are specific to this page and encode your bookmarked headings and selected points.
          </p>
        </div>
      </div>
    </div>
  );

  // Use portal to render at document body level, outside any stacking contexts
  return createPortal(modalContent, document.body);
}
