import React, { useEffect } from "react";
import {
  X,
  ShieldCheck,
  BookOpen,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center py-6 min-[340px]:py-8 sm:py-10 px-3 min-[340px]:px-4 sm:px-6 select-none animate-fade-in overflow-hidden">
      {/* Deep Velvet Wine-Black Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container - Floating In Viewport With Top & Bottom Margins (Not Full Screen) */}
      <div className="relative w-full max-w-5xl h-[82vh] sm:h-[86vh] my-auto bg-gradient-to-b from-[#1c0209] via-[#0d0106] to-[#040002] border-2 border-amber-400/60 rounded-xl sm:rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.3)] flex flex-col overflow-hidden z-10">
        {/* Top Header Bar - Clean Realtime View With No Download Option */}
        <div className="flex items-center justify-between px-2.5 min-[340px]:px-4 sm:px-6 py-2.5 sm:py-3.5 bg-gradient-to-r from-[#380616] via-[#24052e] to-[#0b1c2e] border-b-2 border-amber-400/50 shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-2xl bg-amber-500/25 border-2 border-amber-400/80 text-amber-300 shrink-0 shadow-lg shadow-amber-500/25">
              <BookOpen className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[8px] min-[340px]:text-[10px] font-mono font-black text-amber-300 uppercase tracking-widest bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40 shrink-0">
                  Realtime Viewer
                </span>
                <span className="hidden min-[480px]:inline-flex items-center gap-1 text-[10px] font-bold text-rose-300 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  Verified Directorate
                </span>
              </div>
              <h2 className="text-xs min-[340px]:text-sm sm:text-lg font-serif font-black text-white truncate mt-0.5">
                Abhivyakti 2026 Official Festival Rulebook
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-rose-950/80 hover:bg-rose-900 border-2 border-amber-400/50 text-amber-200 hover:text-white transition-all hover:scale-105"
              aria-label="Close Viewer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Realtime PDF Frame Container */}
        <div className="flex-1 w-full bg-[#110207] relative overflow-hidden flex flex-col">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            title="Official Abhivyakti 2026 Rulebook"
            className="w-full h-full border-none"
            style={{
              filter: "contrast(1.02)",
            }}
          />
        </div>

        {/* Bottom Status Strip */}
        <div className="px-3 min-[340px]:px-4 sm:px-6 py-2 bg-[#090104] border-t border-amber-400/30 flex items-center justify-between text-[10px] sm:text-xs text-amber-300/80 shrink-0">
          <span className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">22 Official Arenas • Four Days Of Cultural Brilliance</span>
          </span>
          <span className="font-mono text-rose-300 shrink-0 ml-2">52.6 MB PDF</span>
        </div>
      </div>
    </div>
  );
};

export default RulebookPdfModal;
