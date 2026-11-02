import React, { useState } from "react";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { Footer } from "@/Components/Ui/Footer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import { EventGuidelineModal, GuidelineEventData } from "@/Components/Ui/EventGuidelineModal";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Download,
  CheckCircle2,
  BookOpen,
  Flame,
} from "lucide-react";

interface ScheduleItem {
  id: number;
  day: "Day 1" | "Day 2" | "Day 3" | "Day 4";
  date: string;
  time: string;
  title: string;
  category: string;
  venue: string;
  duration: string;
  round: string;
  isGrandFinale?: boolean;
  rules?: string;
}

const COMPLETE_SCHEDULE: ScheduleItem[] = [
  // Day 1: 18 Nov 2026 (Wednesday)
  {
    id: 1,
    day: "Day 1",
    date: "18 Nov 2026",
    time: "10:00 AM - 01:00 PM",
    title: "Groove-o-Mania (Dance - Round 1)",
    category: "Dance",
    venue: "Rajeshwari Auditorium",
    duration: "180 Mins",
    round: "Round 1 (Original Performances)",
    rules: "Solo (Max 3 Mins, 3M/3F per college), Duet (Max 3 Mins, 2 pairs), Group (Max 5 Mins, 1 team 6-10 students). All dance forms allowed. Evaluated on Choreography, Coordination, Energy, Costumes & Stage Presence.",
  },
  {
    id: 2,
    day: "Day 1",
    date: "18 Nov 2026",
    time: "10:00 AM - 01:00 PM",
    title: "Harmony Hustle (Singing - Round 1)",
    category: "Music",
    venue: "NIMS School of Law - LT 10 & 11",
    duration: "180 Mins",
    round: "Round 1 (Prelims)",
    rules: "Solo (Max 3 Mins, 3M/3F), Duet (Max 3 Mins, 2 pairs), Group (Max 5 Mins, 1 team 6-10 students), Rap (Single round). Karaoke permitted. One accompanist permitted where applicable. Judged on Swara, Taal, Song Selection, Voice Quality & Expression.",
  },
  {
    id: 3,
    day: "Day 1",
    date: "18 Nov 2026",
    time: "02:00 PM - 05:00 PM",
    title: "Spellbound (Spell Bee - Round 1)",
    category: "Literature",
    venue: "Marik / Moot Court",
    duration: "180 Mins",
    round: "Round 1 (Dictation Round)",
    rules: "5 Solo participants per college (at least 1 female). Round 1 Dictation consists of 20 words dictated to all. Top 30 participants advance to Round 2 Moderate Spell Bee. Four-round elimination tournament.",
  },
  {
    id: 4,
    day: "Day 1",
    date: "18 Nov 2026",
    time: "02:00 PM - 05:00 PM",
    title: "Alfaaz Unplugged (Poetry Slam – Hindi & English)",
    category: "Literature",
    venue: "Marik / NIET",
    duration: "180 Mins",
    round: "Finals",
    rules: "5 Solo participants per language per college. 15 Minutes on-spot preparation, 2-3 minutes performance time. Must create original poetry on the spot without external reference. Judged on Originality, Writing, Imagery, Voice & Stage Presence.",
  },

  // Day 2: 19 Nov 2026 (Thursday)
  {
    id: 5,
    day: "Day 2",
    date: "19 Nov 2026",
    time: "09:00 AM - 09:30 AM",
    title: "RangRush (Rangoli)",
    category: "Fine Arts",
    venue: "School of Law",
    duration: "60 Mins",
    round: "Finals",
    rules: "2 Teams of 3-5 students per college. Rangoli size 3x3 feet. On-spot theme. All natural colors, petals, and powders brought by participants.",
  },
  {
    id: 6,
    day: "Day 2",
    date: "19 Nov 2026",
    time: "10:00 AM - 11:00 AM",
    title: "ReThread (Fashion Upcycling)",
    category: "Fashion",
    venue: "School of Law",
    duration: "60 Mins",
    round: "Finals",
    rules: "5 Solo participants per college (at least 1 female). Transform discarded old textiles into wearable runway garments live on the spot. New fabric strictly prohibited.",
  },
  {
    id: 7,
    day: "Day 2",
    date: "19 Nov 2026",
    time: "10:00 AM - 11:00 AM",
    title: "ScribbleSquad (Doodling)",
    category: "Fine Arts",
    venue: "School of Law",
    duration: "60 Mins",
    round: "Finals",
    rules: "5 Solo participants per college (at least 1 female). Theme provided on spot. Paper size A3. Black fine-liners and ink pens only.",
  },
  {
    id: 8,
    day: "Day 2",
    date: "19 Nov 2026",
    time: "11:00 AM - 12:00 PM",
    title: "BOT-Brush (AI Art Generation)",
    category: "Digital Arts",
    venue: "School of Law",
    duration: "30 Mins",
    round: "Finals",
    rules: "5 Solo participants per college (at least 1 female). Create an original poster based on on-spot theme using AI prompt workflow on personal device. JPG/PNG/PDF <= 5MB submitted via QR code.",
  },
  {
    id: 9,
    day: "Day 2",
    date: "19 Nov 2026",
    time: "11:00 AM - 12:00 PM",
    title: "Inked Expressions (Face Painting)",
    category: "Fine Arts",
    venue: "School of Law",
    duration: "60 Mins",
    round: "Finals",
    rules: "3 Male & 3 Female participants per college. Model arrives with clean face. Non-toxic skin-safe body paints mandatory. Stencils and pre-made sketches prohibited.",
  },
  {
    id: 10,
    day: "Day 2",
    date: "19 Nov 2026",
    time: "12:00 PM - 01:00 PM",
    title: "FONT-tastic (Calligraphy)",
    category: "Fine Arts",
    venue: "School of Law",
    duration: "30 Mins",
    round: "Finals",
    rules: "5 Solo participants per college (at least 1 female). Paper size A3. Freehand designated text using calligraphy pens. Ball pens and tracing strictly prohibited.",
  },
  {
    id: 11,
    day: "Day 2",
    date: "19 Nov 2026",
    time: "12:00 PM - 01:00 PM",
    title: "MUA Madness (MakeUp Contest)",
    category: "Fashion",
    venue: "School of Law",
    duration: "60 Mins",
    round: "Finals",
    rules: "5 Solo participants per college (at least 1 male). Model arrives clean-faced. Evaluated on blending technique, contouring, editorial impact, and hygiene.",
  },
  {
    id: 12,
    day: "Day 2",
    date: "19 Nov 2026",
    time: "02:00 PM - 03:00 PM",
    title: "Kick-Drip (Shoe Decoration Contest)",
    category: "Fashion",
    venue: "School of Law",
    duration: "60 Mins",
    round: "Finals",
    rules: "5 Solo participants per college (at least 1 female). Decorate a single pair of plain sneakers live on the spot with street art finishes, stencils, and acrylics.",
  },
  {
    id: 13,
    day: "Day 2",
    date: "19 Nov 2026",
    time: "02:00 PM - 03:00 PM",
    title: "Inkspire (Creative Writing – Hindi & English)",
    category: "Literature",
    venue: "School of Law",
    duration: "45 Mins",
    round: "Finals",
    rules: "5 Solo participants per language per college. Word limit 400-600 words on on-spot creative stimulus prompt. Evaluated on Originality, Imagination, Structure & Language.",
  },
  {
    id: 14,
    day: "Day 2",
    date: "19 Nov 2026",
    time: "03:00 PM - 05:00 PM",
    title: "Lit Check (Literature Quiz - Prelims)",
    category: "Literature",
    venue: "Rajeshwari Auditorium",
    duration: "120 Mins",
    round: "Prelims",
    rules: "1 Team of 4 students per college. Questioning round, audio clue round, and visual round across classic literature, poetry, drama, and world literary movements.",
  },

  // Day 3: 20 Nov 2026 (Friday)
  {
    id: 15,
    day: "Day 3",
    date: "20 Nov 2026",
    time: "09:00 AM - 11:00 AM",
    title: "SoloFlix (Mono Act)",
    category: "Theatre",
    venue: "Rajeshwari Auditorium",
    duration: "120 Mins",
    round: "Finals",
    rules: "3 Solo participants per college (at least 1 female). Maximum time 3 minutes. Judged on Acting Skills, Expressions, Voice Modulation, Concept Creativity & Stage Presence.",
  },
  {
    id: 16,
    day: "Day 3",
    date: "20 Nov 2026",
    time: "11:00 AM - 01:00 PM",
    title: "Groove-o-Mania (Dance - Round 2 Battle Round)",
    category: "Dance",
    venue: "Rajeshwari Auditorium",
    duration: "120 Mins",
    round: "Round 2 Battle Round",
    rules: "Head-to-head battle round for qualified Solo and Duet dancers with randomized tracks determined by lottery draw.",
  },
  {
    id: 17,
    day: "Day 3",
    date: "20 Nov 2026",
    time: "11:00 AM - 01:00 PM",
    title: "Harmony Hustle (Singing - Round 2 Battle Round)",
    category: "Music",
    venue: "NIMS School of Law - LT 10 & 11",
    duration: "120 Mins",
    round: "Round 2 Battle Round",
    rules: "Direct vocal acoustic face-off for qualified Solo and Duet entries before the festival adjudication panel.",
  },
  {
    id: 18,
    day: "Day 3",
    date: "20 Nov 2026",
    time: "02:00 PM - 05:00 PM",
    title: "Clash of Takes (Debate – Hindi & English)",
    category: "Literature",
    venue: "Marik / NIET",
    duration: "180 Mins",
    round: "Finals",
    rules: "2 Solo participants per language per college. 3 Minutes argument presentation followed by 1 minute rebuttal. For/Against stance allocated via chit system.",
  },
  {
    id: 19,
    day: "Day 3",
    date: "20 Nov 2026",
    time: "02:00 PM - 05:00 PM",
    title: "Lit Check (Literature Quiz - Grand Finale)",
    category: "Literature",
    venue: "Rajeshwari Auditorium",
    duration: "180 Mins",
    round: "Championship Finale",
    rules: "Top qualified contingent quiz teams compete in high-stakes rapid-fire, multimedia, and sudden-death buzzer rounds.",
  },

  // Day 4: 21 Nov 2026 (Saturday - Mega Grand Championship Finale)
  {
    id: 20,
    day: "Day 4",
    date: "21 Nov 2026",
    time: "09:00 AM - 11:00 AM",
    title: "Act-O-Graphy (Skit)",
    category: "Theatre",
    venue: "Rajeshwari Auditorium",
    duration: "120 Mins",
    round: "Finals",
    rules: "1 Team of 5-10 students per college. Maximum time 10 minutes. Evaluated on Script, Acting, Dialogue Delivery, Team Coordination & Overall Impact.",
  },
  {
    id: 21,
    day: "Day 4",
    date: "21 Nov 2026",
    time: "11:00 AM - 02:00 PM",
    title: "Championship Grand Finale: Groove-o-Mania & Harmony Hustle",
    category: "Dance & Music",
    venue: "Rajeshwari Auditorium",
    duration: "180 Mins",
    round: "Grand Finale",
    isGrandFinale: true,
    rules: "Championship final round for all qualified finalists across Solo, Duet, and Group categories in presence of the full student body and celebrity jury.",
  },
  {
    id: 22,
    day: "Day 4",
    date: "21 Nov 2026",
    time: "05:00 PM - 07:00 PM",
    title: "Couture Clique (Fashion Show – 'The Creative Couture Challenge')",
    category: "Fashion",
    venue: "University Cricket Ground",
    duration: "120 Mins",
    round: "Mega Finale",
    isGrandFinale: true,
    rules: "1 Team of 8-15 students per college. Maximum time 8 minutes. Staged at the University Cricket Ground under stadium illumination! Theme: 'The Creative Couture Challenge'. Evaluated on Presentation, Walking Posture, Styling, Music & Choreography.",
  },
];

export const SchedulePage: React.FC = () => {
  const [activeDay, setActiveDay] = useState<"All" | "Day 1" | "Day 2" | "Day 3" | "Day 4">("Day 1");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Guideline Modal State
  const [selectedGuidelineEvent, setSelectedGuidelineEvent] = useState<GuidelineEventData | null>(null);
  const [isGuidelineModalOpen, setIsGuidelineModalOpen] = useState(false);

  const categories = ["All", "Dance", "Music", "Fine Arts", "Fashion", "Drama", "Digital Arts", "Creative Arts"];

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Dance":
        return "bg-rose-950/70 border-rose-500/40 text-rose-300";
      case "Music":
        return "bg-amber-950/70 border-amber-500/40 text-amber-300";
      case "Fashion":
        return "bg-purple-950/70 border-purple-500/40 text-purple-300";
      case "Fine Arts":
      case "Creative Arts":
        return "bg-yellow-950/70 border-yellow-500/40 text-yellow-300";
      case "Digital Arts":
        return "bg-cyan-950/70 border-cyan-500/40 text-cyan-300";
      case "Drama":
        return "bg-red-950/70 border-red-500/40 text-red-300";
      default:
        return "bg-amber-500/15 border-amber-500/30 text-amber-300";
    }
  };

  const openGuidelines = (item: ScheduleItem) => {
    setSelectedGuidelineEvent({
      id: item.id,
      title: item.title,
      category: item.category,
      venue: item.venue,
      date: item.date,
      time: item.time,
      duration: item.duration,
      round: item.round,
      rules_summary: item.rules,
      first_place_points: 40,
      second_place_points: 25,
      third_place_points: 15,
    });
    setIsGuidelineModalOpen(true);
  };

  const filteredSchedule = COMPLETE_SCHEDULE.filter((item) => {
    const matchesDay = activeDay === "All" || item.day === activeDay;
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchesDay && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#0a0103] text-amber-50 relative selection:bg-amber-500 selection:text-black antialiased overflow-x-hidden">
      <FloatingBackgroundElements />
      <FestiveTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Master Fest Itinerary • 18-21 Nov 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Festival Schedule & Guidelines
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-2 leading-relaxed">
            Detailed 4-Day Timeline With Venues And Start Times. Click 'Guidelines & Rules' For Instant Event Parameter Rubrics.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#0d0104] p-4 rounded-2xl border border-rose-950">
          {/* Day Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
            {(["Day 1", "Day 2", "Day 3", "Day 4", "All"] as const).map((day) => {
              const labelMap: Record<string, string> = {
                "Day 1": "Day 1 (18 Nov)",
                "Day 2": "Day 2 (19 Nov)",
                "Day 3": "Day 3 (20 Nov)",
                "Day 4": "Day 4 (21 Nov)",
                All: "All (18-21 Nov)",
              };
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeDay === day
                      ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                      : "text-rose-200/70 hover:text-white hover:bg-rose-950/40"
                  }`}
                >
                  {labelMap[day]}
                </button>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-rose-900/60 text-amber-300 border border-amber-500/40"
                    : "text-rose-300/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all ${
                item.isGrandFinale
                  ? "bg-gradient-to-r from-[#200308] via-[#0d0104] to-[#200308] border-amber-500/50 shadow-2xl shadow-amber-950/20"
                  : "bg-[#0d0104] border-rose-950 hover:border-amber-500/40 hover:bg-[#130206]"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Time & Date Column */}
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 text-center">
                    <Clock className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-xs font-extrabold">{item.time}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-300">{item.day}</span>
                    <p className="text-sm font-black text-white">{item.date}</p>
                    <span className="text-[11px] text-rose-300/70">{item.duration} Duration</span>
                  </div>
                </div>

                {/* Event Name & Category */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryBadgeClass(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-300 border border-rose-900/40">
                      {item.round}
                    </span>
                    {item.isGrandFinale && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-black flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-current" />
                        Grand Finale
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Venue & Guidelines Action Buttons */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#080103] border border-rose-950 md:min-w-[190px]">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="text-xs text-rose-200/90 truncate">{item.venue}</span>
                  </div>

                  {/* Attached Guidelines Modal Trigger */}
                  <button
                    onClick={() => openGuidelines(item)}
                    className="p-2.5 rounded-xl bg-[#1c0409] hover:bg-amber-500 hover:text-black text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1.5 text-xs font-bold shadow-md shrink-0"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="hidden sm:inline">Guidelines</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      {/* Guidelines Modal Attached Directly To Events */}
      <EventGuidelineModal
        isOpen={isGuidelineModalOpen}
        onClose={() => setIsGuidelineModalOpen(false)}
        event={selectedGuidelineEvent}
      />
    </div>
  );
};
export default SchedulePage;
