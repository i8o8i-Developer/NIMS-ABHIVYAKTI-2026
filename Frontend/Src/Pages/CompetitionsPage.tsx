import React, { useState, useEffect } from "react";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { Footer } from "@/Components/Ui/Footer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import { Api } from "@/Lib/Api";
import {
  Sparkles,
  Search,
  MapPin,
  Calendar,
  Clock,
  Trophy,
  Users,
  ShieldAlert,
  X,
  Layers,
  ChevronRight,
} from "lucide-react";

interface Competition {
  id: number;
  title: string;
  category: string;
  arena: string;
  venue: string;
  event_date: string;
  start_time: string;
  max_participants: number;
  rules_summary: string;
  status: string;
  first_place_points: number;
  second_place_points: number;
  third_place_points: number;
}

const FALLBACK_COMPETITIONS: Competition[] = [
  {
    id: 1,
    title: "Dance - Solo, Duet & Group (Round 1)",
    category: "Dance",
    arena: "Performing Arts",
    venue: "Rajeshwari Auditorium",
    event_date: "2025-11-21",
    start_time: "10:00 AM",
    max_participants: 12,
    rules_summary: "Time limit 4-6 minutes. Props allowed with prior approval. Classical, folk, and contemporary styles accepted.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 2,
    title: "Singing - Solo, Duet & Group (Round 1)",
    category: "Music",
    arena: "Vocal Resonance",
    venue: "Management - LT 10 & 11",
    event_date: "2025-11-21",
    start_time: "10:00 AM",
    max_participants: 6,
    rules_summary: "Time limit 3-5 minutes. Backing tracks or acoustic instruments permitted. Judging on pitch, rhythm, and expression.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 3,
    title: "Face Painting",
    category: "Fine Arts",
    arena: "Visual Expression",
    venue: "Management - LT 16 & 17",
    event_date: "2025-11-21",
    start_time: "02:00 PM",
    max_participants: 2,
    rules_summary: "Theme announced on spot. Duration 90 minutes. Non-toxic paints strictly required. Both model and painter must be registered.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 4,
    title: "Best Out Of Waste",
    category: "Creative Arts",
    arena: "Sustainable Creation",
    venue: "Management - LT 21",
    event_date: "2025-11-21",
    start_time: "02:00 PM",
    max_participants: 2,
    rules_summary: "Participants must bring discarded recyclable materials. Duration 2 hours. Judging on creativity and utility.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 5,
    title: "Fashion Upcycling",
    category: "Fashion",
    arena: "Couture & Runway",
    venue: "Fashion Lab & LT 16, 17",
    event_date: "2025-11-21",
    start_time: "03:00 PM",
    max_participants: 4,
    rules_summary: "Transform discarded textiles into high-couture garments. 3 hours crafting followed by runway demonstration.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 6,
    title: "Doodling Competition",
    category: "Fine Arts",
    arena: "Visual Expression",
    venue: "Moot Court 2",
    event_date: "2025-11-21",
    start_time: "04:00 PM",
    max_participants: 1,
    rules_summary: "Single participant. A3 sheets provided. Black fine-liners and markers only. Duration 60 minutes.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 7,
    title: "Collage Making",
    category: "Fine Arts",
    arena: "Visual Expression",
    venue: "LT 21, 15",
    event_date: "2025-11-21",
    start_time: "04:00 PM",
    max_participants: 2,
    rules_summary: "Theme: 'Heritage Meets Future'. Newspapers, magazines, and adhesives. Duration 90 minutes.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 8,
    title: "Clay Art",
    category: "Fine Arts",
    arena: "Visual Expression",
    venue: "Corridor - 1st Floor",
    event_date: "2025-11-21",
    start_time: "04:00 PM",
    max_participants: 1,
    rules_summary: "Terracotta and modeling clay. Duration 2 hours. Judged on structural balance, intricacy, and originality.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 9,
    title: "Mono Act",
    category: "Drama",
    arena: "Theatrical Arts",
    venue: "Rajeshwari Auditorium",
    event_date: "2025-11-22",
    start_time: "09:00 AM",
    max_participants: 1,
    rules_summary: "Solo performance commanding the main stage. 5 minutes maximum. No offensive or profane material.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 10,
    title: "Dance - Solo, Duet & Group (Round 2)",
    category: "Dance",
    arena: "Performing Arts",
    venue: "Rajeshwari Auditorium",
    event_date: "2025-11-22",
    start_time: "11:00 AM",
    max_participants: 12,
    rules_summary: "Grand finale round for qualified finalists. Elaborate costumes and live lighting coordination permitted.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 11,
    title: "Singing - Solo, Duet & Group (Round 2)",
    category: "Music",
    arena: "Vocal Resonance",
    venue: "LT 10 & 11",
    event_date: "2025-11-22",
    start_time: "11:00 AM",
    max_participants: 6,
    rules_summary: "Grand finale vocal showcase. Live microphone setup with dual monitor checks. Jury rubric applied.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 12,
    title: "AI Art",
    category: "Digital Arts",
    arena: "Innovation & Digital",
    venue: "LT 25",
    event_date: "2025-11-22",
    start_time: "02:00 PM",
    max_participants: 1,
    rules_summary: "Prompt engineering and digital composition. Real-time generation monitored by technical jury.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 13,
    title: "Calligraphy",
    category: "Fine Arts",
    arena: "Visual Expression",
    venue: "Moot Court",
    event_date: "2025-11-22",
    start_time: "02:00 PM",
    max_participants: 1,
    rules_summary: "Traditional and modern script calligraphy. English and Devanagari scripts evaluated on precision.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 14,
    title: "MakeUp Contest",
    category: "Creative Arts",
    arena: "Visual Expression",
    venue: "LT 16, 17 & Corridor (2nd Floor)",
    event_date: "2025-11-22",
    start_time: "02:30 PM",
    max_participants: 2,
    rules_summary: "High-glamour and theatrical makeup styling. 90 minutes working window followed by jury review.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 15,
    title: "Kick Drip",
    category: "Fashion",
    arena: "Couture & Runway",
    venue: "LT 21 & 15",
    event_date: "2025-11-22",
    start_time: "02:30 PM",
    max_participants: 2,
    rules_summary: "Sneaker custom artwork and embellishment. Bring your plain sneakers and paint/accessories.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
];

export const CompetitionsPage: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>(FALLBACK_COMPETITIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Competition | null>(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await Api.get("/competitions/");
        if (res.data?.results && res.data.results.length > 0) {
          setCompetitions(res.data.results);
        }
      } catch {
        // Fallback already initialized
      }
    };
    fetchCompetitions();
  }, []);

  const categories = ["All", "Dance", "Music", "Fine Arts", "Fashion", "Drama", "Digital Arts", "Creative Arts"];

  const filteredCompetitions = competitions.filter((c) => {
    const matchesCategory = selectedCategory === "All" || c.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.arena.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Championship Roster</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Competitions & Arenas
          </h1>
          <p className="text-sm text-rose-200/80 mt-3 leading-relaxed">
            15 High-Stakes Competitions Across 6 Cultural Arenas. Review Event Guidelines, Venues, Point Allocations, And Timings.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#160207] p-4 rounded-2xl border border-rose-950/80">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "text-rose-200/70 hover:text-white hover:bg-rose-950/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400/70" />
            <input
              type="text"
              placeholder="Search Competitions Or Venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1d0307] border border-rose-950/80 focus:border-amber-500/60 text-xs text-white placeholder-rose-300/40 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.map((comp) => (
            <div
              key={comp.id}
              onClick={() => setSelectedEvent(comp)}
              className="p-6 rounded-2xl bg-[#170306] border border-rose-950/80 hover:border-amber-500/50 hover:bg-[#200409] transition-all cursor-pointer group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {comp.category}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-300 border border-rose-900/40">
                    {comp.arena}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-2">
                  {comp.title}
                </h3>

                <p className="text-xs text-rose-200/70 line-clamp-2 leading-relaxed">
                  {comp.rules_summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-950/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-rose-300/80">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    <span>{comp.event_date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{comp.start_time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-rose-300/80">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">{comp.venue}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 font-bold shrink-0">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{comp.first_place_points} Pts</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal For Single Event Details */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-xl rounded-3xl bg-[#1b0307] border border-amber-500/40 p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-rose-950/60 text-rose-300 hover:text-white hover:bg-rose-900/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {selectedEvent.category}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-950/80 text-rose-300 border border-rose-900/50">
                  {selectedEvent.arena}
                </span>
              </div>

              <h2 className="text-2xl font-serif font-black text-white mb-4">
                {selectedEvent.title}
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-[#140206] border border-rose-950/80 text-xs">
                <div>
                  <span className="text-rose-400/80 font-medium">Scheduled Date:</span>
                  <p className="font-bold text-white mt-0.5">{selectedEvent.event_date}</p>
                </div>
                <div>
                  <span className="text-rose-400/80 font-medium">Start Time:</span>
                  <p className="font-bold text-white mt-0.5">{selectedEvent.start_time}</p>
                </div>
                <div>
                  <span className="text-rose-400/80 font-medium">Official Venue:</span>
                  <p className="font-bold text-white mt-0.5">{selectedEvent.venue}</p>
                </div>
                <div>
                  <span className="text-rose-400/80 font-medium">Max Contingent Size:</span>
                  <p className="font-bold text-white mt-0.5">{selectedEvent.max_participants} Participants</p>
                </div>
              </div>

              {/* Point Matrix */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Championship Points Allocation
                </h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <span className="text-lg">🥇</span>
                    <p className="text-xs font-black text-amber-300 mt-1">1st Place</p>
                    <p className="text-sm font-bold text-white">{selectedEvent.first_place_points} Points</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-400/10 border border-zinc-400/30">
                    <span className="text-lg">🥈</span>
                    <p className="text-xs font-black text-zinc-300 mt-1">2nd Place</p>
                    <p className="text-sm font-bold text-white">{selectedEvent.second_place_points} Points</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-800/20 border border-amber-700/30">
                    <span className="text-lg">🥉</span>
                    <p className="text-xs font-black text-amber-600 mt-1">3rd Place</p>
                    <p className="text-sm font-bold text-white">{selectedEvent.third_place_points} Points</p>
                  </div>
                </div>
              </div>

              {/* Official Guidelines */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-2">
                  Competition Rules & Criteria
                </h4>
                <p className="text-xs text-rose-200/80 leading-relaxed bg-[#140206] p-4 rounded-xl border border-rose-950/70">
                  {selectedEvent.rules_summary}
                </p>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
              >
                Close Event Details
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
export default CompetitionsPage;

