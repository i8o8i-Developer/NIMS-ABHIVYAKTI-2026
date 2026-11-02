import React, { useEffect } from "react";
import {
  X,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface RulebookPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulebookPdfModal: React.FC<RulebookPdfModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pdfUrl = "/AbhivyaktiRulebookFinal.pdf";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 select-none animate-fade-in">
      {/* Deep Velvet Wine Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[920px] bg-gradient-to-b from-[#180307] via-[#0d0104] to-[#050002] border-2 border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-2xl shadow-rose-950/80 flex flex-col overflow-hidden z-10">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#140206] border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/35 text-amber-300 shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Official Document
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-rose-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  Fest Directorate Verified
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-serif font-black text-amber-100 truncate mt-0.5">
                Abhivyakti 2026 Official Rulebook & Guidelines (PDF)
              </h2>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Open In New Tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#22040b] hover:bg-rose-950 border border-amber-500/30 text-amber-200 text-xs font-bold transition-all"
              title="Open PDF In New Browser Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open In New Tab</span>
            </a>

            {/* Direct Download Button */}
            <a
              href={pdfUrl}
              download="Abhivyakti 2026 Official Festival Rulebook.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black text-xs font-black transition-all shadow-md shadow-amber-500/25"
              title="Download Full PDF Document"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-950/60 hover:bg-rose-900 border border-rose-800/40 flex items-center justify-center text-rose-300 hover:text-white transition-colors"
              title="Close Document Viewer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* PDF Frame Viewer Body */}
        <div className="flex-1 w-full bg-[#120205] relative overflow-hidden flex flex-col">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1`}
            title="Abhivyakti 2026 Official Rulebook PDF"
            className="w-full h-full border-0 rounded-b-2xl sm:rounded-b-3xl bg-neutral-900"
          />

          {/* Fallback Banner For Mobile Browsers That Block Inline PDF Previews */}
          <div className="sm:hidden p-2.5 bg-[#1a0308] border-t border-amber-500/20 text-center text-[11px] text-amber-200 flex items-center justify-between gap-2">
            <span>Viewing On Mobile?</span>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-amber-400 font-bold"
            >
              Open Full PDF Directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulebookPdfModal;

