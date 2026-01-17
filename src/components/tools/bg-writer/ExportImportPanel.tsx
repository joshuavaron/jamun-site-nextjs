"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Download, Upload, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { useBGWriter } from "./BGWriterContext";

export function ExportImportPanel() {
  const t = useTranslations("BGWriter");
  const { draft, exportToJSON, importFromJSON } = useBGWriter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleExport = () => {
    if (!draft) return;

    const json = exportToJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bg-writer-${draft.country || "draft"}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const success = importFromJSON(text);
      setImportStatus(success ? "success" : "error");
      setTimeout(() => setImportStatus(null), 3000);
    } catch {
      setImportStatus("error");
      setTimeout(() => setImportStatus(null), 3000);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleExport}
        variant="outline"
        size="sm"
        disabled={!draft}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        {t("actions.exportJSON")}
      </Button>

      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          onClick={handleImportClick}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          {t("actions.importJSON")}
        </Button>

        {/* Status indicator */}
        <AnimatePresence>
          {importStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`absolute -bottom-8 left-0 flex items-center gap-1 whitespace-nowrap rounded-lg px-2 py-1 text-xs font-medium ${
                importStatus === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {importStatus === "success" ? (
                <>
                  <Check className="h-3 w-3" />
                  Imported!
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3" />
                  Invalid file
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
