import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { CountdownTimer } from "@/Components/Ui/CountdownTimer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import { Footer } from "@/Components/Ui/Footer";
import { Podium } from "@/Components/Leaderboard/Podium";
import { LeaderboardTable } from "@/Components/Leaderboard/LeaderboardTable";
import { Api } from "@/Lib/Api";
import {
  Trophy,
  Users,
  Award,
  Radio,
  Sparkles,
  MapPin,
  Calendar,
  ChevronRight,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Flame,
  HelpCircle,
  ExternalLink,
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
}

const OFFICIAL_SCHEDULE: ScheduleEventItem[] = [
  // Day 1: 21 Nov 2025
  { id: "1", title: "Dance - Solo, Duet & Group (Round 1)", day: "Day 1", date: "21 Nov 2025", time: "10:00 AM", venue: "Rajeshwari Auditorium", category: "Dance" },
  { id: "2", title: "Singing - Solo, Duet & Group (Round 1)", day: "Day 1", date: "21 Nov 2025", time: "10:00 AM", venue: "Management - LT 10 & 11", category: "Music" },
  { id: "3", title: "Face Painting", day: "Day 1", date: "21 Nov 2025", time: "02:00 PM", venue: "Management - LT 16 & 17", category: "Fine Arts" },
  { id: "4", title: "Best Out Of Waste", day: "Day 1", date: "21 Nov 2025", time: "02:00 PM", venue: "Management - LT 21", category: "Creative Arts" },
  { id: "5", title: "Fashion Upcycling", day: "Day 1", date: "21 Nov 2025", time: "03:00 PM", venue: "Fashion Lab & LT 16, 17", category: "Fashion" },
  { id: "6", title: "Doodling Competition", day: "Day 1", date: "21 Nov 2025", time: "04:00 PM", venue: "Moot Court 2", category: "Fine Arts" },
  { id: "7", title: "Collage Making", day: "Day 1", date: "21 Nov 2025", time: "04:00 PM", venue: "LT 21, 15", category: "Fine Arts" },
  { id: "8", title: "Clay Art", day: "Day 1", date: "21 Nov 2025", time: "04:00 PM", venue: "Corridor - 1st Floor", category: "Fine Arts" },

  // Day 2: 22 Nov 2025
  { id: "9", title: "Mono Act", day: "Day 2", date: "22 Nov 2025", time: "09:00 AM", venue: "Rajeshwari Auditorium", category: "Drama" },
  { id: "10", title: "Dance - Solo, Duet & Group (Round 2)", day: "Day 2", date: "22 Nov 2025", time: "11:00 AM", venue: "Rajeshwari Auditorium", category: "Dance" },
  { id: "11", title: "Singing - Solo, Duet & Group (Round 2)", day: "Day 2", date: "22 Nov 2025", time: "11:00 AM", venue: "LT 10 & 11", category: "Music" },
  { id: "12", title: "AI Art", day: "Day 2", date: "22 Nov 2025", time: "02:00 PM", venue: "LT 25", category: "Digital Arts" },
  { id: "13", title: "Calligraphy", day: "Day 2", date: "22 Nov 2025", time: "02:00 PM", venue: "Moot Court", category: "Fine Arts" },
  { id: "14", title: "MakeUp Contest", day: "Day 2", date: "22 Nov 2025", time: "02:30 PM", venue: "LT 16, 17 & Corridor (2nd Floor)", category: "Creative Arts" },
  { id: "15", title: "Kick Drip", day: "Day 2", date: "22 Nov 2025", time: "02:30 PM", venue: "LT 21 & 15", category: "Fashion" },
];

export const Home: React.FC = () => {
  const [standings, setStandings] = useState<any[]>([]);
  const [podium, setPodium] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState<"All" | "Day 1" | "Day 2">("Day 1");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await Api.get("/scores/leaderboard/");
        if (res.data?.standings) {
          setStandings(res.data.standings);
          setPodium(res.data.podium || res.data.standings.slice(0, 3));
        }
      } catch {
        // Fallback demo data
      }
    };
    fetchLeaderboard();
  }, []);

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
      q: "How Is The Overall Championship Trophy Decided?",
      a: "Points Are Awarded For 1st (40 Pts), 2nd (25 Pts), And 3rd Place (15 Pts) In Each Competition. The Contingent With The Highest Cumulative Score Across All Arenas Lifts The Coveted Rolling Trophy.",
    },
    {
      q: "Can An Individual Student Participate In Multiple Events?",
      a: "Yes, Provided There Is No Direct Time Conflict In The Official Schedule. Ensure You Coordinate With Your College Contingent In-Charge.",
    },
    {
      q: "Are External College Students Allowed To Attend As Audience?",
      a: "Audience Entry Requires A Valid University Identity Card Or Verified Digital Guest Pass Issued By The NIMS Student Council Fest Directorate.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e0204] text-amber-50 selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      <FloatingBackgroundElements />

      {/* Marquee Banner */}
      <FestiveTicker />

      {/* Primary Navigation */}
      <Navbar />

      {/* Hero Section Matching Image 1 Reference */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto flex flex-col items-center">
        {/* NIMS Championship Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-rose-950/80 via-amber-950/40 to-rose-950/80 border border-amber-500/40 shadow-lg shadow-amber-950/20 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-300 uppercase">
            NIMS UNIVERSITY CULTURAL CHAMPIONSHIP 2026
          </span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* Hero Grid With Floating Left/Right Badges Matching Attached Image 1 */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Left Floating Badges */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-5 items-start">
            {/* Badge 1: Championship Glory */}
            <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#1e0408]/90 to-[#2c060d]/70 border border-amber-500/30 backdrop-blur-md shadow-xl text-left transform hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-wide text-amber-200">CHAMPIONSHIP GLORY</h4>
                  <p className="text-xs text-rose-300/80">30+ Leading Institutes</p>
                </div>
              </div>
            </div>

            {/* Badge 2: 100% Student-Led */}
            <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#1e0408]/90 to-[#2c060d]/70 border border-rose-500/30 backdrop-blur-md shadow-xl text-left transform hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-wide text-amber-200">100% STUDENT-LED</h4>
                  <p className="text-xs text-rose-300/80">NIMS Student Council</p>
                </div>
              </div>
            </div>

            {/* Badge 3: ₹5,00,000+ Awards */}
            <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#1e0408]/90 to-[#2c060d]/70 border border-amber-500/30 backdrop-blur-md shadow-xl text-left transform hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-wide text-amber-200">₹5,00,000+ AWARDS</h4>
                  <p className="text-xs text-rose-300/80">Rolling Champions Trophy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Central Logo & Headings */}
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center">
            {/* Official Abhivyakti Stylized Logo Box */}
            <div className="relative mb-6 p-4 rounded-3xl bg-white shadow-2xl shadow-rose-950/50 border-4 border-amber-400/80 max-w-sm w-full mx-auto transform hover:scale-105 transition-transform duration-300">
              <img
                src="/Abhivyakti.png"
                alt="Abhivyakti Cultural Festival Logo"
                className="w-full h-auto max-h-36 object-contain mx-auto"
              />
            </div>

            {/* Majestic Heading */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-500 mb-6 drop-shadow-md">
              Celebrating Cultural <br className="hidden sm:inline" />
              Majesty & Excellence
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-rose-200/90 font-medium max-w-2xl leading-relaxed mb-8">
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
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Explore Competitions</span>
              </Link>

              <Link
                to="/leaderboard"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#220409] text-amber-200 border border-amber-500/40 hover:bg-rose-950/60 hover:text-white transition-all flex items-center gap-2 shadow-lg"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>View Leaderboard</span>
              </Link>

              <Link
                to="/rulebook"
                className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-rose-950/40 text-rose-300 border border-rose-900/40 hover:bg-rose-900/50 hover:text-white transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-rose-400" />
                <span>Rulebook</span>
              </Link>
            </div>
          </div>

          {/* Right Floating Badges */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-5 items-end">
            {/* Badge 4: Live Score Engine */}
            <div className="w-full p-4 rounded-2xl bg-gradient-to-l from-[#1e0408]/90 to-[#2c060d]/70 border border-emerald-500/30 backdrop-blur-md shadow-xl text-right transform hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-end gap-3">
                <div>
                  <h4 className="text-sm font-black tracking-wide text-amber-200">LIVE SCORE ENGINE</h4>
                  <p className="text-xs text-rose-300/80">Real-Time Jury Sync</p>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Badge 5: 6 Cultural Arenas */}
            <div className="w-full p-4 rounded-2xl bg-gradient-to-l from-[#1e0408]/90 to-[#2c060d]/70 border border-amber-500/30 backdrop-blur-md shadow-xl text-right transform hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-end gap-3">
                <div>
                  <h4 className="text-sm font-black tracking-wide text-amber-200">6 CULTURAL ARENAS</h4>
                  <p className="text-xs text-rose-300/80">Music, Dance, Drama, Vogue</p>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Badge 6: Grand Central Venue */}
            <div className="w-full p-4 rounded-2xl bg-gradient-to-l from-[#1e0408]/90 to-[#2c060d]/70 border border-rose-500/30 backdrop-blur-md shadow-xl text-right transform hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-end gap-3">
                <div>
                  <h4 className="text-sm font-black tracking-wide text-amber-200">GRAND CENTRAL VENUE</h4>
                  <p className="text-xs text-rose-300/80">NIMS Jaipur Grounds</p>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Badges Strip (visible on small screens) */}
        <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-4">
          <div className="p-3 rounded-xl bg-[#1e0408] border border-amber-500/30 text-center">
            <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-amber-200">Championship Glory</p>
            <p className="text-[10px] text-rose-300/70">30+ Colleges</p>
          </div>
          <div className="p-3 rounded-xl bg-[#1e0408] border border-rose-500/30 text-center">
            <Users className="w-5 h-5 text-rose-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-amber-200">100% Student-Led</p>
            <p className="text-[10px] text-rose-300/70">Student Council</p>
          </div>
          <div className="p-3 rounded-xl bg-[#1e0408] border border-emerald-500/30 text-center">
            <Radio className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-amber-200">Live Score Engine</p>
            <p className="text-[10px] text-rose-300/70">Real-Time Sync</p>
          </div>
        </div>
      </section>

      {/* Festival Key Metrics Bar */}
      <section className="border-y border-rose-950/60 bg-[#160207]/90 py-8 px-4">
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

      {/* Live Leaderboard Standings Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Trophy className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Inter-College Rankings</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
              Championship Leaderboard
            </h2>
            <p className="text-sm text-rose-200/70 mt-1">
              Live standings computed from verified jury scorecards across all cultural arenas.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/live"
              target="_blank"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-950/50 text-rose-300 border border-rose-900/50 hover:bg-rose-900/50 transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Screen Live View</span>
            </Link>
            <Link
              to="/leaderboard"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
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

      {/* Official Schedule Section Matching Image 2 Reference */}
      <section id="schedule" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rose-950/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Two Days Of Cultural Brilliance</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
              Official Event Schedule
            </h2>
            <p className="text-sm text-rose-200/70 mt-1">
              Exact schedule and venues as verified by the NIMS Cultural Fest Directorate.
            </p>
          </div>

          {/* Day Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#1d0307] border border-rose-950/80">
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

        {/* Schedule Cards Grid Matching Image 2 Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#170306] border border-rose-950/80 hover:border-amber-500/50 hover:bg-[#200409] transition-all group shadow-lg flex flex-col justify-between"
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

              <div className="mt-4 pt-3 border-t border-rose-950/60 flex items-center justify-between text-xs text-rose-300/80">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">{item.venue}</span>
                </div>
                <span className="text-[11px] font-semibold text-amber-400/90">{item.day}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#220409] border border-amber-500/30 text-amber-300 hover:bg-rose-950/60 transition-all text-xs font-bold"
          >
            <span>View Complete Schedule With Round Details</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Cultural Arenas Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-rose-950/60">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
            Multidisciplinary Arenas
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white mt-2">
            6 Arenas Of Distinction
          </h2>
          <p className="text-sm text-rose-200/70 mt-2">
            From classic rhythmic beats to cutting-edge generative AI art, Abhivyakti honors every form of creative brilliance.
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
              desc: "Harnessing Generative AI Prompts And Digital Tools To Create Visionary Concept Art.",
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
                className="p-6 rounded-2xl bg-gradient-to-b from-[#1c0408] to-[#120205] border border-rose-950/80 hover:border-amber-500/40 transition-all group"
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

      {/* Official Rulebook Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#29050d] via-[#1e0308] to-[#2b050d] border border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Championship Code Of Honor</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Official Abhivyakti 2026 Rulebook & Scoring Rubric
            </h3>
            <p className="text-sm text-rose-200/80 mt-3 leading-relaxed">
              Explore Judging Parameters, Point Allocations, Time Limits, And Disqualification Protocols
              Formulated By The NIMS Cultural Fest Directorate For Fair Competition.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/rulebook"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:scale-105 transition-transform shadow-lg shadow-amber-500/30 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-black" />
              <span>Read Full Rulebook</span>
            </Link>
            <a
              href="/Abhivyakti.png"
              download="Abhivyakti-Fest-Pass.png"
              className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-rose-950/60 border border-rose-900/60 text-rose-200 hover:text-white hover:bg-rose-900/60 transition-all flex items-center gap-2"
            >
              <span>Download Digital Poster</span>
            </a>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-rose-950/60">
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
                className="rounded-xl bg-[#180307] border border-rose-950/80 overflow-hidden transition-all"
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
    </div>
  );
};
export default Home;
