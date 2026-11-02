import React from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Printer,
  Scale,
  Sparkles,
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
  const eventDate = event.event_date || event.date || "21–22 Nov 2026";
  const eventTime = event.start_time || event.time || "10:00 AM";
  const eventCategory = event.category || "Cultural";
  const eventRules =
    event.rules ||
    event.rules_summary ||
    "All participating students must adhere to the stipulated time limits, report 30 minutes prior to the stage coordinator, and respect the decision of the official jury.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[#0d0104] border border-amber-500/40 shadow-2xl shadow-rose-950/70 overflow-hidden flex flex-col relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#220409] via-[#1a0206] to-[#220409] border-b border-rose-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block">
                NIMS Abhivyakti 2026 Directorate Guidelines
              </span>
              <h2 className="font-serif text-lg sm:text-xl font-black text-white leading-tight">
                {eventTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-rose-950/60 hover:bg-rose-900/60 border border-rose-900/60 flex items-center justify-center text-rose-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-rose-200/90 custom-scrollbar">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-[#140206] border border-rose-950/80 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-400/80 block">Category</span>
              <p className="font-bold text-amber-300 mt-0.5">{eventCategory}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-400/80 block">Schedule Date</span>
              <p className="font-bold text-white mt-0.5">{eventDate}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-400/80 block">Start Time</span>
              <p className="font-bold text-amber-300 mt-0.5">{eventTime}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-400/80 block">Designated Venue</span>
              <p className="font-bold text-white mt-0.5 truncate">{eventVenue}</p>
            </div>
          </div>

          {/* Points Allocation Bar */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Championship Points Allocation</span>
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-[#170306] border border-amber-500/30">
                <span className="text-xl">🥇</span>
                <p className="text-[11px] font-black text-amber-300 mt-1">1st Place</p>
                <p className="text-sm font-black text-white">40 Points</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#170306] border border-zinc-400/30">
                <span className="text-xl">🥈</span>
                <p className="text-[11px] font-black text-zinc-300 mt-1">2nd Place</p>
                <p className="text-sm font-black text-white">25 Points</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#170306] border border-amber-800/30">
                <span className="text-xl">🥉</span>
                <p className="text-[11px] font-black text-amber-500 mt-1">3rd Place</p>
                <p className="text-sm font-black text-white">15 Points</p>
              </div>
            </div>
          </div>

          {/* Event Official Rules */}
          <div className="p-4 rounded-2xl bg-[#140206] border border-rose-950/90 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Official Competition Rules & Parameters</span>
            </h3>
            <p className="text-xs text-rose-200/90 leading-relaxed whitespace-pre-line">
              {eventRules}
            </p>
          </div>

          {/* 4-Pillar Evaluation Rubric */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2.5 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Four-Pillar Evaluation Rubric (25 Pts Each)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-[#130206] border border-rose-950 text-xs">
                <span className="text-[10px] font-black text-amber-400">Pillar 1 (25 Pts)</span>
                <p className="font-bold text-white mt-0.5">Creativity & Innovation</p>
                <p className="text-[11px] text-rose-300/70 mt-1">
                  Artistic uniqueness, concept depth, and fresh interpretation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#130206] border border-rose-950 text-xs">
                <span className="text-[10px] font-black text-amber-400">Pillar 2 (25 Pts)</span>
                <p className="font-bold text-white mt-0.5">Technical Mastery</p>
                <p className="text-[11px] text-rose-300/70 mt-1">
                  Rhythm, pitch, stroke technique, craft, or choreography precision.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#130206] border border-rose-950 text-xs">
                <span className="text-[10px] font-black text-amber-400">Pillar 3 (25 Pts)</span>
                <p className="font-bold text-white mt-0.5">Stage Impact & Presence</p>
                <p className="text-[11px] text-rose-300/70 mt-1">
                  Audience engagement, aesthetic presentation, and confidence.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#130206] border border-rose-950 text-xs">
                <span className="text-[10px] font-black text-amber-400">Pillar 4 (25 Pts)</span>
                <p className="font-bold text-white mt-0.5">Time & Code Discipline</p>
                <p className="text-[11px] text-rose-300/70 mt-1">
                  Punctual reporting, strict adherence to time limit, and decorum.
                </p>
              </div>
            </div>
          </div>

          {/* Prohibited Items Warning */}
          <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-800/40 text-xs text-rose-300 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-rose-200">Disqualification Notice:</strong>
              <p className="text-[11px] text-rose-300/80 mt-0.5 leading-relaxed">
                Use of flammable substances, hazardous props, obscene content, or unsportsmanlike conduct results in immediate disqualification and forfeiture of contingent points.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#140206] border-t border-rose-950/80 flex items-center justify-between shrink-0">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-bold transition-all flex items-center gap-1.5 border border-rose-900/60"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Rule Sheet</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-md shadow-amber-500/20"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default EventGuidelineModal;

