import React, { useEffect } from "react";
import {
  X,
  FileText,
  Download,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none animate-fade-in">
      {/* Deep Velvet Wine Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Container - Padded, Rounded, Never Edge-To-Edge On Mobile */}
      <div className="relative w-full max-w-5xl h-auto max-h-[86vh] sm:h-[88vh] bg-gradient-to-b from-[#180307] via-[#0d0104] to-[#050002] border-2 border-amber-500/40 rounded-3xl shadow-2xl shadow-rose-950/80 flex flex-col overflow-hidden z-10">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#140206] border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/35 text-amber-300 shrink-0">
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
                Abhivyakti 2026 Official Rulebook & Guidelines
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
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#22040b] hover:bg-rose-950 border border-amber-500/30 text-amber-200 text-xs font-bold transition-all shadow-sm"
              title="Open Full PDF In New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open In New Tab</span>
              <span className="sm:hidden">Open</span>
            </a>

            {/* Direct Download Button */}
            <a
              href={pdfUrl}
              download="Abhivyakti 2026 Official Festival Rulebook.pdf"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black text-xs font-black transition-all shadow-md shadow-amber-500/25"
              title="Download Full PDF Document"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">Download</span>
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

        {/* =========================================================================
            DESKTOP PDF EMBEDDED VIEWER (Hidden On Mobile To Prevent PDF Freeze)
            ========================================================================= */}
        <div className="hidden sm:flex flex-1 w-full bg-[#120205] relative overflow-hidden flex-col">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1`}
            title="Abhivyakti 2026 Official Rulebook PDF"
            className="w-full h-full border-0 rounded-b-3xl bg-neutral-900"
          />
        </div>

        {/* =========================================================================
            MOBILE OPTIMIZED DOCUMENT HUB (Padded, Beautiful & Reliable)
            Solves 52MB Embedded PDF Freezing On Mobile Chrome & Safari
            ========================================================================= */}
        <div className="sm:hidden flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#140206] to-[#070002] custom-scrollbar">
          {/* Main Document Summary Card */}
          <div className="p-4 rounded-2xl bg-[#1c0309] border border-amber-500/30 text-center shadow-lg">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-3 shadow-md">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-black text-base text-amber-100">
              Official Festival Rulebook
            </h3>
            <p className="text-xs text-rose-200/80 mt-1 leading-relaxed">
              Complete Manual Covering Eligibility, Guidelines, Time Limits, And Scoring Rubrics For All 22 Competitions.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Official 52.6 MB PDF Document</span>
            </div>
          </div>

          {/* Primary Mobile Action Buttons (Full Width, Easy-To-Tap) */}
          <div className="space-y-2.5">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 active:scale-95 transition-transform"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Full PDF In Browser</span>
            </a>

            <a
              href={pdfUrl}
              download="Abhivyakti 2026 Official Festival Rulebook.pdf"
              className="w-full py-3.5 px-4 rounded-xl bg-[#22040b] border border-amber-500/40 text-amber-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-rose-950 active:scale-95 transition-transform shadow-md"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download PDF (52.6 MB)</span>
            </a>
          </div>

          {/* Quick Highlights Breakdown */}
          <div className="p-3.5 rounded-2xl bg-[#100104] border border-rose-950 space-y-2.5 text-left">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rulebook Key Highlights</span>
            </h4>
            <div className="space-y-2 text-xs text-rose-200/90">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Eligibility:</strong> All bonafide enrolled students across NIMS University Rajasthan are eligible.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Scoring Rubric:</strong> 🥇 40 Pts (1st), 🥈 25 Pts (2nd), 🥉 15 Pts (3rd) across 22 official events.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Reporting Discipline:</strong> Contingents must report 30 minutes prior to scheduled stage call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulebookPdfModal;
