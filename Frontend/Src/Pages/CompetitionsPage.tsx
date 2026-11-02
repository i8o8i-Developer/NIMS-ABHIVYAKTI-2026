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
    title: "Groove-o-Mania (Dance)",
    category: "Dance",
    arena: "Rajeshwari Auditorium",
    venue: "Rajeshwari Auditorium",
    event_date: "2026-11-18",
    start_time: "10:00 AM",
    max_participants: 10,
    rules_summary: "Solo (Max 3 Mins, 3M/3F), Duet (Max 3 Mins, 2 pairs), Group (Max 5 Mins, 1 team of 6-10). All dance styles accepted. 3-round format: Round 1 (Original), Round 2 (Battle Round with draw/lottery tracks), Round 3 (Grand Finale). Judged on Choreography, Synchronization, Expressions, Costumes & Stage Presence.",
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
    venue: "NIMS School of Law - LT 10 & 11",
    event_date: "2026-11-18",
    start_time: "10:00 AM",
    max_participants: 10,
    rules_summary: "Solo (Max 3 Mins, 3M/3F), Duet (Max 3 Mins, 2 pairs), Group (Max 5 Mins, 1 team of 6-10), Rap (Single round). Karaoke allowed. 1 accompanist permitted. Judged on Swara (Pitch), Taal (Rhythm), Voice Quality, Song Selection & Stage Presence.",
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
    rules_summary: "Grand Mega Finale staged at University Cricket Ground! 1 team of 8-15 students per college. Maximum time 8 minutes. Overall theme: 'The Creative Couture Challenge'. Evaluated on Presentation, Walking Posture, Styling, Music, Choreography & Overall Impact.",
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
    rules_summary: "Maximum time 3 minutes. 3 Solo entries per college (at least 1 female). Solo dramatic monologue commanding stage. Evaluated on Acting Skills, Voice Modulation, Concept Creativity & Theatrical Impact.",
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
    rules_summary: "1 Team of 5-10 students per college. Maximum time 10 minutes. Audio track submitted in advance. Evaluated on Script, Acting, Dialogue Delivery, Team Coordination & Overall Impact.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 6,
    title: "Inked Expressions (Face Painting)",
    category: "Fine Arts",
    arena: "School of Law",
    venue: "School of Law",
    event_date: "2026-11-19",
    start_time: "11:00 AM",
    max_participants: 6,
    rules_summary: "Maximum time 60 minutes. 3 Male & 3 Female entries per college. Model arrives clean-faced. Skin-friendly non-toxic body paints mandatory. Stencils and pre-made designs strictly prohibited.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 7,
    title: "RangRush (Rangoli)",
    category: "Fine Arts",
    arena: "School of Law",
    venue: "School of Law",
    event_date: "2026-11-19",
    start_time: "09:00 AM",
    max_participants: 5,
    rules_summary: "Maximum time 60 minutes. 2 Teams of 3-5 students per college. Size 3x3 feet. On-spot theme. All required materials and colors brought by teams.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 8,
    title: "ScribbleSquad (Doodling)",
    category: "Fine Arts",
    arena: "School of Law",
    venue: "School of Law",
    event_date: "2026-11-19",
    start_time: "10:00 AM",
    max_participants: 5,
    rules_summary: "Maximum time 60 minutes. 5 Solo entries per college (at least 1 female). Paper size A3. On-spot theme. Black fine-liners and ink pens only.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 9,
    title: "BOT-Brush (AI Art Generation)",
    category: "Digital Arts",
    arena: "School of Law",
    venue: "School of Law",
    event_date: "2026-11-19",
    start_time: "11:00 AM",
    max_participants: 5,
    rules_summary: "Maximum time 30 minutes. 5 Solo entries per college (at least 1 female). Create an original poster based on on-spot theme using preferred AI tools on personal device. Submit JPG/PNG/PDF <= 5MB via official QR code.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 10,
    title: "ReThread (Fashion Upcycling)",
    category: "Fashion",
    arena: "School of Law",
    venue: "School of Law",
    event_date: "2026-11-19",
    start_time: "10:00 AM",
    max_participants: 5,
    rules_summary: "Maximum time 60 minutes. 5 Solo entries per college (at least 1 female). Upcycle used/old clothing brought by participant into wearable couture garments on the spot. New fabric strictly prohibited.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 11,
    title: "MUA Madness (MakeUp Contest)",
    category: "Fashion",
    arena: "School of Law",
    venue: "School of Law",
    event_date: "2026-11-19",
    start_time: "12:00 PM",
    max_participants: 5,
    rules_summary: "Maximum time 60 minutes. 5 Solo entries per college (at least 1 male). Model arrives clean-faced. Blending, shading, contouring, editorial glamour, and hygiene evaluated.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 12,
    title: "FONT-tastic (Calligraphy)",
    category: "Fine Arts",
    arena: "School of Law",
    venue: "School of Law",
    event_date: "2026-11-19",
    start_time: "12:00 PM",
    max_participants: 5,
    rules_summary: "Maximum time 30 minutes. 5 Solo entries per college (at least 1 female). Write on-spot text on A3 paper. Calligraphy pens only. Mixed styles and ball pens strictly prohibited.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 13,
    title: "Kick-Drip (Shoe Decoration Contest)",
    category: "Fashion",
    arena: "School of Law",
    venue: "School of Law",
    event_date: "2026-11-19",
    start_time: "02:00 PM",
    max_participants: 5,
    rules_summary: "Maximum time 60 minutes. 5 Solo entries per college (at least 1 female). Decorate 1 pair of shoes live on the spot. Acrylics, street art stencils, and finishes.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 14,
    title: "Alfaaz Unplugged (Poetry Slam – Hindi & English)",
    category: "Literature",
    arena: "Marik / NIET",
    venue: "Marik / NIET",
    event_date: "2026-11-18",
    start_time: "02:00 PM",
    max_participants: 5,
    rules_summary: "5 Solo entries per language per college. 15 Minutes on-spot preparation, 2-3 minutes performance time. Must create original poetry on the spot without external reference. Judged on Originality, Writing, Imagery, Voice & Stage Presence.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 15,
    title: "Clash of Takes (Debate – Hindi & English)",
    category: "Literature",
    arena: "Marik / NIET",
    venue: "Marik / NIET",
    event_date: "2026-11-20",
    start_time: "02:00 PM",
    max_participants: 2,
    rules_summary: "2 Solo entries per language per college. 3 Minutes argument presentation + 1 minute rebuttal. 2 Rounds (Prelims & Finals). Stance (For/Against) decided via chit draw on spot. Judged on Content, Logic, Rebuttal & Delivery.",
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
    rules_summary: "1 Team of 4 students per college. 4 Rounds: Questioning, Audio Clues, Visual Clues, and Rapid-Fire. Top teams advance to Day 3 Grand Finale. Covers world literature, authors, and literary history.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 17,
    title: "Inkspire (Creative Writing – Hindi & English)",
    category: "Literature",
    arena: "School of Law",
    venue: "School of Law",
    event_date: "2026-11-19",
    start_time: "02:00 PM",
    max_participants: 5,
    rules_summary: "5 Solo entries per language per college. 45 Minutes limit. Word count 400-600 words based on on-spot creative stimulus prompt. Evaluated on Originality, Structure, Language & Theme.",
    status: "Upcoming",
    first_place_points: 40,
    second_place_points: 25,
    third_place_points: 15,
  },
  {
    id: 18,
    title: "Spellbound (Spell Bee)",
    category: "Literature",
    arena: "Marik / Moot Court",
    venue: "Marik / Moot Court",
    event_date: "2026-11-18",
    start_time: "02:00 PM",
    max_participants: 5,
    rules_summary: "5 Solo entries per college (at least 1 female). 4-Round championship: Round 1 (20-word Dictation, Top 30 qualify), Round 2 (Moderate Spell Bee), Round 3 (Advanced Spell Bee in context), Round 4 (Rapid-Fire Elimination Finale).",
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
    rules_summary: "Group D submission contest. 5 Solo entries per college (at least 1 female). Format: JPG/PNG/PDF <= 5MB. AI-generation, plagiarism, and inappropriate content strictly prohibited.",
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
    rules_summary: "Group D submission contest. 5 Solo entries per college (at least 1 female). 30-60 Second reel. Theme: 'NIMS Through My Eyes'. Format: MP4 <= 200MB. Evaluated on cinematography, storytelling & creative edit.",
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
    rules_summary: "Group D submission contest. 5 Solo entries per college (at least 1 female). Submit 6 photographs depicting a coherent single narrative story. Format: JPG/PNG/PDF <= 50MB.",
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
    rules_summary: "Group D submission contest. 3 Teams per college (3-5 students each). Duration 3-5 minutes. Format: MP4 <= 1GB. Judged on documentary research, narrative depth, sound design, and impact.",
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
        if (res.data?.results && res.data.results.length > 0) {
          setCompetitions(res.data.results);
        }
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

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Dance":
        return "bg-rose-950/70 border-rose-500/40 text-rose-300";
      case "Music":
        return "bg-amber-950/70 border-amber-500/40 text-amber-300";
      case "Fashion":
        return "bg-purple-950/70 border-purple-500/40 text-purple-300";
      case "Fine Arts":
        return "bg-yellow-950/70 border-yellow-500/40 text-yellow-300";
      case "Digital Arts":
        return "bg-cyan-950/70 border-cyan-500/40 text-cyan-300";
      case "Theatre":
      case "Drama":
        return "bg-red-950/70 border-red-500/40 text-red-300";
      case "Literature":
        return "bg-emerald-950/70 border-emerald-500/40 text-emerald-300";
      default:
        return "bg-amber-500/10 border-amber-500/30 text-amber-300";
    }
  };

  const filteredCompetitions = competitions.filter((c) => {
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
    <div className="min-h-screen bg-[#0a0103] text-amber-50 relative selection:bg-amber-500 selection:text-black antialiased overflow-x-hidden">
      <FloatingBackgroundElements />
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#0d0104]/95 p-4 rounded-2xl border border-amber-500/30 backdrop-blur-xl shadow-xl shadow-black/60">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-md shadow-amber-500/30"
                    : "text-amber-200/70 hover:text-amber-200 hover:bg-amber-500/10"
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
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#140206] border border-amber-500/30 focus:border-amber-400 text-xs text-amber-100 placeholder-amber-200/40 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.map((comp) => (
            <div
              key={comp.id}
              className="p-6 rounded-2xl bg-[#0c0104]/90 border border-amber-500/25 hover:border-amber-400/70 hover:bg-[#140206] transition-all group shadow-xl shadow-black/80 flex flex-col justify-between backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${getCategoryBadgeClass(
                      comp.category
                    )}`}
                  >
                    {comp.category}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1a0409] text-amber-200 border border-amber-500/30">
                    {comp.arena}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors leading-snug mb-2 drop-shadow-sm">
                  {comp.title}
                </h3>

                <p className="text-xs text-rose-200/80 line-clamp-3 leading-relaxed">
                  {comp.rules_summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-950/60 space-y-3">
                <div className="flex items-center justify-between text-xs text-rose-200">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    <span>{comp.event_date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>{comp.start_time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-rose-200">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate">{comp.venue}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-300 font-bold shrink-0">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{comp.first_place_points || 40} Pts</span>
                  </div>
                </div>

                {/* Direct Event Guideline & Rules Action Button */}
                <button
                  onClick={() => openGuidelines(comp)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#1b0307] hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 hover:text-black text-amber-200 text-xs font-bold border border-amber-500/40 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
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
