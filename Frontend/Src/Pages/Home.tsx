import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { CountdownTimer } from "@/Components/Ui/CountdownTimer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import { Footer } from "@/Components/Ui/Footer";
import { Podium } from "@/Components/Leaderboard/Podium";
import { LeaderboardTable } from "@/Components/Leaderboard/LeaderboardTable";
import { EventGuidelineModal, GuidelineEventData } from "@/Components/Ui/EventGuidelineModal";
import { Api } from "@/Lib/Api";
import {
  Trophy,
  Users,
  Award,
  Sparkles,
  MapPin,
  Calendar,
  ChevronRight,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Flame,
  HelpCircle,
  Clock,
  Layers,
} from "lucide-react";

interface ScheduleEventItem {
  id: string;
  title: string;
  day: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  rules?: string;
}

const OFFICIAL_SCHEDULE: ScheduleEventItem[] = [
  // Day 1: 21 Nov 2025
  {
    id: "1",
    title: "Dance - Solo, Duet & Group (Round 1)",
    day: "Day 1",
    date: "21 Nov 2025",
    time: "10:00 AM",
    venue: "Rajeshwari Auditorium",
    category: "Dance",
    rules: "Performance Time: Solo (3-4 Mins), Duet (4-5 Mins), Group (6-8 Mins). Audio track in MP3 format submitted 1 hour prior. Classical, contemporary, Bollywood, and folk styles accepted. Flammable materials prohibited.",
  },
  {
    id: "2",
    title: "Singing - Solo, Duet & Group (Round 1)",
    day: "Day 1",
    date: "21 Nov 2025",
    time: "10:00 AM",
    venue: "Management - LT 10 & 11",
    category: "Music",
    rules: "Vocal Time: 4 Minutes Max. Live acoustic instruments or standard karaoke backing allowed. Evaluated on pitch accuracy, rhythm, vocal modulation, and stage presence.",
  },
  {
    id: "3",
    title: "Face Painting",
    day: "Day 1",
    date: "21 Nov 2025",
    time: "02:00 PM",
    venue: "Management - LT 16 & 17",
    category: "Fine Arts",
    rules: "Theme announced on spot. Duration 90 minutes. Non-toxic, skin-safe body paints only. Both model and artist must be bonafide NIMS students.",
  },
  {
    id: "4",
    title: "Best Out Of Waste",
    day: "Day 1",
    date: "21 Nov 2025",
    time: "02:00 PM",
    venue: "Management - LT 21",
    category: "Creative Arts",
    rules: "Duration 2 hours. Team size 1-2 students. Recyclable materials and scrap only. Pre-assembled structures lead to instant disqualification.",
  },
  {
    id: "5",
    title: "Fashion Upcycling",
    day: "Day 1",
    date: "21 Nov 2025",
    time: "03:00 PM",
    venue: "Fashion Lab & LT 16, 17",
    category: "Fashion",
    rules: "Transform discarded textiles into couture garments. 2.5 hours on-site execution followed by runway jury display.",
  },
  {
    id: "6",
    title: "Doodling Competition",
    day: "Day 1",
    date: "21 Nov 2025",
    time: "04:00 PM",
    venue: "Moot Court 2",
    category: "Fine Arts",
    rules: "Individual event. Duration 60 minutes. A3 sheets provided. Black fine-liners and ink pens only.",
  },
  {
    id: "7",
    title: "Collage Making",
    day: "Day 1",
    date: "21 Nov 2025",
    time: "04:00 PM",
    venue: "LT 21, 15",
    category: "Fine Arts",
    rules: "Theme: 'Heritage Meets Future'. Duration 90 minutes. Newspapers, periodicals, scissors, and adhesives.",
  },
  {
    id: "8",
    title: "Clay Art",
    day: "Day 1",
    date: "21 Nov 2025",
    time: "04:00 PM",
    venue: "Corridor - 1st Floor",
    category: "Fine Arts",
    rules: "Natural terracotta clay provided. Duration 2 hours. Judged on structural balance, intricacy, and creative interpretation.",
  },

  // Day 2: 22 Nov 2025
  {
    id: "9",
    title: "Mono Act",
    day: "Day 2",
    date: "22 Nov 2025",
    time: "09:00 AM",
    venue: "Rajeshwari Auditorium",
    category: "Drama",
    rules: "Solo dramatic performance commanding the main stage. 4-6 minutes limit. Dialogue delivery, emotion transition, and expression evaluated.",
  },
  {
    id: "10",
    title: "Dance - Solo, Duet & Group (Round 2)",
    day: "Day 2",
    date: "22 Nov 2025",
    time: "11:00 AM",
    venue: "Rajeshwari Auditorium",
    category: "Dance",
    rules: "Grand finale championship round for qualified entries. Synchronisation, choreography complexity, and stage dominance evaluated by celebrity jury.",
  },
  {
    id: "11",
    title: "Singing - Solo, Duet & Group (Round 2)",
    day: "Day 2",
    date: "22 Nov 2025",
    time: "11:00 AM",
    venue: "LT 10 & 11",
    category: "Music",
    rules: "Grand finale vocal championship. Dual stage monitors and professional acoustic check provided. Strict 5-minute performance window.",
  },
  {
    id: "12",
    title: "AI Art",
    day: "Day 2",
    date: "22 Nov 2025",
    time: "02:00 PM",
    venue: "LT 25",
    category: "Digital Arts",
    rules: "Prompt engineering and concept rendering executed live on assigned workstations. Complete workflow documentation and prompt logs required.",
  },
  {
    id: "13",
    title: "Calligraphy",
    day: "Day 2",
    date: "22 Nov 2025",
    time: "02:00 PM",
    venue: "Moot Court",
    category: "Fine Arts",
    rules: "Traditional and modern scripts (Devanagari, English Gothic, Copperplate). Duration 60 minutes. Evaluated on stroke precision and layout balance.",
  },
  {
    id: "14",
    title: "MakeUp Contest",
    day: "Day 2",
    date: "22 Nov 2025",
    time: "02:30 PM",
    venue: "LT 16, 17 & Corridor (2nd Floor)",
    category: "Creative Arts",
    rules: "Theatrical, editorial, and fantasy makeup. Duration 75 minutes. Blending, shading, contouring, hygiene, and overall impact evaluated.",
  },
  {
    id: "15",
    title: "Kick Drip",
    day: "Day 2",
    date: "22 Nov 2025",
    time: "02:30 PM",
    venue: "LT 21 & 15",
    category: "Fashion",
    rules: "Sneaker custom artwork and street styling. Plain sneakers customized live during 90-minute window using acrylics, stencils, and finishes.",
  },
];

export const Home: React.FC = () => {
  const [standings, setStandings] = useState<any[]>([]);
  const [podium, setPodium] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<"All" | "Day 1" | "Day 2">("Day 1");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Event Guideline Modal State (Guidelines Attached Directly To Events)
  const [selectedGuidelineEvent, setSelectedGuidelineEvent] = useState<GuidelineEventData | null>(null);
  const [isGuidelineModalOpen, setIsGuidelineModalOpen] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await Api.get("/scores/leaderboard/");
        if (res.data?.standings) {
          setStandings(res.data.standings);
          setPodium(res.data.podium || res.data.standings.slice(0, 3));
        }
      } catch {
        // Fallback
      }
    };
    fetchLeaderboard();
  }, []);

  const openEventGuidelines = (event: ScheduleEventItem) => {
    setSelectedGuidelineEvent({
      id: event.id,
      title: event.title,
      category: event.category,
      venue: event.venue,
      date: event.date,
      time: event.time,
      rules_summary: event.rules,
      first_place_points: 40,
      second_place_points: 25,
      third_place_points: 15,
    });
    setIsGuidelineModalOpen(true);
  };

  const filteredSchedule =
    selectedDay === "All"
      ? OFFICIAL_SCHEDULE
      : OFFICIAL_SCHEDULE.filter((item) => item.day === selectedDay);

  const faqs = [
    {
      q: "Who Is Eligible To Participate In Abhivyakti 2026?",
      a: "All Bonafide Students Currently Enrolled In Any College, Department, Or Institute Of NIMS University Rajasthan Are Eligible To Represent Their Contingent.",
    },
    {
      q: "How Are Event Rules & Guidelines Accessed?",
      a: "Rules Are Directly Attached To Each Event Card! Simply Click 'Guidelines & Rules' On Any Competition To Inspect The Exact Time Limits, Team Sizes, And 4-Pillar Scoring Rubrics.",
    },
    {
      q: "How Is The Overall Championship Trophy Decided?",
      a: "Points Are Awarded For 1st (40 Pts), 2nd (25 Pts), And 3rd Place (15 Pts) In Each Competition. The Contingent With The Highest Cumulative Score Across All Arenas Lifts The Coveted Rolling Trophy.",
    },
    {
      q: "Can An Individual Student Participate In Multiple Events?",
      a: "Yes, Provided There Is No Direct Time Conflict In The Official Schedule. Ensure You Coordinate With Your College Contingent In-Charge.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050002] text-amber-50 selection:bg-amber-500 selection:text-black relative overflow-x-hidden antialiased">
      {/* Background Lighting, Spotlight Beams & Circle Elements */}
      <FloatingBackgroundElements />

      {/* Marquee Banner */}
      <FestiveTicker />

      {/* Primary Navigation */}
      <Navbar />

      {/* Hero Section Matching Image 1 Reference With Circle Elements & Lighting */}
      <section className="relative pt-10 sm:pt-14 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto flex flex-col items-center">
        {/* NIMS Championship Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#120205] border border-amber-500/40 shadow-xl shadow-amber-950/20 mb-8 z-10 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-300 uppercase">
            NIMS UNIVERSITY CULTURAL CHAMPIONSHIP 2026
          </span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* Hero Grid With Symmetrical Left/Right Floating Badges Matching Image 1 */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 z-10">
          {/* Left Floating Badges (3 Badges Perfectly Balanced) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 items-start">
            {/* Badge 1: Championship Glory */}
            <div className="w-full p-4 rounded-2xl bg-[#0f0205]/90 border border-amber-500/35 backdrop-blur-xl shadow-2xl text-left transform hover:-translate-y-1 transition-all duration-300 animate-live-sway">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-wider text-amber-200 uppercase">CHAMPIONSHIP GLORY</h4>
                  <p className="text-[11px] text-rose-300/80 font-medium">30+ Leading Institutes</p>
                </div>
              </div>
            </div>

            {/* Badge 2: 100% Student-Led */}
            <div className="w-full p-4 rounded-2xl bg-[#0f0205]/90 border border-rose-500/35 backdrop-blur-xl shadow-2xl text-left transform hover:-translate-y-1 transition-all duration-300 animate-live-sway" style={{ animationDelay: "1.2s" }}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-wider text-amber-200 uppercase">100% STUDENT-LED</h4>
                  <p className="text-[11px] text-rose-300/80 font-medium">NIMS Student Council</p>
                </div>
              </div>
            </div>

            {/* Badge 3: ₹5,00,000+ Awards */}
            <div className="w-full p-4 rounded-2xl bg-[#0f0205]/90 border border-amber-500/35 backdrop-blur-xl shadow-2xl text-left transform hover:-translate-y-1 transition-all duration-300 animate-live-sway" style={{ animationDelay: "2.4s" }}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black tracking-wider text-amber-200 uppercase">₹5,00,000+ AWARDS</h4>
                  <p className="text-[11px] text-rose-300/80 font-medium">Rolling Champions Trophy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Central Logo & Majestic Typography */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center">
            {/* Official Abhivyakti Stylized Logo Container */}
            <div className="relative mb-6 p-4 sm:p-5 rounded-3xl bg-white shadow-2xl shadow-rose-950/70 border-4 border-amber-400/90 max-w-xs sm:max-w-sm w-full mx-auto transform hover:scale-105 transition-transform duration-300">
              <img
                src="/Abhivyakti.png"
                alt="Abhivyakti Cultural Festival Logo"
                className="w-full h-auto max-h-36 object-contain mx-auto"
              />
            </div>

            {/* Symmetrical Regal Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-500 mb-5 drop-shadow-lg">
              Celebrating Cultural <br className="hidden sm:inline" />
              Majesty & Excellence
            </h1>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm text-rose-200/90 font-medium max-w-xl leading-relaxed mb-8">
              Colleges And Institutes Across NIMS University Compete In Singing, Classical Dance, Street Play,
              Battle Of The Bands, And Visual Arts For The Coveted{" "}
              <strong className="text-amber-300 font-bold">Abhivyakti Inter-College Championship Trophy</strong>.
            </p>

            {/* 4-Card Countdown Timer */}
            <div className="w-full max-w-md">
              <CountdownTimer targetDate="2026-11-21T09:00:00" />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/competitions"
                className="px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Explore Competitions</span>
              </Link>

              <Link
                to="/leaderboard"
                className="px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#140206] text-amber-200 border border-amber-500/40 hover:bg-rose-950/70 hover:text-white transition-all flex items-center gap-2 shadow-xl"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>View Leaderboard</span>
              </Link>
            </div>
          </div>

          {/* Right Floating Badges (3 Badges Perfectly Symmetrical) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 items-end">
            {/* Badge 4: 6 Cultural Arenas */}
            <div className="w-full p-4 rounded-2xl bg-[#0f0205]/90 border border-amber-500/35 backdrop-blur-xl shadow-2xl text-right transform hover:-translate-y-1 transition-all duration-300 animate-live-sway" style={{ animationDirection: "reverse", animationDelay: "0.5s" }}>
              <div className="flex items-center justify-end gap-3">
                <div>
                  <h4 className="text-xs font-black tracking-wider text-amber-200 uppercase">6 CULTURAL ARENAS</h4>
                  <p className="text-[11px] text-rose-300/80 font-medium">Music, Dance, Drama, Vogue</p>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Badge 5: Grand Central Venue */}
            <div className="w-full p-4 rounded-2xl bg-[#0f0205]/90 border border-rose-500/35 backdrop-blur-xl shadow-2xl text-right transform hover:-translate-y-1 transition-all duration-300 animate-live-sway" style={{ animationDirection: "reverse", animationDelay: "1.7s" }}>
              <div className="flex items-center justify-end gap-3">
                <div>
                  <h4 className="text-xs font-black tracking-wider text-amber-200 uppercase">GRAND CENTRAL VENUE</h4>
                  <p className="text-[11px] text-rose-300/80 font-medium">NIMS Jaipur Grounds</p>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Badge 6: Verified Jury Engine */}
            <div className="w-full p-4 rounded-2xl bg-[#0f0205]/90 border border-amber-500/35 backdrop-blur-xl shadow-2xl text-right transform hover:-translate-y-1 transition-all duration-300 animate-live-sway" style={{ animationDirection: "reverse", animationDelay: "2.9s" }}>
              <div className="flex items-center justify-end gap-3">
                <div>
                  <h4 className="text-xs font-black tracking-wider text-amber-200 uppercase">VERIFIED JURY ENGINE</h4>
                  <p className="text-[11px] text-rose-300/80 font-medium">Real-Time Score Sync</p>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Badges Strip (visible on mobile) */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-4 z-10">
          <div className="p-3 rounded-xl bg-[#0e0205] border border-amber-500/30 text-center">
            <Trophy className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-amber-200">Championship Glory</p>
            <p className="text-[10px] text-rose-300/70">30+ Colleges</p>
          </div>
          <div className="p-3 rounded-xl bg-[#0e0205] border border-rose-500/30 text-center">
            <Users className="w-4 h-4 text-rose-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-amber-200">100% Student-Led</p>
            <p className="text-[10px] text-rose-300/70">Student Council</p>
          </div>
          <div className="p-3 rounded-xl bg-[#0e0205] border border-amber-500/30 text-center">
            <ShieldCheck className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-amber-200">Verified Scoring</p>
            <p className="text-[10px] text-rose-300/70">Jury Matrix</p>
          </div>
        </div>
      </section>

      {/* Festival Key Metrics Bar With Deep Blackish Tone */}
      <section className="border-y border-rose-950/80 bg-[#090103]/95 py-8 px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
              12+
            </p>
            <p className="text-xs sm:text-sm font-semibold text-rose-200/80 mt-1">Participating Institutes</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
              15
            </p>
            <p className="text-xs sm:text-sm font-semibold text-rose-200/80 mt-1">Official Competitions</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
              ₹5,00,000+
            </p>
            <p className="text-xs sm:text-sm font-semibold text-rose-200/80 mt-1">Prize & Trophy Value</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
              5,000+
            </p>
            <p className="text-xs sm:text-sm font-semibold text-rose-200/80 mt-1">Passionate Students</p>
          </div>
        </div>
      </section>

      {/* Official Schedule Section With Event Guidelines Attached Directly */}
      <section id="schedule" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Two Days Of Cultural Brilliance</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
              Official Event Schedule & Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
              Click 'Guidelines & Rules' On Any Competition To Inspect Rubrics, Point Matrices, And Time Limits.
            </p>
          </div>

          {/* Day Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#100205] border border-rose-950">
            {(["Day 1", "Day 2", "All"] as const).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedDay === day
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "text-rose-200/70 hover:text-white"
                }`}
              >
                {day === "All" ? "View Full Schedule" : `${day} (${day === "Day 1" ? "21 Nov" : "22 Nov"})`}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Cards Grid With Direct Guideline Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#0e0205] border border-rose-950 hover:border-amber-500/50 hover:bg-[#150308] transition-all group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-right">
                    <span className="text-xs font-bold text-amber-100">{item.date}</span>
                    <span className="text-[11px] text-amber-400 font-medium">({item.time})</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="mt-5 pt-3 border-t border-rose-950/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-rose-300/80">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">{item.venue}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-400/90">{item.day}</span>
                </div>

                {/* Direct Event Guideline & Rules Action Button */}
                <button
                  onClick={() => openEventGuidelines(item)}
                  className="w-full py-2 px-3 rounded-xl bg-[#1c0409] hover:bg-amber-500 hover:text-black text-amber-300 text-xs font-bold border border-amber-500/30 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Guidelines & Rules</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#120205] border border-amber-500/30 text-amber-300 hover:bg-rose-950/60 transition-all text-xs font-bold"
          >
            <span>View Complete Master Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Championship Leaderboard Standings Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rose-950/80 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Trophy className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Inter-College Rankings</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
              Championship Leaderboard
            </h2>
            <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
              Live standings computed from verified jury scorecards across all cultural arenas.
            </p>
          </div>
          <div>
            <Link
              to="/leaderboard"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <span>Full Standings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Top 3 Podium */}
        {podium.length >= 3 && <Podium topThree={podium} />}

        {/* Quick Table Preview */}
        <div className="mt-10">
          <LeaderboardTable colleges={standings.slice(0, 5)} />
        </div>
      </section>

      {/* Cultural Arenas Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rose-950/80 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
            Multidisciplinary Arenas
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white mt-2">
            6 Arenas Of Distinction
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/70 mt-2">
            From rhythmic footwork to generative digital art, Abhivyakti honors every form of creative brilliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Performing Arts & Choreography",
              desc: "Solo, Duet, And Group Dance Battles Showcasing Classical, Contemporary, And Folk Vibrancy.",
              icon: Flame,
              badge: "High Stakes",
            },
            {
              title: "Vocal Resonance & Melody",
              desc: "Acoustic Ballads, Duet Harmonies, And High-Energy Group Ensembles Competing Across Rounds.",
              icon: Sparkles,
              badge: "Crowd Favorite",
            },
            {
              title: "Couture & Fashion Upcycling",
              desc: "Eco-Friendly High Fashion And The Electric Kick Drip Sneaker Customization Challenge.",
              icon: Layers,
              badge: "Trendsetting",
            },
            {
              title: "Fine Arts & Visual Expression",
              desc: "Live Doodling, Intricate Calligraphy, Clay Sculpting, And Expressive Face Painting.",
              icon: BookOpen,
              badge: "Artisan Arena",
            },
            {
              title: "Digital Art & AI Generation",
              desc: "Harnessing Generative AI Prompts And Digital Workflows To Create Concept Art.",
              icon: Trophy,
              badge: "New For 2026",
            },
            {
              title: "Theatrical Drama & Mono Act",
              desc: "Solo Dramatic Enactments Commanding The Grand Rajeshwari Auditorium Stage.",
              icon: Users,
              badge: "Dramatic Arts",
            },
          ].map((arena, i) => {
            const Icon = arena.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0c0104] border border-rose-950 hover:border-amber-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-950/60 text-rose-300 border border-rose-900/50">
                    {arena.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {arena.title}
                </h3>
                <p className="text-xs text-rose-200/70 mt-2 leading-relaxed">{arena.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-rose-950/80 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-amber-400 mb-2">
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Inquiries & Clarifications</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-[#0e0205] border border-rose-950 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight
                    className={`w-4 h-4 text-amber-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-rose-200/80 leading-relaxed border-t border-rose-950/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Footer */}
      <Footer />

      {/* Event Guideline Modal (Attached Directly To Events) */}
      <EventGuidelineModal
        isOpen={isGuidelineModalOpen}
        onClose={() => setIsGuidelineModalOpen(false)}
        event={selectedGuidelineEvent}
      />
    </div>
  );
};
export default Home;
