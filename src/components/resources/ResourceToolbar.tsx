"use client";

import { motion } from "framer-motion";
import {
  Download,
  Printer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Resource, ProgramConfig } from "@/lib/program-resources";

interface ResourceToolbarProps {
  resource: Resource;
  programConfig: ProgramConfig;
  downloadLabel: string;
  saveAsPdfLabel: string;
}

export default function ResourceToolbar({
  resource,
  programConfig,
  downloadLabel,
  saveAsPdfLabel,
}: ResourceToolbarProps) {
  const { colors } = programConfig;

  const handlePrintPDF = () => {
    window.print();
  };

  const getDownloadButtonClasses = () => cn(
    "inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full text-white transition-colors",
    colors.primaryBg,
    `hover:${colors.primaryBg.replace("600", "700")}`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="mt-8 flex flex-wrap gap-3"
    >
      {/* Download button if available */}
      {resource.downloadUrl && (
        <a
          href={resource.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className={getDownloadButtonClasses()}
        >
          <Download className="w-5 h-5" />
          {downloadLabel}
        </a>
      )}

      {/* Print/Save as PDF button */}
      <button
        onClick={handlePrintPDF}
        data-print-hidden="true"
        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-full border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors"
      >
        <Printer className="w-5 h-5" />
        {saveAsPdfLabel}
      </button>
    </motion.div>
  );
}
