import React from "react";
import {
  X,
  ShieldCheck,
  Award,
  BookOpen,
  Printer,
  Scale,
  Sparkles,
  Download,
  AlertTriangle,
} from "lucide-react";

export interface GuidelineEventData {
  id: number | string;
  title: string;
  category: string;
  arena?: string;
  venue: string;
  date?: string;
  event_date?: string;
  time?: string;
  start_time?: string;
  duration?: string;
  round?: string;
  max_participants?: number;
  rules_summary?: string;
  rules?: string;
  first_place_points?: number;
  second_place_points?: number;
  third_place_points?: number;
}

interface EventGuidelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: GuidelineEventData | null;
}

export const EventGuidelineModal: React.FC<EventGuidelineModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  if (!isOpen || !event) return null;

  const eventTitle = event.title;
  const eventVenue = event.venue;
  const eventDate = event.event_date || event.date || "18-21 Nov 2026";
  const eventTime = event.start_time || event.time || "10:00 AM";
  const eventCategory = event.category || "Cultural";
  const eventRules =
    event.rules ||
    event.rules_summary ||
    "All Participating Students Must Adhere To The Stipulated Time Limits, Report 30 Minutes Prior To The Stage Coordinator, And Respect The Official Verdict Of The Verified Directorate Jury.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 min-[340px]:p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#1c0209] via-[#0d0106] to-[#040002] border-2 border-amber-400/60 shadow-[0_0_40px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-3.5 sm:p-5 bg-gradient-to-r from-[#380616] via-[#24052e] to-[#0b1c2e] border-b-2 border-amber-400/50 flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-amber-500/25 border-2 border-amber-400/80 flex items-center justify-center text-amber-300 shrink-0 shadow-lg shadow-amber-500/25">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 block truncate">
                NIMS Abhivyakti 2026 Directorate Guidelines
              </span>
              <h2 className="font-serif text-sm sm:text-lg md:text-xl font-black text-white leading-tight truncate mt-0.5">
                {eventTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-950/80 hover:bg-rose-900 border-2 border-amber-400/50 flex items-center justify-center text-amber-200 hover:text-white transition-all shrink-0 hover:scale-105"
            aria-label="Close Guidelines"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-xs sm:text-sm custom-scrollbar">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#38091d]/90 to-[#17020a] border-2 border-pink-500/60 shadow-md">
              <span className="text-[9px] sm:text-[10px] uppercase font-black text-pink-300 block">Category</span>
              <p className="font-black text-white text-xs sm:text-sm mt-0.5 truncate">{eventCategory}</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#3d2406]/90 to-[#180e02] border-2 border-amber-400/60 shadow-md">
              <span className="text-[9px] sm:text-[10px] uppercase font-black text-amber-300 block">Schedule Date</span>
              <p className="font-black text-white text-xs sm:text-sm mt-0.5 truncate">{eventDate}</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#082a45]/90 to-[#03131c] border-2 border-cyan-400/60 shadow-md">
              <span className="text-[9px] sm:text-[10px] uppercase font-black text-cyan-300 block">Start Time</span>
              <p className="font-black text-white text-xs sm:text-sm mt-0.5 truncate">{eventTime}</p>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#06331e]/90 to-[#011209] border-2 border-emerald-400/60 shadow-md">
              <span className="text-[9px] sm:text-[10px] uppercase font-black text-emerald-300 block">Designated Venue</span>
              <p className="font-black text-white text-xs sm:text-sm mt-0.5 truncate">{eventVenue}</p>
            </div>
          </div>

          {/* Points Allocation Bar */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-300 mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Championship Points Allocation</span>
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#3a2004] via-[#241302] to-[#120701] border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]">
                <span className="text-lg sm:text-xl">🥇</span>
                <p className="text-[10px] sm:text-[11px] font-black text-amber-300 mt-0.5">1st Place</p>
                <p className="text-xs sm:text-sm font-black text-white">{event.first_place_points || 40} Points</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#182b47] via-[#0f1d33] to-[#08101d] border-2 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.35)]">
                <span className="text-lg sm:text-xl">🥈</span>
                <p className="text-[10px] sm:text-[11px] font-black text-cyan-300 mt-0.5">2nd Place</p>
                <p className="text-xs sm:text-sm font-black text-white">{event.second_place_points || 25} Points</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#3d1808] via-[#260f05] to-[#140702] border-2 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.35)]">
                <span className="text-lg sm:text-xl">🥉</span>
                <p className="text-[10px] sm:text-[11px] font-black text-orange-300 mt-0.5">3rd Place</p>
                <p className="text-xs sm:text-sm font-black text-white">{event.third_place_points || 15} Points</p>
              </div>
            </div>
          </div>

          {/* Event Official Rules */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#24040e]/95 to-[#120207] border-2 border-rose-500/50 shadow-xl space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Official Competition Rules & Parameters</span>
            </h3>
            <p className="text-xs text-rose-100 leading-relaxed whitespace-pre-line font-medium">
              {eventRules}
            </p>
          </div>

          {/* 4-Pillar Evaluation Rubric */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-300 mb-2.5 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Four-Pillar Evaluation Rubric (25 Pts Each)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              <div className="p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#38091d]/90 to-[#18030c] border-2 border-pink-500/60 shadow-md text-xs">
                <span className="text-[10px] font-black text-pink-300 uppercase">Pillar 1 (25 Pts)</span>
                <p className="font-serif font-black text-white mt-0.5 text-xs sm:text-sm">Creativity & Innovation</p>
                <p className="text-[11px] text-pink-200/80 mt-1 leading-snug">
                  Artistic Uniqueness, Concept Depth, And Fresh Creative Interpretation.
                </p>
              </div>

              <div className="p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#3d2406]/90 to-[#180e02] border-2 border-amber-400/60 shadow-md text-xs">
                <span className="text-[10px] font-black text-amber-300 uppercase">Pillar 2 (25 Pts)</span>
                <p className="font-serif font-black text-white mt-0.5 text-xs sm:text-sm">Technical Mastery</p>
                <p className="text-[11px] text-amber-200/80 mt-1 leading-snug">
                  Rhythm, Pitch, Stroke Technique, Craft, And Choreography Precision.
                </p>
              </div>

              <div className="p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#2d0947]/90 to-[#12031c] border-2 border-purple-400/60 shadow-md text-xs">
                <span className="text-[10px] font-black text-purple-300 uppercase">Pillar 3 (25 Pts)</span>
                <p className="font-serif font-black text-white mt-0.5 text-xs sm:text-sm">Stage Impact & Presence</p>
                <p className="text-[11px] text-purple-200/80 mt-1 leading-snug">
                  Audience Engagement, Aesthetic Presentation, And Stage Confidence.
                </p>
              </div>

              <div className="p-3 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#082a45]/90 to-[#03131c] border-2 border-cyan-400/60 shadow-md text-xs">
                <span className="text-[10px] font-black text-cyan-300 uppercase">Pillar 4 (25 Pts)</span>
                <p className="font-serif font-black text-white mt-0.5 text-xs sm:text-sm">Time & Code Discipline</p>
                <p className="text-[11px] text-cyan-200/80 mt-1 leading-snug">
                  Punctual Reporting, Strict Adherence To Time Limits, And Stage Decorum.
                </p>
              </div>
            </div>
          </div>

          {/* Prohibited Items Warning */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-rose-950/40 border-2 border-rose-500/60 text-xs text-rose-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-black text-rose-100 uppercase text-[11px]">Disqualification Notice:</strong>
              <p className="text-[11px] text-rose-200/90 mt-0.5 leading-relaxed">
                Use Of Flammable Substances, Hazardous Props, Obscene Content, Or Unsportsmanlike Conduct Results In Immediate Disqualification And Forfeiture Of Contingent Points.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer - Realtime Responsive View (No Download Button) */}
        <div className="p-2.5 sm:p-4 bg-gradient-to-r from-[#240410] via-[#1a031e] to-[#0c0112] border-t-2 border-amber-400/50 flex flex-col min-[480px]:flex-row items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2 w-full min-[480px]:w-auto">
            <button
              onClick={() => window.print()}
              className="w-full min-[480px]:w-auto px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-purple-800 to-fuchsia-700 text-white text-xs font-black transition-all flex items-center justify-center gap-1.5 border border-purple-300 shadow-md hover:scale-105"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Rule Sheet</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full min-[480px]:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 text-black text-xs font-black uppercase tracking-wider hover:scale-105 transition-transform shadow-lg shadow-amber-500/25 border-2 border-yellow-200"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventGuidelineModal;
