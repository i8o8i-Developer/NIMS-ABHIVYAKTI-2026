import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { CountdownTimer } from "@/Components/Ui/CountdownTimer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import { StageSpotlights } from "@/Components/Ui/StageSpotlights";
import { Footer } from "@/Components/Ui/Footer";
import { Podium, DEFAULT_TOP_THREE } from "@/Components/Leaderboard/Podium";
import { LeaderboardTable, DEFAULT_STANDINGS } from "@/Components/Leaderboard/LeaderboardTable";
import { EventGuidelineModal, GuidelineEventData } from "@/Components/Ui/EventGuidelineModal";
import { RulebookPdfModal } from "@/Components/Ui/RulebookPdfModal";
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
  Theater,
  Music,
  Mic,
  Palette,
  Feather,
  Landmark,
  Star,
  Medal,
  Crown,
  Bot,
  FileText,
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
    title: "Groove-o-Mania (Dance - Round 1)",
    day: "Day 1",
    date: "18 Nov 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "Rajeshwari Auditorium",
    category: "Dance",
    rules: "Solo (Max 3 Mins, 3m/3f Per College), Duet (Max 3 Mins, 2 Pairs), Group (Max 5 Mins, 6-10 Students). All Dance Styles Permitted. Exceeding Time Limit Leads To Deduction. Evaluated On Choreography, Synchronization, Expressions, Costumes & Stage Presence.",
  },
  {
    id: "2",
    title: "Harmony Hustle (Singing - Round 1)",
    day: "Day 1",
    date: "18 Nov 2026",
    time: "10:00 AM - 01:00 PM",
    venue: "NIMS School of Law - LT 10 & 11",
    category: "Music",
    rules: "Solo (Max 3 Mins, 3m/3f), Duet (Max 3 Mins, 2 Pairs), Group (Max 5 Mins, 6-10 Students), Rap (Single Round). Karaoke Permitted. One Accompanist Permitted Where Applicable. Evaluated On Swara (Pitch), Taal (Rhythm), Song Selection, Voice Quality & Stage Presence.",
  },
  {
    id: "3",
    title: "Spellbound (Spell Bee - Round 1)",
    day: "Day 1",
    date: "18 Nov 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Marik / Moot Court",
    category: "Literature",
    rules: "5 Solo Participants Per College (At Least 1 Female). 4-Round Format: Round 1 (20-Word Dictation, Top 30 Qualify), Round 2 (Moderate Spell Bee), Round 3 (Advanced Spell Bee In Sentence Context), Round 4 (Sudden-Death Rapid-Fire Finale).",
  },
  {
    id: "4",
    title: "Alfaaz Unplugged (Poetry Slam – Hindi & English)",
    day: "Day 1",
    date: "18 Nov 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Marik / NIET",
    category: "Literature",
    rules: "5 Solo Participants Per Language Per College. 15 Minutes On-Spot Preparation, 2-3 Minutes Performance Time. Must Create Original Poetry On The Spot Without Internet, Books, Or Pre-Written Material. Judged On Originality, Imagery, Voice & Stage Presence.",
  },

  // Day 2: 19 Nov 2026
  {
    id: "5",
    title: "RangRush (Rangoli)",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "09:00 AM - 09:30 AM",
    venue: "School of Law",
    category: "Fine Arts",
    rules: "2 Teams Of 3-5 Students Per College. Rangoli Size: 3x3 Feet. Theme Provided On Spot. Duration 60 Minutes. All Colors And Materials Brought By Teams.",
  },
  {
    id: "6",
    title: "ReThread (Fashion Upcycling)",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "10:00 AM - 11:00 AM",
    venue: "School of Law",
    category: "Fashion",
    rules: "5 Solo Participants Per College (At Least 1 Female). Duration 60 Minutes. Upcycle Used/Old Textiles Into Wearable Couture Garments On The Spot. New Fabric Strictly Prohibited.",
  },
  {
    id: "7",
    title: "ScribbleSquad (Doodling)",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "10:00 AM - 11:00 AM",
    venue: "School of Law",
    category: "Fine Arts",
    rules: "5 Solo Participants Per College (At Least 1 Female). Duration 60 Minutes. Paper Size A3. On-Spot Theme. Freehand Black Fine-Liners And Ink Pens.",
  },
  {
    id: "8",
    title: "BOT-Brush (AI Art Generation)",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "11:00 AM - 12:00 PM",
    venue: "School of Law",
    category: "Digital Arts",
    rules: "5 Solo Participants Per College (At Least 1 Female). Duration 30 Minutes. Create An Original Thematic Poster Using Ai Prompt Engineering On Personal Devices. Submit Jpg/Png/Pdf <= 5mb Via Official Qr Code.",
  },
  {
    id: "9",
    title: "Inked Expressions (Face Painting)",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "11:00 AM - 12:00 PM",
    venue: "School of Law",
    category: "Fine Arts",
    rules: "3 Male & 3 Female Participants Per College. Duration 60 Minutes. Model Must Arrive With A Clean, Unpainted Face. Skin-Safe Paints Mandatory. Stencils And Pre-Made Outlines Prohibited.",
  },
  {
    id: "10",
    title: "FONT-tastic (Calligraphy)",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "12:00 PM - 01:00 PM",
    venue: "School of Law",
    category: "Fine Arts",
    rules: "5 Solo Participants Per College (At Least 1 Female). Duration 30 Minutes. Paper Size A3. Write On-Spot Designated Text. Calligraphy Pens Only (No Ball/Gel Pens). Freehand Execution Without Tracing.",
  },
  {
    id: "11",
    title: "MUA Madness (MakeUp Contest)",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "12:00 PM - 01:00 PM",
    venue: "School of Law",
    category: "Fashion",
    rules: "5 Solo Participants Per College (At Least 1 Male). Duration 60 Minutes. Model Arrives With A Clean, Makeup-Free Face. Blending, Precision, Styling, And Hygiene Evaluated.",
  },
  {
    id: "12",
    title: "Kick-Drip (Shoe Decoration Contest)",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "02:00 PM - 03:00 PM",
    venue: "School of Law",
    category: "Fashion",
    rules: "5 Solo Participants Per College (At Least 1 Female). Duration 60 Minutes. Decorate A Single Pair Of Plain Shoes On The Spot Using Paints, Stencils, Accessories, And Street Art Finishes.",
  },
  {
    id: "13",
    title: "Inkspire (Creative Writing – Hindi & English)",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "02:00 PM - 03:00 PM",
    venue: "School of Law",
    category: "Literature",
    rules: "5 Solo Participants Per Language Per College. Duration 45 Minutes. Word Limit 400-600 Words Based On On-Spot Visual Or Quotation Prompt. Evaluated On Originality, Structure, Language & Theme.",
  },
  {
    id: "14",
    title: "Lit Check (Literature Quiz - Prelims)",
    day: "Day 2",
    date: "19 Nov 2026",
    time: "03:00 PM - 05:00 PM",
    venue: "Rajeshwari Auditorium",
    category: "Literature",
    rules: "1 Team Of 4 Students Per College. 4 Rounds: Questioning, Audio Recognition, Visual Clues, And Rapid-Fire. Covers Classic Literature, Literary Movements, Authors, And World Culture.",
  },

  // Day 3: 20 Nov 2026
  {
    id: "15",
    title: "SoloFlix (Mono Act)",
    day: "Day 3",
    date: "20 Nov 2026",
    time: "09:00 AM - 11:00 AM",
    venue: "Rajeshwari Auditorium",
    category: "Theatre",
    rules: "3 Solo Participants Per College (At Least 1 Female). Maximum Time 3 Minutes. Evaluated On Acting Skills, Voice Modulation, Concept Creativity, Stage Presence & Overall Theatrical Impact.",
  },
  {
    id: "16",
    title: "Groove-o-Mania (Dance - Round 2 Battle Round)",
    day: "Day 3",
    date: "20 Nov 2026",
    time: "11:00 AM - 01:00 PM",
    venue: "Rajeshwari Auditorium",
    category: "Dance",
    rules: "Head-To-Head Battle Round For Qualified Solo And Duet Performers. Matchups And Tracks Determined By Lottery Draw. Evaluated On Improvisation, Musicality, And Crowd Dominance.",
  },
  {
    id: "17",
    title: "Harmony Hustle (Singing - Round 2 Battle Round)",
    day: "Day 3",
    date: "20 Nov 2026",
    time: "11:00 AM - 01:00 PM",
    venue: "NIMS School of Law - LT 10 & 11",
    category: "Music",
    rules: "Vocal Face-Off For Qualified Solo And Duet Entries. High-Stakes Acoustic Control, Pitch Mastery, And Emotional Resonance Tested Under Direct Jury Scrutiny.",
  },
  {
    id: "18",
    title: "Clash of Takes (Debate – Hindi & English)",
    day: "Day 3",
    date: "20 Nov 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Marik / NIET",
    category: "Literature",
    rules: "2 Solo Participants Per Language Per College. 3 Minutes Argument Presentation + 1 Minute Rebuttal. For/Against Stance Decided Via Chit Draw At The Venue. Evaluated On Content, Logic, Rebuttal & Presentation.",
  },
  {
    id: "19",
    title: "Lit Check (Literature Quiz - Grand Finale)",
    day: "Day 3",
    date: "20 Nov 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Rajeshwari Auditorium",
    category: "Literature",
    rules: "Top 6 Qualifying Contingent Quiz Teams Battle Through Multimedia Rounds, Audio Clues, And Sudden-Death Buzzer Rounds To Crown The University Quiz Champions.",
  },

  // Day 4: 21 Nov 2026 (Grand Championship Finale)
  {
    id: "20",
    title: "Act-O-Graphy (Skit)",
    day: "Day 4",
    date: "21 Nov 2026",
    time: "09:00 AM - 11:00 AM",
    venue: "Rajeshwari Auditorium",
    category: "Theatre",
    rules: "1 Team Of 5-10 Students Per College. Maximum Time 10 Minutes. Evaluated On Script, Acting, Dialogue Delivery, Team Coordination & Social Impact.",
  },
  {
    id: "21",
    title: "Championship Grand Finale: Groove-o-Mania & Harmony Hustle",
    day: "Day 4",
    date: "21 Nov 2026",
    time: "11:00 AM - 02:00 PM",
    venue: "Rajeshwari Auditorium",
    category: "Dance & Music",
    rules: "Grand Finale Showdown For All Qualified Group, Duet, And Solo Finalists Before Celebrity Jury. Crown Champions Awarded Official Rolling Trophy Points.",
  },
  {
    id: "22",
    title: "Couture Clique (Fashion Show – 'The Creative Couture Challenge')",
    day: "Day 4",
    date: "21 Nov 2026",
    time: "05:00 PM - 07:00 PM",
    venue: "University Cricket Ground",
    category: "Fashion",
    rules: "1 Team Of 8-15 Students Per College. Maximum Time 8 Minutes. Staged At University Cricket Ground! Theme: 'The Creative Couture Challenge'. Evaluated On Presentation, Walking Posture, Styling, Music & Choreography.",
  },
];

export const Home: React.FC = () => {
  const [standings, setStandings] = useState<any[]>(DEFAULT_STANDINGS);
  const [podium, setPodium] = useState<any[]>(DEFAULT_TOP_THREE);
  const [selectedDay, setSelectedDay] = useState<"All" | "Day 1" | "Day 2" | "Day 3" | "Day 4">("Day 1");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Event Guideline Modal State (Guidelines Attached Directly To Events)
  const [selectedGuidelineEvent, setSelectedGuidelineEvent] = useState<GuidelineEventData | null>(null);
  const [isGuidelineModalOpen, setIsGuidelineModalOpen] = useState(false);
  const [isRulebookOpen, setIsRulebookOpen] = useState(false);

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
        // Retain default dummy data matching championship standings
      }
    };
    fetchLeaderboard();
  }, []);

  // Category Icon & Badge Styler For Visual Harmony
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Dance":
        return <Flame className="w-3.5 h-3.5" />;
      case "Music":
        return <Music className="w-3.5 h-3.5" />;
      case "Fashion":
        return <Sparkles className="w-3.5 h-3.5" />;
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
      case "Theatre":
        return "bg-red-950/80 border-red-500/40 text-red-300";
      case "Literature":
        return "bg-emerald-950/80 border-emerald-500/40 text-emerald-300";
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
    <div className="min-h-screen bg-[#040404] text-amber-50 selection:bg-amber-500 selection:text-black relative overflow-x-hidden antialiased">
      {/* Background Lighting, Spotlight Beams & Cultural Motifs */}
      <FloatingBackgroundElements />

      {/* Marquee Banner */}
      <FestiveTicker />

      {/* Primary Navigation */}
      <Navbar />

      {/* Hero Section Matching Image 1 & Image 2 Reference */}
      <section className="relative pt-6 sm:pt-10 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 text-center max-w-[100rem] mx-auto flex flex-col items-center min-h-[720px]">
        {/* Three Theatrical Overhead Stage Spotlights Shining Downwards From Top */}
        <StageSpotlights />

        {/* NIMS Championship Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#120205] border border-amber-500/40 shadow-xl shadow-amber-950/20 mb-7 z-10 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-300 uppercase">
            NIMS UNIVERSITY CULTURAL CHAMPIONSHIP • 18-21 NOVEMBER 2026
          </span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* Outer Left Floating Badges (Pinned to Far Left Edge With One-Liner Layout & Generous Width) */}
        <div className="hidden xl:flex flex-col gap-7 2xl:gap-8 absolute left-2 2xl:left-6 top-[17%] 2xl:top-[19%] z-20">
          {/* Badge 1: Championship Glory */}
          <div className="w-[17.5rem] 2xl:w-[19rem] p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-amber-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-left transform hover:-translate-y-1 hover:border-amber-400 transition-all duration-300 animate-live-sway">
            <div className="flex items-center gap-3">
              <div className="p-2.5 2xl:p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0">
                <Trophy className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">CHAMPIONSHIP GLORY</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5 whitespace-nowrap">30+ Leading Institutes</p>
              </div>
            </div>
          </div>

          {/* Badge 2: 100% Student-Led */}
          <div className="w-[17.5rem] 2xl:w-[19rem] p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-rose-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-left transform hover:-translate-y-1 hover:border-rose-400 transition-all duration-300 animate-live-sway" style={{ animationDelay: "1.3s" }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 2xl:p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 shrink-0">
                <Users className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">100% STUDENT-LED</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5 whitespace-nowrap">NIMS Student Council</p>
              </div>
            </div>
          </div>

          {/* Badge 3: Pan-Campus Majesty */}
          <div className="w-[17.5rem] 2xl:w-[19rem] p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-amber-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-left transform hover:-translate-y-1 hover:border-amber-400 transition-all duration-300 animate-live-sway" style={{ animationDelay: "2.6s" }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 2xl:p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0">
                <Sparkles className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">PAN-CAMPUS MAJESTY</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5 whitespace-nowrap">Inter-College Championship</p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CULTURAL FESTIVAL HERO ELEMENT CLUSTERS
            Exact Placements Matching User Red Circles In Image 1
            ========================================================================= */}
        {/* Cluster 1: Top-Left (Between Left Badges & Abhivyakti Logo) */}
        <div className="hidden xl:flex items-center gap-3 absolute top-[13%] 2xl:top-[15%] left-[21%] 2xl:left-[23%] pointer-events-none select-none z-10 animate-live-sway">
          <div className="p-2.5 2xl:p-3 rounded-2xl bg-[#140206]/92 border border-rose-500/40 backdrop-blur-md shadow-xl shadow-rose-950/40 flex items-center gap-2">
            <Theater className="w-7 h-7 2xl:w-8 2xl:h-8 text-rose-300 drop-shadow-[0_0_12px_rgba(251,113,133,0.6)]" />
          </div>
          <div className="flex flex-col gap-1 items-start">
            <div className="opacity-90 animate-live-leaf">
              <svg width="22" height="30" viewBox="0 0 34 44" fill="none">
                <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#047857" opacity="0.65" />
                <path d="M17 2L17 42M17 15L27 22M17 22L7 29" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-live-twinkle drop-shadow-[0_0_8px_#F5B842]" />
          </div>
        </div>

        {/* Cluster 2: Top-Right (Between Abhivyakti Logo & Right Badges) */}
        <div className="hidden xl:flex items-center gap-3 absolute top-[13%] 2xl:top-[15%] right-[21%] 2xl:right-[23%] pointer-events-none select-none z-10 animate-live-sway" style={{ animationDelay: "1.1s" }}>
          <div className="flex flex-col gap-1 items-end">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-live-twinkle drop-shadow-[0_0_8px_#FDE047]" />
            <div className="p-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300">
              <Mic className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="p-2.5 2xl:p-3 rounded-2xl bg-[#140206]/92 border border-amber-500/40 backdrop-blur-md shadow-xl shadow-amber-950/40 flex items-center gap-2">
            <Music className="w-7 h-7 2xl:w-8 2xl:h-8 text-amber-300 drop-shadow-[0_0_14px_rgba(245,184,66,0.7)]" />
          </div>
        </div>

        {/* Cluster 3: Far Bottom-Left (Below Left Badges In Outer Margin) */}
        <div className="hidden xl:flex flex-col items-center gap-2 absolute bottom-[8%] left-[4%] 2xl:left-[6%] pointer-events-none select-none z-10">
          <div className="animate-live-flicker">
            <svg width="44" height="34" viewBox="0 0 44 34" fill="none" className="drop-shadow-[0_0_16px_rgba(245,184,66,0.65)]">
              <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
              <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FEF08A" />
              <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
              <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#D97706" />
            </svg>
          </div>
          <div className="opacity-75 animate-live-leaf">
            <svg width="20" height="28" viewBox="0 0 34 44" fill="none">
              <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#047857" opacity="0.55" />
              <path d="M17 2L17 42M17 15L27 22" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Cluster 4: Bottom-Left Wide Zone (To Left Of Countdown Timer) */}
        <div className="hidden xl:flex items-center gap-3.5 absolute bottom-[10%] left-[17%] 2xl:left-[19%] pointer-events-none select-none z-10 animate-live-sway" style={{ animationDelay: "1.7s" }}>
          <div className="p-3 rounded-2xl bg-[#140206]/92 border border-rose-500/40 backdrop-blur-md shadow-2xl shadow-rose-950/60 flex items-center gap-2.5">
            <Theater className="w-7 h-7 text-amber-300 drop-shadow-[0_0_12px_rgba(245,184,66,0.6)]" />
            <div className="h-6 w-px bg-rose-500/30" />
            <Palette className="w-5 h-5 text-rose-300 drop-shadow-[0_0_10px_rgba(251,113,133,0.5)]" />
          </div>
          <div className="animate-live-flicker" style={{ animationDelay: "0.6s" }}>
            <svg width="40" height="30" viewBox="0 0 44 34" fill="none" className="drop-shadow-[0_0_16px_rgba(245,184,66,0.6)]">
              <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FDE047" />
              <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#991B1B" />
              <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#B45309" />
            </svg>
          </div>
        </div>

        {/* Cluster 5: Bottom-Right Wide Zone (To Right Of Countdown Timer) */}
        <div className="hidden xl:flex items-center gap-3.5 absolute bottom-[10%] right-[17%] 2xl:right-[19%] pointer-events-none select-none z-10 animate-live-sway" style={{ animationDelay: "2.3s" }}>
          <div className="animate-live-flicker" style={{ animationDelay: "1.3s" }}>
            <svg width="42" height="32" viewBox="0 0 44 34" fill="none" className="drop-shadow-[0_0_16px_rgba(245,184,66,0.65)]">
              <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
              <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FEF08A" />
              <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
              <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#D97706" />
            </svg>
          </div>
          <div className="p-3 rounded-2xl bg-[#140206]/92 border border-amber-500/40 backdrop-blur-md shadow-2xl shadow-amber-950/60 flex items-center gap-2.5">
            <Trophy className="w-7 h-7 text-amber-300 drop-shadow-[0_0_14px_rgba(245,184,66,0.6)]" />
            <div className="h-6 w-px bg-amber-500/30" />
            <Music className="w-5 h-5 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]" />
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
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/competitions"
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Explore Competitions</span>
            </Link>

            <Link
              to="/leaderboard"
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#140206] text-amber-200 border border-amber-500/40 hover:bg-rose-950/70 hover:text-white transition-all flex items-center gap-2 shadow-xl hover:scale-105"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>View Leaderboard</span>
            </Link>

            <button
              onClick={() => setIsRulebookOpen(true)}
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#22040b] via-[#160207] to-[#120104] text-amber-200 border-2 border-rose-500/50 hover:border-amber-400 hover:bg-rose-950 hover:text-white transition-all flex items-center gap-2 shadow-xl shadow-rose-950/40 hover:scale-105"
            >
              <FileText className="w-4 h-4 text-rose-400" />
              <span>View Full Rulebook (PDF)</span>
            </button>
          </div>
        </div>

        {/* Outer Right Floating Badges (Pinned to Far Right Edge With One-Liner Layout & Generous Width) */}
        <div className="hidden xl:flex flex-col gap-7 2xl:gap-8 absolute right-2 2xl:right-6 top-[17%] 2xl:top-[19%] z-20">
          {/* Badge 4: 6 Cultural Arenas */}
          <div className="w-[17.5rem] 2xl:w-[19rem] p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-amber-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-right transform hover:-translate-y-1 hover:border-amber-400 transition-all duration-300 animate-live-sway" style={{ animationDelay: "0.7s" }}>
            <div className="flex items-center justify-end gap-3">
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">6 CULTURAL ARENAS</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5 whitespace-nowrap">Music, Dance, Drama, Vogue</p>
              </div>
              <div className="p-2.5 2xl:p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0">
                <Flame className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
            </div>
          </div>

          {/* Badge 5: Grand Central Venue */}
          <div className="w-[17.5rem] 2xl:w-[19rem] p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-rose-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-right transform hover:-translate-y-1 hover:border-rose-400 transition-all duration-300 animate-live-sway" style={{ animationDelay: "2.0s" }}>
            <div className="flex items-center justify-end gap-3">
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">GRAND CENTRAL VENUE</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5 whitespace-nowrap">NIMS Jaipur Grounds</p>
              </div>
              <div className="p-2.5 2xl:p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 shrink-0">
                <MapPin className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
            </div>
          </div>

          {/* Badge 6: Verified Jury Engine */}
          <div className="w-[17.5rem] 2xl:w-[19rem] p-3.5 2xl:p-4 rounded-2xl bg-[#0c0104]/92 border-2 border-amber-500/40 backdrop-blur-2xl shadow-2xl shadow-black/80 text-right transform hover:-translate-y-1 hover:border-amber-400 transition-all duration-300 animate-live-sway" style={{ animationDelay: "3.3s" }}>
            <div className="flex items-center justify-end gap-3">
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">VERIFIED JURY ENGINE</h4>
                <p className="text-[11px] 2xl:text-xs text-rose-200 font-semibold mt-0.5 whitespace-nowrap">Real-Time Score Sync</p>
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

      {/* =========================================================================
          ELEVATED FESTIVAL STAT CARDS
          Four High-Contrast Metric Showcase Cards With Icons & Amber Glow
          ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Stat 1: 30+ Participating Institutes */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#131313]/95 via-[#0a0a0a]/98 to-[#040404] border border-amber-500/30 hover:border-amber-400 shadow-2xl shadow-black/80 hover:shadow-[0_8px_30px_rgba(245,184,66,0.18)] transition-all duration-300 group overflow-hidden text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-110 transition-transform shadow-md">
              <Landmark className="w-5 h-5" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_2px_14px_rgba(245,184,66,0.35)]">
              30+
            </p>
            <p className="text-xs sm:text-sm font-bold tracking-wider text-amber-200/90 uppercase mt-2">
              Participating Institutes
            </p>
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent group-hover:via-amber-400 transition-all" />
          </div>

          {/* Stat 2: 22+ Official Competitions */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#131313]/95 via-[#0a0a0a]/98 to-[#040404] border border-rose-500/30 hover:border-rose-400 shadow-2xl shadow-black/80 hover:shadow-[0_8px_30px_rgba(244,63,94,0.18)] transition-all duration-300 group overflow-hidden text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-300 mb-3 group-hover:scale-110 transition-transform shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_2px_14px_rgba(245,184,66,0.35)]">
              22+
            </p>
            <p className="text-xs sm:text-sm font-bold tracking-wider text-amber-200/90 uppercase mt-2">
              Official Competitions
            </p>
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent group-hover:via-rose-400 transition-all" />
          </div>

          {/* Stat 3: 4 Days Of Cultural Brilliance */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#131313]/95 via-[#0a0a0a]/98 to-[#040404] border border-amber-500/30 hover:border-amber-400 shadow-2xl shadow-black/80 hover:shadow-[0_8px_30px_rgba(245,184,66,0.18)] transition-all duration-300 group overflow-hidden text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-110 transition-transform shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_2px_14px_rgba(245,184,66,0.35)]">
              4 Days
            </p>
            <p className="text-xs sm:text-sm font-bold tracking-wider text-amber-200/90 uppercase mt-2">
              Of Cultural Brilliance
            </p>
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent group-hover:via-amber-400 transition-all" />
          </div>

          {/* Stat 4: 5,000+ Passionate Students */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#131313]/95 via-[#0a0a0a]/98 to-[#040404] border border-rose-500/30 hover:border-rose-400 shadow-2xl shadow-black/80 hover:shadow-[0_8px_30px_rgba(244,63,94,0.18)] transition-all duration-300 group overflow-hidden text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-300 mb-3 group-hover:scale-110 transition-transform shadow-md">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_2px_14px_rgba(245,184,66,0.35)]">
              5,000+
            </p>
            <p className="text-xs sm:text-sm font-bold tracking-wider text-amber-200/90 uppercase mt-2">
              Passionate Students
            </p>
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent group-hover:via-rose-400 transition-all" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          REDESIGNED OFFICIAL EVENT SCHEDULE & GUIDELINES SECTION
          Modern Festival Cards With Rich Badges, Category Icons & Guidelines CTA
          ========================================================================= */}
      <section id="schedule" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d0d0d] border border-amber-500/40 text-amber-300 mb-3 shadow-md">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-wider">
                Four Days Of Cultural Brilliance • 18-21 Nov 2026
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-300 uppercase tracking-tight drop-shadow-md">
              Official Event Schedule & Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1.5 max-w-2xl font-medium">
              Click 'Guidelines & Scoring Rubric' On Any Competition To Inspect The Exact Time Limits, Team Sizes, And 4-Pillar Scoring Rubrics.
            </p>
          </div>

          {/* 4-Day Filter Tabs & PDF Quick Action */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0c0c0c] border border-amber-500/30 overflow-x-auto max-w-full shadow-xl">
              {(["Day 1", "Day 2", "Day 3", "Day 4", "All"] as const).map((day) => {
                const labelMap: Record<string, string> = {
                  "Day 1": "Day 1 (18 Nov)",
                  "Day 2": "Day 2 (19 Nov)",
                  "Day 3": "Day 3 (20 Nov)",
                  "Day 4": "Day 4 (21 Nov)",
                  All: "View All 22 Events",
                };
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                      selectedDay === day
                        ? "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black font-black shadow-lg shadow-amber-500/30 scale-105"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {labelMap[day]}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsRulebookOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#121212] hover:bg-[#1c1c1c] border border-amber-500/35 text-amber-200 text-xs font-bold transition-all shadow-md shrink-0 hover:border-amber-400"
              title="Inspect Full PDF Rulebook"
            >
              <FileText className="w-4 h-4 text-rose-400" />
              <span>Full PDF Rulebook</span>
            </button>
          </div>
        </div>

        {/* Schedule Cards Grid Redesigned With Festival Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedule.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#141414]/95 via-[#0b0b0b]/98 to-[#040404] border-2 border-amber-500/25 hover:border-amber-400/80 hover:shadow-[0_12px_40px_rgba(245,184,66,0.18)] hover:-translate-y-1 transition-all duration-300 group shadow-2xl flex flex-col justify-between relative overflow-hidden"
            >
              {/* Ambient Category Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

              <div>
                {/* Card Top: Category Badge On Left + Date & Time Stacked On Right */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1.5 rounded-full border shadow-sm ${getCategoryBadgeClass(item.category)}`}>
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
                <h3 className="text-lg font-serif font-black text-white group-hover:text-amber-200 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>

                {/* Event Key Highlights Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/35 text-amber-300">
                    🥇 40 Pts • 🥈 25 Pts • 🥉 15 Pts
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#1a1a1a] border border-amber-500/30 text-amber-200">
                    {item.day}
                  </span>
                </div>
              </div>

              {/* Card Bottom: Venue + Guidelines Button */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-3.5">
                <div className="flex items-center justify-between text-xs text-gray-300">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="truncate font-semibold">{item.venue}</span>
                  </div>
                </div>

                {/* Direct Event Guideline & Rules Action Button */}
                <button
                  onClick={() => openEventGuidelines(item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#121212] hover:bg-gradient-to-r hover:from-amber-500 hover:via-yellow-400 hover:to-amber-600 hover:text-black text-amber-300 text-xs font-black border border-amber-500/40 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-amber-500/25 group/btn"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 group-hover/btn:text-black transition-colors" />
                  <span>Guidelines & Scoring Rubric</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/schedule"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0f0f0f] border-2 border-amber-500/40 text-amber-300 hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 hover:text-black transition-all text-xs font-black shadow-lg shadow-black/80"
          >
            <span>View Complete Master Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          DEDICATED TOP 3 CONTINGENTS PODIUM & CHAMPIONSHIP LEADERBOARD SECTION
          Olympic-Grade Podium Stage With Gold/Silver/Bronze Pedestals & Real-Time Standings
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d0d0d] border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Top 3 College Contingents Podium</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-amber-100 drop-shadow-[0_4px_20px_rgba(245,184,66,0.3)]">
              Championship Leaderboard
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 font-medium">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
            Multidisciplinary Arenas
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white mt-2">
            6 Arenas Of Distinction
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">
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
                className={`p-6 rounded-2xl bg-[#0c0c0c]/95 border border-white/10 hover:border-amber-500/40 transition-all duration-300 group shadow-lg ${arena.cardHover}`}
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
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{arena.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
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
                className="rounded-xl bg-[#0c0c0c] border border-white/10 overflow-hidden transition-all"
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
                  <div className="px-5 pb-4 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/10 pt-3">
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

      {/* Official Rulebook Full PDF Modal */}
      <RulebookPdfModal
        isOpen={isRulebookOpen}
        onClose={() => setIsRulebookOpen(false)}
      />
    </div>
  );
};
export default Home;
