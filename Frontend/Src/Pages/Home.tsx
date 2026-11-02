import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { CountdownTimer } from "@/Components/Ui/CountdownTimer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import { Footer } from "@/Components/Ui/Footer";
import { Podium, DEFAULT_TOP_THREE } from "@/Components/Leaderboard/Podium";
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
  // Day 1: 18 Nov 2026
  {
    id: "1",
    title: "Dance - Solo & Duet (Round 1 Prelims)",
    day: "Day 1",
    date: "18 Nov 2026",
    time: "10:00 AM",
    venue: "Rajeshwari Auditorium",
    category: "Dance",
    rules: "Performance Time: Solo (3-4 Mins), Duet (4-5 Mins). Classical, contemporary, Bollywood, and folk styles accepted. Audio track in MP3 format submitted 1 hour prior.",
  },
  {
    id: "2",
    title: "Singing - Solo & Duet (Round 1 Prelims)",
    day: "Day 1",
    date: "18 Nov 2026",
    time: "10:00 AM",
    venue: "Management - LT 10 & 11",
    category: "Music",
    rules: "Vocal Time: 4 Minutes Max. Live acoustic instruments or standard karaoke backing allowed. Evaluated on pitch accuracy, rhythm, vocal modulation, and stage presence.",
  },
  {
    id: "3",
    title: "Face Painting",
    day: "Day 1",
    date: "18 Nov 2026",
    time: "02:00 PM",
    venue: "Management - LT 16 & 17",
    category: "Fine Arts",
    rules: "Theme announced on spot. Duration 90 minutes. Non-toxic, skin-safe body paints only. Both model and artist must be bonafide NIMS students.",
  },
  {
    id: "4",
    title: "Best Out Of Waste",
    day: "Day 1",
    date: "18 Nov 2026",
    time: "02:00 PM",
    venue: "Management - LT 21",
    category: "Creative Arts",
    rules: "Duration 2 hours. Team size 1-2 students. Recyclable materials and scrap only. Pre-assembled structures lead to instant disqualification.",
  },

  // Day 2: 19 Nov 2026
  {
    id: "5",
    title: "Fashion Upcycling",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "11:00 AM",
    venue: "Fashion Lab & LT 16, 17",
    category: "Fashion",
    rules: "Transform discarded textiles into couture garments. 2.5 hours on-site execution followed by runway jury display.",
  },
  {
    id: "6",
    title: "Doodling Competition",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "02:00 PM",
    venue: "Moot Court 2",
    category: "Fine Arts",
    rules: "Individual event. Duration 60 minutes. A3 sheets provided. Black fine-liners and ink pens only.",
  },
  {
    id: "7",
    title: "Collage Making",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "03:00 PM",
    venue: "LT 21, 15",
    category: "Fine Arts",
    rules: "Theme: 'Heritage Meets Future'. Duration 90 minutes. Newspapers, periodicals, scissors, and adhesives.",
  },
  {
    id: "8",
    title: "Clay Art",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "04:00 PM",
    venue: "Corridor - 1st Floor",
    category: "Fine Arts",
    rules: "Natural terracotta clay provided. Duration 2 hours. Judged on structural balance, intricacy, and creative interpretation.",
  },

  // Day 3: 20 Nov 2026
  {
    id: "9",
    title: "Mono Act (Theatrical Soliloquy)",
    day: "Day 3",
    date: "20 Nov 2026",
    time: "10:00 AM",
    venue: "Rajeshwari Auditorium",
    category: "Drama",
    rules: "Solo dramatic performance commanding the main stage. 4-6 minutes limit. Dialogue delivery, emotion transition, and expression evaluated.",
  },
  {
    id: "10",
    title: "AI Art & Digital Prompt Challenge",
    day: "Day 3",
    date: "20 Nov 2026",
    time: "02:00 PM",
    venue: "LT 25",
    category: "Digital Arts",
    rules: "Prompt engineering and concept rendering executed live on assigned workstations. Complete workflow documentation and prompt logs required.",
  },
  {
    id: "11",
    title: "Calligraphy Championship",
    day: "Day 3",
    date: "20 Nov 2026",
    time: "03:00 PM",
    venue: "Moot Court",
    category: "Fine Arts",
    rules: "Traditional and modern scripts (Devanagari, English Gothic, Copperplate). Duration 60 minutes. Evaluated on stroke precision and layout balance.",
  },
  {
    id: "12",
    title: "MakeUp & Glamour Contest",
    day: "Day 3",
    date: "20 Nov 2026",
    time: "04:00 PM",
    venue: "LT 16, 17 & Corridor (2nd Floor)",
    category: "Creative Arts",
    rules: "Theatrical, editorial, and fantasy makeup. Duration 75 minutes. Blending, shading, contouring, hygiene, and overall impact evaluated.",
  },

  // Day 4: 21 Nov 2026 (Grand Championship Finale)
  {
    id: "13",
    title: "Kick Drip (Sneaker Customization)",
    day: "Day 4",
    date: "21 Nov 2026",
    time: "10:00 AM",
    venue: "LT 21 & 15",
    category: "Fashion",
    rules: "Sneaker custom artwork and street styling. Plain sneakers customized live during 90-minute window using acrylics, stencils, and finishes.",
  },
  {
    id: "14",
    title: "Singing - Group & Battle Of The Bands (Grand Finale)",
    day: "Day 4",
    date: "21 Nov 2026",
    time: "01:00 PM",
    venue: "LT 10 & 11",
    category: "Music",
    rules: "Grand finale vocal championship. Dual stage monitors and professional acoustic check provided. Strict 5-minute performance window.",
  },
  {
    id: "15",
    title: "Dance - Group Championship (Mega Grand Finale)",
    day: "Day 4",
    date: "21 Nov 2026",
    time: "04:00 PM",
    venue: "Rajeshwari Auditorium",
    category: "Dance",
    rules: "Grand finale championship round for qualified entries. Synchronisation, choreography complexity, and stage dominance evaluated by celebrity jury.",
  },
];

export const Home: React.FC = () => {
  const [standings, setStandings] = useState<any[]>(DEFAULT_TOP_THREE);
  const [podium, setPodium] = useState<any[]>(DEFAULT_TOP_THREE);
  const [selectedDay, setSelectedDay] = useState<"All" | "Day 1" | "Day 2" | "Day 3" | "Day 4">("Day 1");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Event Guideline Modal State (Guidelines Attached Directly To Events)
  const [selectedGuidelineEvent, setSelectedGuidelineEvent] = useState<GuidelineEventData | null>(null);
  const [isGuidelineModalOpen, setIsGuidelineModalOpen] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await Api.get("/scores/leaderboard/");
        const list = res.data?.leaderboard || res.data?.standings;
        if (list && list.length > 0) {
          setStandings(list);
          setPodium(res.data?.podium || (list.length >= 3 ? list.slice(0, 3) : DEFAULT_TOP_THREE));
        }
      } catch {
        // Retain default dummy top 3
      }
    };
    fetchLeaderboard();
  }, []);

  // Category Badge Styler For Visual Harmony
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Dance":
        return "bg-rose-950/80 border-rose-500/40 text-rose-300";
      case "Music":
        return "bg-amber-950/80 border-amber-500/40 text-amber-300";
      case "Fashion":
        return "bg-purple-950/80 border-purple-500/40 text-purple-300";
      case "Fine Arts":
      case "Creative Arts":
        return "bg-yellow-950/80 border-yellow-500/40 text-yellow-300";
      case "Digital Arts":
        return "bg-cyan-950/80 border-cyan-500/40 text-cyan-300";
      case "Drama":
        return "bg-red-950/80 border-red-500/40 text-red-300";
      default:
        return "bg-amber-500/10 border-amber-500/30 text-amber-300";
    }
  };

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
      q: "When Does Abhivyakti 2026 Take Place?",
      a: "The Championship Spans 4 Epic Days From 18 November To 21 November 2026, Concluding With The Mega Grand Finale At Rajeshwari Auditorium.",
    },
    {
      q: "How Are Event Rules & Guidelines Accessed?",
      a: "Rules Are Directly Attached To Each Event Card! Simply Click 'Guidelines & Rules' On Any Competition To Inspect The Exact Time Limits, Team Sizes, And 4-Pillar Scoring Rubrics.",
    },
    {
      q: "How Is The Overall Championship Trophy Decided?",
      a: "Points Are Awarded For 1st (40 Pts), 2nd (25 Pts), And 3rd Place (15 Pts) In Each Competition. The Contingent With The Highest Cumulative Score Across All Arenas Lifts The Coveted Rolling Trophy.",
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

      {/* Hero Section Matching Image 1 & Image 2 Reference */}
      <section className="relative pt-6 sm:pt-10 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 text-center max-w-[100rem] mx-auto flex flex-col items-center min-h-[720px]">
        {/* NIMS Championship Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#120205] border border-amber-500/40 shadow-xl shadow-amber-950/20 mb-7 z-10 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-300 uppercase">
            NIMS UNIVERSITY CULTURAL CHAMPIONSHIP • 18-21 NOVEMBER 2026
          </span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* Outer Left Floating Badges (Pinned to Far Left Edge With Increased Sizing) */}
        <div className="hidden xl:flex flex-col gap-4.5 absolute left-3 2xl:left-8 top-[17%] 2xl:top-[19%] z-20">
          {/* Badge 1: Championship Glory */}
          <div className="w-56 2xl:w-64 p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-amber-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-left transform hover:-translate-y-1 hover:border-amber-400 transition-all duration-300 animate-live-sway">
            <div className="flex items-center gap-3">
              <div className="p-2.5 2xl:p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0">
                <Trophy className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
              <div>
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase">CHAMPIONSHIP GLORY</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5">30+ Leading Institutes</p>
              </div>
            </div>
          </div>

          {/* Badge 2: 100% Student-Led */}
          <div className="w-56 2xl:w-64 p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-rose-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-left transform hover:-translate-y-1 hover:border-rose-400 transition-all duration-300 animate-live-sway" style={{ animationDelay: "1.3s" }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 2xl:p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 shrink-0">
                <Users className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
              <div>
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase">100% STUDENT-LED</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5">NIMS Student Council</p>
              </div>
            </div>
          </div>

          {/* Badge 3: ₹5,00,000+ Awards */}
          <div className="w-56 2xl:w-64 p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-amber-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-left transform hover:-translate-y-1 hover:border-amber-400 transition-all duration-300 animate-live-sway" style={{ animationDelay: "2.6s" }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 2xl:p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0">
                <Award className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
              <div>
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase">₹5,00,000+ AWARDS</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5">Rolling Champions Trophy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Central Logo & Majestic Typography (Generous Unobstructed Space) */}
        <div className="w-full max-w-3xl 2xl:max-w-4xl mx-auto flex flex-col items-center px-4 z-10">
          {/* Official Abhivyakti Stylized Logo Container */}
          <div className="relative mb-6 p-4 sm:p-5 rounded-3xl bg-white shadow-2xl shadow-rose-950/70 border-4 border-amber-400/90 max-w-xs sm:max-w-sm w-full mx-auto transform hover:scale-105 transition-transform duration-300">
            <img
              src="/Abhivyakti.png"
              alt="Abhivyakti Cultural Festival Logo"
              className="w-full h-auto max-h-32 sm:max-h-36 object-contain mx-auto"
            />
          </div>

          {/* Regal Headline With Pure White Line 1 & Golden Amber Line 2 (Matching Image 2 Reference) */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[3.9rem] 2xl:text-[4.2rem] font-black tracking-tight leading-[1.08] mb-5">
            <span className="block text-white font-serif font-black tracking-tight drop-shadow-[0_2px_18px_rgba(255,255,255,0.35)] whitespace-nowrap">
              Celebrating Cultural
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-serif font-black tracking-tight drop-shadow-[0_4px_28px_rgba(245,184,66,0.5)] whitespace-nowrap mt-1 sm:mt-2">
              Majesty & Excellence
            </span>
          </h1>

          {/* Subtitle Description With 18 to 21 November Date Range */}
          <p className="text-xs sm:text-sm text-rose-200/90 font-medium max-w-xl leading-relaxed mb-7">
            Colleges And Institutes Across NIMS University Compete From{" "}
            <strong className="text-amber-300 font-bold">18 To 21 November 2026</strong> In Singing, Classical Dance,
            Street Play, Battle Of The Bands, And Visual Arts For The Coveted{" "}
            <strong className="text-amber-300 font-bold">Abhivyakti Inter-College Championship Trophy</strong>.
          </p>

          {/* 4-Card Countdown Timer */}
          <div className="w-full max-w-md">
            <CountdownTimer targetDate="2026-11-18T09:00:00" />
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

        {/* Outer Right Floating Badges (Pinned to Far Right Edge With Increased Sizing) */}
        <div className="hidden xl:flex flex-col gap-4.5 absolute right-3 2xl:right-8 top-[17%] 2xl:top-[19%] z-20">
          {/* Badge 4: 6 Cultural Arenas */}
          <div className="w-56 2xl:w-64 p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-amber-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-right transform hover:-translate-y-1 hover:border-amber-400 transition-all duration-300 animate-live-float-slow" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center justify-end gap-3">
              <div>
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase">6 CULTURAL ARENAS</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5">Music, Dance, Drama, Vogue</p>
              </div>
              <div className="p-2.5 2xl:p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0">
                <Flame className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
            </div>
          </div>

          {/* Badge 5: Grand Central Venue */}
          <div className="w-56 2xl:w-64 p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-rose-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-right transform hover:-translate-y-1 hover:border-rose-400 transition-all duration-300 animate-live-float-slow" style={{ animationDelay: "1.9s" }}>
            <div className="flex items-center justify-end gap-3">
              <div>
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase">GRAND CENTRAL VENUE</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5">NIMS Jaipur Grounds</p>
              </div>
              <div className="p-2.5 2xl:p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 shrink-0">
                <MapPin className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
            </div>
          </div>

          {/* Badge 6: Verified Jury Engine */}
          <div className="w-56 2xl:w-64 p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-amber-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-right transform hover:-translate-y-1 hover:border-amber-400 transition-all duration-300 animate-live-float-slow" style={{ animationDelay: "3.2s" }}>
            <div className="flex items-center justify-end gap-3">
              <div>
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase">VERIFIED JURY ENGINE</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5">Real-Time Score Sync</p>
              </div>
              <div className="p-2.5 2xl:p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0">
                <ShieldCheck className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Badges Strip (visible on mobile / tablet) */}
        <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full mt-10 z-10 max-w-3xl px-2">
          <div className="p-3.5 rounded-xl bg-[#0e0205] border border-amber-500/30 text-center shadow-lg">
            <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-amber-200 uppercase">Championship Glory</p>
            <p className="text-[11px] text-rose-200">30+ Leading Institutes</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0e0205] border border-rose-500/30 text-center shadow-lg">
            <Users className="w-5 h-5 text-rose-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-amber-200 uppercase">100% Student-Led</p>
            <p className="text-[11px] text-rose-200">NIMS Student Council</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#0e0205] border border-amber-500/30 text-center shadow-lg">
            <ShieldCheck className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-amber-200 uppercase">Verified Scoring</p>
            <p className="text-[11px] text-rose-200">Real-Time Jury Sync</p>
          </div>
        </div>
      </section>

      {/* Festival Key Metrics Bar With Deep Blackish Tone & Golden Glow */}
      <section className="border-y border-amber-500/20 bg-gradient-to-r from-[#050002] via-[#120206] to-[#050002] py-9 px-4 relative z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-rose-950/60">
          <div className="px-3">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_2px_12px_rgba(245,184,66,0.3)]">
              12+
            </p>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-rose-200/90 mt-1.5 uppercase">
              Participating Institutes
            </p>
          </div>
          <div className="px-3">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_2px_12px_rgba(245,184,66,0.3)]">
              15
            </p>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-rose-200/90 mt-1.5 uppercase">
              Official Competitions
            </p>
          </div>
          <div className="px-3">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_2px_12px_rgba(245,184,66,0.3)]">
              ₹5,00,000+
            </p>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-rose-200/90 mt-1.5 uppercase">
              Prize & Trophy Value
            </p>
          </div>
          <div className="px-3">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_2px_12px_rgba(245,184,66,0.3)]">
              5,000+
            </p>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-rose-200/90 mt-1.5 uppercase">
              Passionate Students
            </p>
          </div>
        </div>
      </section>

      {/* Official Schedule Section Matching Image 3 Reference */}
      <section id="schedule" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Four Days Of Cultural Brilliance • 18-21 Nov 2026
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white uppercase tracking-tight">
              Official Event Schedule & Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-rose-200/70 mt-1">
              Click 'Guidelines & Rules' On Any Competition To Inspect Rubrics, Point Matrices, And Time Limits.
            </p>
          </div>

          {/* 4-Day Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0f0205] border border-rose-950/80 overflow-x-auto max-w-full">
            {(["Day 1", "Day 2", "Day 3", "Day 4", "All"] as const).map((day) => {
              const labelMap: Record<string, string> = {
                "Day 1": "Day 1 (18 Nov)",
                "Day 2": "Day 2 (19 Nov)",
                "Day 3": "Day 3 (20 Nov)",
                "Day 4": "Day 4 (21 Nov)",
                All: "View Full Schedule",
              };
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedDay === day
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25"
                      : "text-rose-200/70 hover:text-white"
                  }`}
                >
                  {labelMap[day]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule Cards Grid Elevated Matching Image 3 Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#0a0103] border border-rose-950/70 hover:border-amber-500/60 hover:bg-[#120206] hover:shadow-[0_8px_30px_rgba(245,184,66,0.12)] transition-all duration-300 group shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Category Badge On Left + Date & Time Stacked On Right */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${getCategoryBadgeClass(item.category)}`}>
                    {item.category}
                  </span>
                  <div className="text-right shrink-0">
                    <span className="block text-xs font-bold text-amber-100">{item.date}</span>
                    <span className="block text-[11px] text-amber-400 font-semibold">{item.time}</span>
                  </div>
                </div>

                {/* Event Title In Bold White */}
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Card Bottom: Venue + Day + Guidelines Button */}
              <div className="mt-5 pt-3.5 border-t border-rose-950/80 space-y-3">
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
                  className="w-full py-2.5 px-3 rounded-xl bg-[#180307] hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 hover:text-black text-amber-300 text-xs font-bold border border-amber-500/30 transition-all flex items-center justify-center gap-2 shadow-sm"
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

      {/* Dedicated Top 3 Contingents Podium & Championship Leaderboard Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rose-950/80 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Top 3 College Contingents Podium</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white drop-shadow-[0_4px_20px_rgba(255,255,255,0.35)]">
              Championship Leaderboard
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 mt-1 font-medium">
              Live Standings Computed From Verified Jury Scorecards Across All Cultural Arenas.
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

        {/* Dedicated Top 3 Elevated Podium With Dummy Data */}
        <div className="mb-12">
          <Podium topThree={podium.length >= 3 ? podium : DEFAULT_TOP_THREE} />
        </div>

        {/* Quick Table Preview */}
        <div className="mt-8">
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
              iconStyle: "bg-rose-500/15 border-rose-500/40 text-rose-400",
              badgeStyle: "bg-rose-950/70 text-rose-300 border-rose-700/50",
              cardHover: "hover:border-rose-500/50 hover:shadow-rose-950/40",
            },
            {
              title: "Vocal Resonance & Melody",
              desc: "Acoustic Ballads, Duet Harmonies, And High-Energy Group Ensembles Competing Across Rounds.",
              icon: Sparkles,
              badge: "Crowd Favorite",
              iconStyle: "bg-amber-500/15 border-amber-500/40 text-amber-400",
              badgeStyle: "bg-amber-950/70 text-amber-300 border-amber-700/50",
              cardHover: "hover:border-amber-500/50 hover:shadow-amber-950/40",
            },
            {
              title: "Couture & Fashion Upcycling",
              desc: "Eco-Friendly High Fashion And The Electric Kick Drip Sneaker Customization Challenge.",
              icon: Layers,
              badge: "Trendsetting",
              iconStyle: "bg-purple-500/15 border-purple-500/40 text-purple-400",
              badgeStyle: "bg-purple-950/70 text-purple-300 border-purple-700/50",
              cardHover: "hover:border-purple-500/50 hover:shadow-purple-950/40",
            },
            {
              title: "Fine Arts & Visual Expression",
              desc: "Live Doodling, Intricate Calligraphy, Clay Sculpting, And Expressive Face Painting.",
              icon: BookOpen,
              badge: "Artisan Arena",
              iconStyle: "bg-yellow-500/15 border-yellow-500/40 text-yellow-400",
              badgeStyle: "bg-yellow-950/70 text-yellow-300 border-yellow-700/50",
              cardHover: "hover:border-yellow-500/50 hover:shadow-yellow-950/40",
            },
            {
              title: "Digital Art & AI Generation",
              desc: "Harnessing Generative AI Prompts And Digital Workflows To Create Concept Art.",
              icon: Trophy,
              badge: "New For 2026",
              iconStyle: "bg-cyan-500/15 border-cyan-500/40 text-cyan-400",
              badgeStyle: "bg-cyan-950/70 text-cyan-300 border-cyan-700/50",
              cardHover: "hover:border-cyan-500/50 hover:shadow-cyan-950/40",
            },
            {
              title: "Theatrical Drama & Mono Act",
              desc: "Solo Dramatic Enactments Commanding The Grand Rajeshwari Auditorium Stage.",
              icon: Users,
              badge: "Dramatic Arts",
              iconStyle: "bg-red-500/15 border-red-500/40 text-red-400",
              badgeStyle: "bg-red-950/70 text-red-300 border-red-700/50",
              cardHover: "hover:border-red-500/50 hover:shadow-red-950/40",
            },
          ].map((arena, i) => {
            const Icon = arena.icon;
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl bg-[#0c0104]/90 border border-rose-950/80 transition-all duration-300 group shadow-lg ${arena.cardHover}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl border group-hover:scale-110 transition-transform ${arena.iconStyle}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${arena.badgeStyle}`}>
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
