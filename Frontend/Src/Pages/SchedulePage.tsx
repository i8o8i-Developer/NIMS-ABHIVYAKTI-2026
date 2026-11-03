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
    rules: "Solo (Max 3 Mins, 3m/3f Per College), Duet (Max 3 Mins, 2 Pairs), Group (Max 5 Mins, 1 Team 6-10 Students). All Dance Forms Allowed. Evaluated On Choreography, Coordination, Energy, Costumes & Stage Presence.",
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
    rules: "Solo (Max 3 Mins, 3m/3f), Duet (Max 3 Mins, 2 Pairs), Group (Max 5 Mins, 1 Team 6-10 Students), Rap (Single Round). Karaoke Permitted. One Accompanist Permitted Where Applicable. Judged On Swara, Taal, Song Selection, Voice Quality & Expression.",
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
    rules: "5 Solo Participants Per College (At Least 1 Female). Round 1 Dictation Consists Of 20 Words Dictated To All. Top 30 Participants Advance To Round 2 Moderate Spell Bee. Four-Round Elimination Tournament.",
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
    rules: "5 Solo Participants Per Language Per College. 15 Minutes On-Spot Preparation, 2-3 Minutes Performance Time. Must Create Original Poetry On The Spot Without External Reference. Judged On Originality, Writing, Imagery, Voice & Stage Presence.",
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
    rules: "2 Teams Of 3-5 Students Per College. Rangoli Size 3x3 Feet. On-Spot Theme. All Natural Colors, Petals, And Powders Brought By Participants.",
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
    rules: "5 Solo Participants Per College (At Least 1 Female). Transform Discarded Old Textiles Into Wearable Runway Garments Live On The Spot. New Fabric Strictly Prohibited.",
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
    rules: "5 Solo Participants Per College (At Least 1 Female). Theme Provided On Spot. Paper Size A3. Black Fine-Liners And Ink Pens Only.",
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
    rules: "5 Solo Participants Per College (At Least 1 Female). Create An Original Poster Based On On-Spot Theme Using Ai Prompt Workflow On Personal Device. Jpg/Png/Pdf <= 5mb Submitted Via Qr Code.",
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
    rules: "3 Male & 3 Female Participants Per College. Model Arrives With Clean Face. Non-Toxic Skin-Safe Body Paints Mandatory. Stencils And Pre-Made Sketches Prohibited.",
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
    rules: "5 Solo Participants Per College (At Least 1 Female). Paper Size A3. Freehand Designated Text Using Calligraphy Pens. Ball Pens And Tracing Strictly Prohibited.",
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
    rules: "5 Solo Participants Per College (At Least 1 Male). Model Arrives Clean-Faced. Evaluated On Blending Technique, Contouring, Editorial Impact, And Hygiene.",
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
    rules: "5 Solo Participants Per College (At Least 1 Female). Decorate A Single Pair Of Plain Sneakers Live On The Spot With Street Art Finishes, Stencils, And Acrylics.",
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
    rules: "5 Solo Participants Per Language Per College. Word Limit 400-600 Words On On-Spot Creative Stimulus Prompt. Evaluated On Originality, Imagination, Structure & Language.",
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
    rules: "1 Team Of 4 Students Per College. Questioning Round, Audio Clue Round, And Visual Round Across Classic Literature, Poetry, Drama, And World Literary Movements.",
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
    rules: "3 Solo Participants Per College (At Least 1 Female). Maximum Time 3 Minutes. Judged On Acting Skills, Expressions, Voice Modulation, Concept Creativity & Stage Presence.",
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
    rules: "Head-To-Head Battle Round For Qualified Solo And Duet Dancers With Randomized Tracks Determined By Lottery Draw.",
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
    rules: "Direct Vocal Acoustic Face-Off For Qualified Solo And Duet Entries Before The Festival Adjudication Panel.",
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
    rules: "2 Solo Participants Per Language Per College. 3 Minutes Argument Presentation Followed By 1 Minute Rebuttal. For/Against Stance Allocated Via Chit System.",
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
    rules: "Top Qualified Contingent Quiz Teams Compete In High-Stakes Rapid-Fire, Multimedia, And Sudden-Death Buzzer Rounds.",
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
    rules: "1 Team Of 5-10 Students Per College. Maximum Time 10 Minutes. Evaluated On Script, Acting, Dialogue Delivery, Team Coordination & Overall Impact.",
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
    rules: "Championship Final Round For All Qualified Finalists Across Solo, Duet, And Group Categories In Presence Of The Full Student Body And Celebrity Jury.",
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
    rules: "1 Team Of 8-15 Students Per College. Maximum Time 8 Minutes. Staged At The University Cricket Ground Under Stadium Illumination! Theme: 'The Creative Couture Challenge'. Evaluated On Presentation, Walking Posture, Styling, Music & Choreography.",
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
    <div className="min-h-screen bg-[#18030c] text-amber-50 relative selection:bg-amber-500 selection:text-black antialiased overflow-x-hidden">
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

        {/* Filter Controls With Custom Scrollable Rails */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-[#290514]/95 via-[#1b0426]/95 to-[#0b1c2e]/95 p-4 rounded-3xl border-2 border-amber-400/50 shadow-xl">
          {/* Day Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2.5 custom-scrollbar shrink-0">
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
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 shrink-0 ${
                    activeDay === day
                      ? "bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 text-black font-black shadow-lg shadow-amber-500/40 border border-yellow-200 scale-105"
                      : "text-amber-100 font-bold hover:text-white hover:bg-white/10 bg-[#250414]/60 border border-amber-400/30"
                  }`}
                >
                  {labelMap[day]}
                </button>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2.5 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  selectedCategory === cat
                    ? "bg-rose-900/80 text-amber-300 border border-amber-500/50 shadow-md shadow-rose-950/40"
                    : "text-rose-300/60 hover:text-white bg-[#100104]/50 hover:bg-rose-950/30 border border-rose-950/60"
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
                  ? "bg-gradient-to-r from-[#42061c]/95 via-[#290538]/95 to-[#122245]/95 border-2 border-amber-400 shadow-2xl shadow-amber-950/40"
                  : "bg-gradient-to-r from-[#290514]/90 via-[#1c0422]/90 to-[#0e162e]/90 border-2 border-amber-400/40 hover:border-amber-400 hover:bg-[#320618]"
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
