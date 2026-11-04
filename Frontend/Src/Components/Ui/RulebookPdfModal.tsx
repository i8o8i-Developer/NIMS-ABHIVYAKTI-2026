import React, { useEffect, useState } from "react";
import {
  X,
  ShieldCheck,
  BookOpen,
  ExternalLink,
  Download,
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
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      setIframeLoaded(false);
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
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container In Harmonious Royal Velvet Obsidian */}
      <div className="relative w-full max-w-5xl h-[84vh] sm:h-[88vh] my-auto bg-gradient-to-b from-[#18030c] via-[#0f0107] to-[#080104] border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(245,184,66,0.22)] flex flex-col overflow-hidden z-10">
        {/* Harmonious Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#220412] via-[#19020d] to-[#220412] border-b border-amber-500/30 shrink-0 gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/60 text-amber-300 shrink-0 shadow-md shadow-amber-500/20">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] min-[340px]:text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-400/35 shrink-0">
                  Realtime Viewer
                </span>
                <span className="hidden min-[480px]:inline-flex items-center gap-1 text-[10px] font-bold text-rose-300/90 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Verified Directorate Seal
                </span>
              </div>
              <h2 className="text-xs min-[340px]:text-sm sm:text-base font-serif font-black text-white truncate">
                Abhivyakti 2026 Official Festival Rulebook
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 hover:text-white text-xs font-bold transition-all shadow-sm"
              title="Open Rulebook In Full New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Tab</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/15 hover:border-rose-400 text-gray-300 hover:text-white transition-all"
              aria-label="Close Viewer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Realtime PDF Frame Container With Harmonious Fallback */}
        <div className="flex-1 w-full bg-[#0a0105] relative overflow-hidden flex flex-col">
          {/* Subtle Ambient Placeholder While PDF Streams */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-0 bg-[#0d0106]">
              <div className="animate-live-flicker mb-4">
                <svg width="44" height="34" viewBox="0 0 44 34" fill="none" className="drop-shadow-[0_0_16px_rgba(245,184,66,0.7)]">
                  <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
                  <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FEF08A" />
                  <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
                  <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#D97706" />
                </svg>
              </div>
              <h3 className="font-serif font-black text-base text-amber-200 mb-1">
                Loading Master Festival Rulebook (52.6 MB)
              </h3>
              <p className="text-xs text-rose-200/70 max-w-md leading-relaxed mb-5">
                Streaming High-Resolution Guidelines, Stage Protocols, And 4-Pillar Scoring Rubrics Directly From NIMS Directorate.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 text-black font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open In New Tab</span>
                </a>
                <a
                  href={pdfUrl}
                  download="Abhivyakti-2026-Rulebook.pdf"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Direct Download</span>
                </a>
              </div>
            </div>
          )}

          {/* Embedded PDF Frame */}
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            title="Official Abhivyakti 2026 Rulebook"
            onLoad={() => setIframeLoaded(true)}
            className="w-full h-full border-none relative z-10"
            style={{
              filter: "contrast(1.02)",
            }}
          />
        </div>

        {/* Bottom Status Strip */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#090104] border-t border-amber-500/25 flex items-center justify-between text-[11px] sm:text-xs text-amber-200/80 shrink-0">
          <span className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">22 Official Arenas • Four Days Of Cultural Brilliance</span>
          </span>
          <div className="flex items-center gap-3 shrink-0 ml-2">
            <span className="font-mono text-rose-300 font-bold">52.6 MB PDF</span>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-200 font-bold underline transition-colors"
            >
              Open Full
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulebookPdfModal;
