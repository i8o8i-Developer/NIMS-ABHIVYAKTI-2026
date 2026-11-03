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
  Music,
  Layers,
  Palette,
  Bot,
  Theater,
  Trophy,
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Dance":
        return <Flame className="w-3.5 h-3.5" />;
      case "Music":
        return <Music className="w-3.5 h-3.5" />;
      case "Fashion":
        return <Layers className="w-3.5 h-3.5" />;
      case "Fine Arts":
      case "Creative Arts":
        return <Palette className="w-3.5 h-3.5" />;
      case "Digital Arts":
        return <Bot className="w-3.5 h-3.5" />;
      case "Theatre":
      case "Drama":
        return <Theater className="w-3.5 h-3.5" />;
      case "Literature":
        return <BookOpen className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const getEventCardStyle = (category: string) => {
    switch (category) {
      case "Dance":
        return "bg-gradient-to-b from-[#38091d]/95 via-[#220511]/98 to-[#130209] border-2 border-pink-500/70 hover:border-pink-300 shadow-[0_8px_30px_rgba(236,72,153,0.25)]";
      case "Music":
        return "bg-gradient-to-b from-[#3d2406]/95 via-[#241503]/98 to-[#130a01] border-2 border-amber-400/70 hover:border-amber-300 shadow-[0_8px_30px_rgba(245,158,11,0.25)]";
      case "Literature":
        return "bg-gradient-to-b from-[#06331e]/95 via-[#031f12]/98 to-[#011209] border-2 border-emerald-400/70 hover:border-emerald-300 shadow-[0_8px_30px_rgba(16,185,129,0.25)]";
      case "Fashion":
        return "bg-gradient-to-b from-[#082a45]/95 via-[#041a2c]/98 to-[#020e18] border-2 border-cyan-400/70 hover:border-cyan-300 shadow-[0_8px_30px_rgba(6,182,212,0.25)]";
      case "Fine Arts":
      case "Creative Arts":
        return "bg-gradient-to-b from-[#2d0947]/95 via-[#1b052c]/98 to-[#0e0217] border-2 border-purple-400/70 hover:border-purple-300 shadow-[0_8px_30px_rgba(168,85,247,0.25)]";
      case "Digital Arts":
        return "bg-gradient-to-b from-[#131c52]/95 via-[#0a1033]/98 to-[#05081c] border-2 border-blue-400/70 hover:border-blue-300 shadow-[0_8px_30px_rgba(59,130,246,0.25)]";
      case "Drama":
      case "Theatre":
        return "bg-gradient-to-b from-[#3b080f]/95 via-[#240409]/98 to-[#130205] border-2 border-red-500/70 hover:border-red-300 shadow-[0_8px_30px_rgba(239,68,68,0.25)]";
      default:
        return "bg-gradient-to-b from-[#300512]/95 via-[#1a0208]/98 to-[#0d0104] border-2 border-amber-400/70 shadow-[0_8px_30px_rgba(245,184,66,0.25)]";
    }
  };

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
    <div className="min-h-screen bg-[#070104] text-amber-50 relative selection:bg-amber-500 selection:text-black antialiased overflow-x-hidden">
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

        {/* Schedule Grid (Matching Exact Home Page Event Card Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              className={`p-5 sm:p-6 rounded-2xl ${getEventCardStyle(item.category)} hover:-translate-y-1 transition-all duration-300 group shadow-2xl flex flex-col justify-between relative overflow-hidden backdrop-blur-xl`}
            >
              {/* Ambient Category Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

              <div>
                {/* Card Top: Category Badge On Left + Date & Time Stacked On Right */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-full border shadow-sm ${getCategoryBadgeClass(item.category)}`}>
                    {getCategoryIcon(item.category)}
                    <span>{item.category}</span>
                  </span>
                  <div className="text-right shrink-0">
                    <span className="flex items-center justify-end gap-1 text-xs font-bold text-amber-200">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {item.date}
                    </span>
                    <span className="flex items-center justify-end gap-1 text-[11px] text-amber-400 font-semibold mt-0.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {item.time}
                    </span>
                  </div>
                </div>

                {/* Event Title In Bold White & Serif Font */}
                <h3 className="text-base sm:text-lg font-serif font-black text-white group-hover:text-amber-200 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>

                {/* Event Key Highlights Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/35 text-amber-300">
                    🥇 40 Pts • 🥈 25 Pts • 🥉 15 Pts
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-black/40 border border-white/20 text-white">
                    {item.day}
                  </span>
                  {item.isGrandFinale && (
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-black flex items-center gap-1 shadow-md">
                      <Flame className="w-3 h-3 fill-current" />
                      Grand Finale
                    </span>
                  )}
                </div>

                {/* Rules Summary Snippet */}
                {item.rules && (
                  <p className="text-xs text-rose-100/80 mt-3 line-clamp-3 leading-relaxed font-medium">
                    {item.rules}
                  </p>
                )}
              </div>

              {/* Card Bottom: Venue + Guidelines Button */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-3.5">
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate font-semibold">{item.venue}</span>
                  </div>
                  <span className="text-[11px] text-amber-300 font-bold shrink-0">{item.duration}</span>
                </div>

                {/* Direct Event Guideline & Rules Action Button */}
                <button
                  onClick={() => openGuidelines(item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 hover:from-amber-400 hover:via-yellow-300 hover:to-orange-500 hover:text-black text-amber-200 text-xs font-black border-2 border-amber-400/60 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-amber-500/35 group/btn"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover/btn:text-black transition-colors" />
                  <span>Guidelines & Scoring Rubric</span>
                </button>
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
