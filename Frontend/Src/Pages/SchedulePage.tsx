import React, { useState } from "react";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { Footer } from "@/Components/Ui/Footer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Download,
  Filter,
  CheckCircle2,
  ChevronRight,
  Flame,
} from "lucide-react";

interface ScheduleItem {
  id: number;
  day: "Day 1" | "Day 2";
  date: string;
  time: string;
  title: string;
  category: string;
  venue: string;
  duration: string;
  round: string;
  isGrandFinale?: boolean;
}

const COMPLETE_SCHEDULE: ScheduleItem[] = [
  // Day 1: 21 Nov 2025
  {
    id: 1,
    day: "Day 1",
    date: "21 Nov 2025",
    time: "10:00 AM",
    title: "Dance - Solo, Duet & Group (Round 1)",
    category: "Dance",
    venue: "Rajeshwari Auditorium",
    duration: "180 Mins",
    round: "Elimination Round",
  },
  {
    id: 2,
    day: "Day 1",
    date: "21 Nov 2025",
    time: "10:00 AM",
    title: "Singing - Solo, Duet & Group (Round 1)",
    category: "Music",
    venue: "Management - LT 10 & 11",
    duration: "180 Mins",
    round: "Preliminary Round",
  },
  {
    id: 3,
    day: "Day 1",
    date: "21 Nov 2025",
    time: "02:00 PM",
    title: "Face Painting",
    category: "Fine Arts",
    venue: "Management - LT 16 & 17",
    duration: "90 Mins",
    round: "Finals",
  },
  {
    id: 4,
    day: "Day 1",
    date: "21 Nov 2025",
    time: "02:00 PM",
    title: "Best Out Of Waste",
    category: "Creative Arts",
    venue: "Management - LT 21",
    duration: "120 Mins",
    round: "Finals",
  },
  {
    id: 5,
    day: "Day 1",
    date: "21 Nov 2025",
    time: "03:00 PM",
    title: "Fashion Upcycling",
    category: "Fashion",
    venue: "Fashion Lab & LT 16, 17",
    duration: "180 Mins",
    round: "Finals Showcase",
  },
  {
    id: 6,
    day: "Day 1",
    date: "21 Nov 2025",
    time: "04:00 PM",
    title: "Doodling Competition",
    category: "Fine Arts",
    venue: "Moot Court 2",
    duration: "60 Mins",
    round: "Finals",
  },
  {
    id: 7,
    day: "Day 1",
    date: "21 Nov 2025",
    time: "04:00 PM",
    title: "Collage Making",
    category: "Fine Arts",
    venue: "LT 21, 15",
    duration: "90 Mins",
    round: "Finals",
  },
  {
    id: 8,
    day: "Day 1",
    date: "21 Nov 2025",
    time: "04:00 PM",
    title: "Clay Art",
    category: "Fine Arts",
    venue: "Corridor - 1st Floor",
    duration: "120 Mins",
    round: "Finals",
  },

  // Day 2: 22 Nov 2025
  {
    id: 9,
    day: "Day 2",
    date: "22 Nov 2025",
    time: "09:00 AM",
    title: "Mono Act",
    category: "Drama",
    venue: "Rajeshwari Auditorium",
    duration: "120 Mins",
    round: "Finals",
  },
  {
    id: 10,
    day: "Day 2",
    date: "22 Nov 2025",
    time: "11:00 AM",
    title: "Dance - Solo, Duet & Group (Round 2)",
    category: "Dance",
    venue: "Rajeshwari Auditorium",
    duration: "180 Mins",
    round: "Grand Finale",
    isGrandFinale: true,
  },
  {
    id: 11,
    day: "Day 2",
    date: "22 Nov 2025",
    time: "11:00 AM",
    title: "Singing - Solo, Duet & Group (Round 2)",
    category: "Music",
    venue: "LT 10 & 11",
    duration: "150 Mins",
    round: "Grand Finale",
    isGrandFinale: true,
  },
  {
    id: 12,
    day: "Day 2",
    date: "22 Nov 2025",
    time: "02:00 PM",
    title: "AI Art",
    category: "Digital Arts",
    venue: "LT 25",
    duration: "90 Mins",
    round: "Finals",
  },
  {
    id: 13,
    day: "Day 2",
    date: "22 Nov 2025",
    time: "02:00 PM",
    title: "Calligraphy",
    category: "Fine Arts",
    venue: "Moot Court",
    duration: "90 Mins",
    round: "Finals",
  },
  {
    id: 14,
    day: "Day 2",
    date: "22 Nov 2025",
    time: "02:30 PM",
    title: "MakeUp Contest",
    category: "Creative Arts",
    venue: "LT 16, 17 & Corridor (2nd Floor)",
    duration: "90 Mins",
    round: "Finals",
  },
  {
    id: 15,
    day: "Day 2",
    date: "22 Nov 2025",
    time: "02:30 PM",
    title: "Kick Drip",
    category: "Fashion",
    venue: "LT 21 & 15",
    duration: "90 Mins",
    round: "Finals",
  },
];

export const SchedulePage: React.FC = () => {
  const [activeDay, setActiveDay] = useState<"All" | "Day 1" | "Day 2">("Day 1");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Dance", "Music", "Fine Arts", "Fashion", "Drama", "Digital Arts", "Creative Arts"];

  const filteredSchedule = COMPLETE_SCHEDULE.filter((item) => {
    const matchesDay = activeDay === "All" || item.day === activeDay;
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchesDay && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#0e0204] text-amber-50 relative selection:bg-amber-500 selection:text-black">
      <FloatingBackgroundElements />
      <FestiveTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Master Fest Itinerary</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Festival Schedule
          </h1>
          <p className="text-sm text-rose-200/80 mt-3 leading-relaxed">
            Detailed 2-Day Timeline With Venues, Starting Times, And Round Progression For NIMS Abhivyakti 2026.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#160207] p-4 rounded-2xl border border-rose-950/80">
          {/* Day Tabs */}
          <div className="flex items-center gap-2">
            {(["Day 1", "Day 2", "All"] as const).map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeDay === day
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "text-rose-200/70 hover:text-white hover:bg-rose-950/40"
                }`}
              >
                {day === "All" ? "Both Days" : `${day} (${day === "Day 1" ? "21 Nov" : "22 Nov"})`}
              </button>
            ))}
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
                  ? "bg-gradient-to-r from-[#2c060e] via-[#1a0307] to-[#2c060e] border-amber-500/50 shadow-xl shadow-amber-950/20"
                  : "bg-[#170306] border-rose-950/80 hover:border-amber-500/40 hover:bg-[#1e0408]"
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
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
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

                {/* Venue Column */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#120205] border border-rose-950/70 md:min-w-[240px] justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="text-xs font-semibold text-rose-200 truncate">{item.venue}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Download Notice */}
        <div className="mt-12 p-6 rounded-2xl bg-[#1b0307] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-amber-200">Official Directorate Schedule Sign-Off</h4>
            <p className="text-xs text-rose-300/80 mt-1">
              Events May Have Staggered Reporting Times (30 Mins Before Start). Contingents Must Report Promptly.
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-amber-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Print Official Schedule</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default SchedulePage;
