import React, { useEffect } from "react";
import {
  X,
  FileText,
  Download,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 min-[340px]:p-3 sm:p-5 select-none animate-fade-in overflow-hidden">
      {/* Deep Velvet Wine-Black Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container - Rendered Directly On Modal On Mobile & Desktop Alike */}
      <div className="relative w-full max-w-5xl h-[90vh] sm:h-[88vh] bg-gradient-to-b from-[#1c0209] via-[#0d0106] to-[#040002] border-2 border-amber-400/60 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.3)] flex flex-col overflow-hidden z-10">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#380616] via-[#24052e] to-[#0b1c2e] border-b-2 border-amber-400/50 shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-amber-500/25 border-2 border-amber-400/80 text-amber-300 shrink-0 shadow-lg shadow-amber-500/25">
              <BookOpen className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[9px] sm:text-[10px] font-mono font-black text-amber-300 uppercase tracking-widest bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                  Official Document
                </span>
                <span className="hidden min-[480px]:inline-flex items-center gap-1 text-[10px] font-bold text-rose-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  Verified Directorate
                </span>
              </div>
              <h2 className="text-xs min-[340px]:text-sm sm:text-lg font-serif font-black text-white truncate mt-0.5">
                Abhivyakti 2026 Official Festival Rulebook
              </h2>
            </div>
          </div>

          {/* Quick Action Toolbar - In-Modal Only, Never Leaves Or Opens External New Page */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Direct Download Button */}
            <a
              href={pdfUrl}
              download="Abhivyakti 2026 Official Festival Rulebook.pdf"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition-all shadow-md border border-emerald-300 hover:scale-105"
              title="Download Full PDF Document"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden min-[360px]:inline">Download</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-950/80 hover:bg-rose-900 border-2 border-amber-400/50 flex items-center justify-center text-amber-200 hover:text-white transition-all hover:scale-105"
              title="Close Document Viewer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            IN-MODAL PDF EMBEDDED VIEWER (Renders On Modal Itself On Mobile & Desktop)
            No new tab/page is ever opened - user views and inspects directly inside modal
            ========================================================================= */}
        <div className="flex-1 w-full h-full bg-[#0a0003] relative overflow-hidden flex flex-col">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
            title="Abhivyakti 2026 Official Rulebook PDF"
            className="w-full h-full border-0 bg-neutral-900"
          />
        </div>

        {/* Bottom Safety Info Strip */}
        <div className="px-3 sm:px-6 py-2 bg-gradient-to-r from-[#1c0209] via-[#0d0106] to-[#040002] border-t border-amber-400/30 flex items-center justify-between text-[10px] sm:text-xs text-rose-200/90 shrink-0">
          <div className="flex items-center gap-1.5 truncate">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate font-semibold">22 Official Arenas • Four Days Of Cultural Brilliance</span>
          </div>
          <span className="font-mono text-amber-300 shrink-0 font-bold">52.6 MB PDF</span>
        </div>
      </div>
    </div>
  );
};

export default RulebookPdfModal;
