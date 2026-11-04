import React, { useState, useEffect } from "react";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { Footer } from "@/Components/Ui/Footer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import { EventGuidelineModal, GuidelineEventData } from "@/Components/Ui/EventGuidelineModal";
import { Api } from "@/Lib/Api";
import {
  Sparkles,
  Search,
  MapPin,
  Calendar,
  Clock,
  Trophy,
  Users,
  BookOpen,
  Flame,
  Music,
  Layers,
  Palette,
  Bot,
  Theater,
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
  // Group A & Group B & Group C & Group D from Official Abhivyakti 2026 Rulebook
  {
    id: 1,
    title: "Groove-O-Mania (Dance)",
    category: "Dance",
    arena: "Rajeshwari Auditorium",
    venue: "Rajeshwari Auditorium",
    event_date: "2026-11-18",
    start_time: "10:00 AM",
    max_participants: 10,
    rules_summary: "Solo (Max 3 Mins, 3m/3f), Duet (Max 3 Mins, 2 Pairs), Group (Max 5 Mins, 1 Team Of 6-10). All Dance Styles Accepted. 3-Round Format: Round 1 (Original), Round 2 (Battle Round With Draw/Lottery Tracks), Round 3 (Grand Finale). Judged On Choreography, Synchronization, Expressions, Costumes & Stage Presence.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 2,
    title: "Harmony Hustle (Singing)",
    category: "Music",
    arena: "Vocal Resonance",
    venue: "NIMS School Of Law – LT 10 & 11",
    event_date: "2026-11-18",
    start_time: "10:00 AM",
    max_participants: 10,
    rules_summary: "Solo (Max 3 Mins, 3m/3f), Duet (Max 3 Mins, 2 Pairs), Group (Max 5 Mins, 1 Team Of 6-10), Rap (Single Round). Karaoke Allowed. 1 Accompanist Permitted. Judged On Swara (Pitch), Taal (Rhythm), Voice Quality, Song Selection & Stage Presence.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 3,
    title: "Couture Clique (Fashion Show – 'The Creative Couture Challenge')",
    category: "Fashion",
    arena: "University Cricket Ground",
    venue: "University Cricket Ground",
    event_date: "2026-11-21",
    start_time: "05:00 PM",
    max_participants: 15,
    rules_summary: "Grand Mega Finale Staged At University Cricket Ground! 1 Team Of 8-15 Students Per College. Maximum Time 8 Minutes. Overall Theme: 'The Creative Couture Challenge'. Evaluated On Presentation, Walking Posture, Styling, Music, Choreography & Overall Impact.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 4,
    title: "SoloFlix (Mono Act)",
    category: "Theatre",
    arena: "Rajeshwari Auditorium",
    venue: "Rajeshwari Auditorium",
    event_date: "2026-11-20",
    start_time: "09:00 AM",
    max_participants: 3,
    rules_summary: "Maximum Time 3 Minutes. 3 Solo Entries Per College (At Least 1 Female). Solo Dramatic Monologue Commanding Stage. Evaluated On Acting Skills, Voice Modulation, Concept Creativity & Theatrical Impact.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 5,
    title: "Act-O-Graphy (Skit)",
    category: "Theatre",
    arena: "Rajeshwari Auditorium",
    venue: "Rajeshwari Auditorium",
    event_date: "2026-11-21",
    start_time: "09:00 AM",
    max_participants: 10,
    rules_summary: "1 Team Of 5-10 Students Per College. Maximum Time 10 Minutes. Audio Track Submitted In Advance. Evaluated On Script, Acting, Dialogue Delivery, Team Coordination & Overall Impact.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 6,
    title: "Inked Expressions (Face Painting)",
    category: "Fine Arts",
    arena: "School Of Law",
    venue: "School Of Law",
    event_date: "2026-11-19",
    start_time: "11:00 AM",
    max_participants: 6,
    rules_summary: "Maximum Time 60 Minutes. 3 Male & 3 Female Entries Per College. Model Arrives Clean-Faced. Skin-Friendly Non-Toxic Body Paints Mandatory. Stencils And Pre-Made Designs Strictly Prohibited.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 7,
    title: "RangRush (Rangoli)",
    category: "Fine Arts",
    arena: "School Of Law",
    venue: "School Of Law",
    event_date: "2026-11-19",
    start_time: "09:00 AM",
    max_participants: 5,
    rules_summary: "Maximum Time 60 Minutes. 2 Teams Of 3-5 Students Per College. Size 3x3 Feet. On-Spot Theme. All Required Materials And Colors Brought By Teams.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 8,
    title: "ScribbleSquad (Doodling)",
    category: "Fine Arts",
    arena: "School Of Law",
    venue: "School Of Law",
    event_date: "2026-11-19",
    start_time: "10:00 AM",
    max_participants: 5,
    rules_summary: "Maximum Time 60 Minutes. 5 Solo Entries Per College (At Least 1 Female). Paper Size A3. On-Spot Theme. Black Fine-Liners And Ink Pens Only.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 9,
    title: "BOT-Brush (AI Art Generation)",
    category: "Digital Arts",
    arena: "School Of Law",
    venue: "School Of Law",
    event_date: "2026-11-19",
    start_time: "11:00 AM",
    max_participants: 5,
    rules_summary: "Maximum Time 30 Minutes. 5 Solo Entries Per College (At Least 1 Female). Create An Original Poster Based On On-Spot Theme Using Preferred Ai Tools On Personal Device. Submit Jpg/Png/Pdf <= 5mb Via Official Qr Code.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 10,
    title: "ReThread (Fashion Upcycling)",
    category: "Fashion",
    arena: "School Of Law",
    venue: "School Of Law",
    event_date: "2026-11-19",
    start_time: "10:00 AM",
    max_participants: 5,
    rules_summary: "Maximum Time 60 Minutes. 5 Solo Entries Per College (At Least 1 Female). Upcycle Used/Old Clothing Brought By Participant Into Wearable Couture Garments On The Spot. New Fabric Strictly Prohibited.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 11,
    title: "MUA Madness (MakeUp Contest)",
    category: "Fashion",
    arena: "School Of Law",
    venue: "School Of Law",
    event_date: "2026-11-19",
    start_time: "12:00 PM",
    max_participants: 5,
    rules_summary: "Maximum Time 60 Minutes. 5 Solo Entries Per College (At Least 1 Male). Model Arrives Clean-Faced. Blending, Shading, Contouring, Editorial Glamour, And Hygiene Evaluated.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 12,
    title: "FONT-tastic (Calligraphy)",
    category: "Fine Arts",
    arena: "School Of Law",
    venue: "School Of Law",
    event_date: "2026-11-19",
    start_time: "12:00 PM",
    max_participants: 5,
    rules_summary: "Maximum Time 30 Minutes. 5 Solo Entries Per College (At Least 1 Female). Write On-Spot Text On A3 Paper. Calligraphy Pens Only. Mixed Styles And Ball Pens Strictly Prohibited.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 13,
    title: "Kick-Drip (Shoe Decoration Contest)",
    category: "Fashion",
    arena: "School Of Law",
    venue: "School Of Law",
    event_date: "2026-11-19",
    start_time: "02:00 PM",
    max_participants: 5,
    rules_summary: "Maximum Time 60 Minutes. 5 Solo Entries Per College (At Least 1 Female). Decorate 1 Pair Of Shoes Live On The Spot. Acrylics, Street Art Stencils, And Finishes.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 14,
    title: "Alfaaz Unplugged (Poetry Slam – Hindi & English)",
    category: "Literature",
    arena: "Manik / NIET",
    venue: "Manik / NIET",
    event_date: "2026-11-18",
    start_time: "02:00 PM",
    max_participants: 5,
    rules_summary: "5 Solo Entries Per Language Per College. 15 Minutes On-Spot Preparation, 2-3 Minutes Performance Time. Must Create Original Poetry On The Spot Without External Reference. Judged On Originality, Writing, Imagery, Voice & Stage Presence.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 15,
    title: "Clash Of Takes (Debate – Hindi & English)",
    category: "Literature",
    arena: "Manik / NIET",
    venue: "Manik / NIET",
    event_date: "2026-11-20",
    start_time: "02:00 PM",
    max_participants: 2,
    rules_summary: "2 Solo Entries Per Language Per College. 3 Minutes Argument Presentation + 1 Minute Rebuttal. 2 Rounds (Prelims & Finals). Stance (For/Against) Decided Via Chit Draw On Spot. Judged On Content, Logic, Rebuttal & Delivery.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 16,
    title: "Lit Check (Literature Quiz)",
    category: "Literature",
    arena: "Rajeshwari Auditorium",
    venue: "Rajeshwari Auditorium",
    event_date: "2026-11-19",
    start_time: "03:00 PM",
    max_participants: 4,
    rules_summary: "1 Team Of 4 Students Per College. 4 Rounds: Questioning, Audio Clues, Visual Clues, And Rapid-Fire. Top Teams Advance To Day 3 Grand Finale. Covers World Literature, Authors, And Literary History.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 17,
    title: "Inkspire (Creative Writing – Hindi & English)",
    category: "Literature",
    arena: "School Of Law",
    venue: "School Of Law",
    event_date: "2026-11-19",
    start_time: "02:00 PM",
    max_participants: 5,
    rules_summary: "5 Solo Entries Per Language Per College. 45 Minutes Limit. Word Count 400-600 Words Based On On-Spot Creative Stimulus Prompt. Evaluated On Originality, Structure, Language & Theme.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 18,
    title: "Spellbound (Spell Bee)",
    category: "Literature",
    arena: "Manik / Moot Court",
    venue: "Manik / Moot Court",
    event_date: "2026-11-18",
    start_time: "02:00 PM",
    max_participants: 5,
    rules_summary: "5 Solo Entries Per College (At Least 1 Female). 4-Round Championship: Round 1 (20-Word Dictation, Top 30 Qualify), Round 2 (Moderate Spell Bee), Round 3 (Advanced Spell Bee In Context), Round 4 (Rapid-Fire Elimination Finale).",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 19,
    title: "LOL Lab (Meme Making)",
    category: "Digital Arts",
    arena: "Digital Submission",
    venue: "Online Portal / Submission",
    event_date: "2026-11-19",
    start_time: "10:00 AM",
    max_participants: 5,
    rules_summary: "Group D Submission Contest. 5 Solo Entries Per College (At Least 1 Female). Format: Jpg/Png/Pdf <= 5mb. Ai-Generation, Plagiarism, And Inappropriate Content Strictly Prohibited.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 20,
    title: "Reel-ity Check (Reel Making)",
    category: "Digital Arts",
    arena: "Digital Submission",
    venue: "Online Portal / Submission",
    event_date: "2026-11-20",
    start_time: "10:00 AM",
    max_participants: 5,
    rules_summary: "Group D Submission Contest. 5 Solo Entries Per College (At Least 1 Female). 30-60 Second Reel. Theme: 'Nims Through My Eyes'. Format: Mp4 <= 200mb. Evaluated On Cinematography, Storytelling & Creative Edit.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 21,
    title: "Pixel Tales (Photo Story)",
    category: "Digital Arts",
    arena: "Digital Submission",
    venue: "Online Portal / Submission",
    event_date: "2026-11-20",
    start_time: "10:00 AM",
    max_participants: 5,
    rules_summary: "Group D Submission Contest. 5 Solo Entries Per College (At Least 1 Female). Submit 6 Photographs Depicting A Coherent Single Narrative Story. Format: Jpg/Png/Pdf <= 50mb.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 22,
    title: "Mini-Mentary (Short Documentary)",
    category: "Digital Arts",
    arena: "Digital Submission",
    venue: "Online Portal / Submission",
    event_date: "2026-11-21",
    start_time: "10:00 AM",
    max_participants: 5,
    rules_summary: "Group D Submission Contest. 3 Teams Per College (3-5 Students Each). Duration 3-5 Minutes. Format: Mp4 <= 1gb. Judged On Documentary Research, Narrative Depth, Sound Design, And Impact.",
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

  // Guideline Modal State
  const [selectedGuidelineEvent, setSelectedGuidelineEvent] = useState<GuidelineEventData | null>(null);
  const [isGuidelineModalOpen, setIsGuidelineModalOpen] = useState(false);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await Api.get("/competitions/");
        const list = Array.isArray(res.data) ? res.data : Array.isArray(res.data?.results) ? res.data.results : [];
        if (list.length > 0) setCompetitions(list);
      } catch {
        // Fallback initialized
      }
    };
    fetchCompetitions();
  }, []);

  const openGuidelines = (comp: Competition) => {
    setSelectedGuidelineEvent({
      id: comp.id,
      title: comp.title,
      category: comp.category,
      arena: comp.arena,
      venue: comp.venue,
      event_date: comp.event_date,
      start_time: comp.start_time,
      rules_summary: comp.rules_summary,
      first_place_points: comp.first_place_points || 40,
      second_place_points: comp.second_place_points || 25,
      third_place_points: comp.third_place_points || 15,
    });
    setIsGuidelineModalOpen(true);
  };

  const categories = [
    "All",
    "Dance",
    "Music",
    "Fashion",
    "Theatre",
    "Fine Arts",
    "Literature",
    "Digital Arts",
  ];

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

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Dance":
        return "bg-pink-500/25 border-pink-400 text-pink-200 font-bold";
      case "Music":
        return "bg-amber-500/25 border-amber-400 text-amber-200 font-bold";
      case "Fashion":
        return "bg-cyan-500/25 border-cyan-400 text-cyan-200 font-bold";
      case "Fine Arts":
        return "bg-purple-500/25 border-purple-400 text-purple-200 font-bold";
      case "Digital Arts":
        return "bg-blue-500/25 border-blue-400 text-blue-200 font-bold";
      case "Theatre":
      case "Drama":
        return "bg-red-500/25 border-red-400 text-red-200 font-bold";
      case "Literature":
        return "bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold";
      default:
        return "bg-amber-500/25 border-amber-400 text-amber-200 font-bold";
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

  const safeComps = Array.isArray(competitions) ? competitions : [];
  const filteredCompetitions = safeComps.filter((c) => {
    const matchesCategory =
      selectedCategory === "All" ||
      c.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.arena.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070104] text-amber-50 relative selection:bg-amber-500 selection:text-black antialiased overflow-x-hidden">
      <FloatingBackgroundElements variant="subpage" />
      <FestiveTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#140206] border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg shadow-amber-950/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Championship Roster</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-amber-100 drop-shadow-[0_4px_25px_rgba(245,184,66,0.3)]">
            Competitions & Guidelines
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/90 mt-2 leading-relaxed font-medium">
            All 22 Official Competitions Across Groups A, B, C & D. Click Any Event's 'Guidelines & Scoring Rubric' Button To Inspect Full Criteria.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-gradient-to-r from-[#290514]/95 via-[#1b0426]/95 to-[#0b1c2e]/95 p-4 rounded-2xl border-2 border-amber-400/50 backdrop-blur-xl shadow-xl shadow-rose-950/40">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 text-black font-black shadow-md shadow-amber-500/40 border border-yellow-200"
                    : "text-amber-100 font-bold hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/60" />
            <input
              type="text"
              placeholder="Search Competitions Or Venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#18030e] border-2 border-amber-400/40 focus:border-amber-400 text-xs text-amber-100 placeholder-rose-200/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Competitions Grid (Matching Exact Home Page Event Card Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.map((comp) => (
            <div
              key={comp.id}
              className={`p-5 sm:p-6 rounded-2xl ${getEventCardStyle(comp.category)} hover:-translate-y-1 transition-all duration-300 group shadow-2xl flex flex-col justify-between relative overflow-hidden backdrop-blur-xl`}
            >
              {/* Ambient Category Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

              <div>
                {/* Card Top: Category Badge On Left + Date & Time Stacked On Right */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-full border shadow-sm ${getCategoryBadgeClass(comp.category)}`}>
                    {getCategoryIcon(comp.category)}
                    <span>{comp.category}</span>
                  </span>
                  <div className="text-right shrink-0">
                    <span className="flex items-center justify-end gap-1 text-xs font-bold text-amber-200">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {comp.event_date}
                    </span>
                    <span className="flex items-center justify-end gap-1 text-[11px] text-amber-400 font-semibold mt-0.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {comp.start_time}
                    </span>
                  </div>
                </div>

                {/* Event Title In Bold White & Serif Font */}
                <h3 className="text-base sm:text-lg font-serif font-black text-white group-hover:text-amber-200 transition-colors leading-snug line-clamp-2">
                  {comp.title}
                </h3>

                {/* Event Key Highlights Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/35 text-amber-300">
                    🥇 {comp.first_place_points || 40} Pts • 🥈 {comp.second_place_points || 25} Pts • 🥉 {comp.third_place_points || 15} Pts
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-black/40 border border-white/20 text-white truncate max-w-[140px]">
                    {comp.arena}
                  </span>
                </div>

                {/* Rules Summary Snippet */}
                <p className="text-xs text-rose-100/80 mt-3 line-clamp-3 leading-relaxed font-medium">
                  {comp.rules_summary}
                </p>
              </div>

              {/* Card Bottom: Venue + Guidelines Button */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-3.5">
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate font-semibold">{comp.venue}</span>
                  </div>
                </div>

                {/* Direct Event Guideline & Rules Action Button */}
                <button
                  onClick={() => openGuidelines(comp)}
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

      {/* Event Guideline Modal Attached Directly To Each Event */}
      <EventGuidelineModal
        isOpen={isGuidelineModalOpen}
        onClose={() => setIsGuidelineModalOpen(false)}
        event={selectedGuidelineEvent}
      />
    </div>
  );
};
export default CompetitionsPage;
