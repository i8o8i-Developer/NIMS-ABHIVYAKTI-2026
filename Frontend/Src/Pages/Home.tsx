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
        return "bg-pink-500/25 border-pink-400 text-pink-200";
      case "Music":
        return "bg-amber-500/25 border-amber-400 text-amber-200";
      case "Fashion":
        return "bg-cyan-500/25 border-cyan-400 text-cyan-200";
      case "Fine Arts":
      case "Creative Arts":
        return "bg-purple-500/25 border-purple-400 text-purple-200";
      case "Digital Arts":
        return "bg-blue-500/25 border-blue-400 text-blue-200";
      case "Drama":
      case "Theatre":
        return "bg-red-500/25 border-red-400 text-red-200";
      case "Literature":
        return "bg-emerald-500/25 border-emerald-400 text-emerald-200";
      default:
        return "bg-amber-500/25 border-amber-400 text-amber-200";
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
    <div className="min-h-screen bg-[#070104] text-amber-50 selection:bg-amber-500 selection:text-black relative overflow-x-hidden antialiased">
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

        {/* NIMS Championship Square Sharp Edged Box (Square Edges For Mobile & Desktop) */}
        <div className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-none bg-[#120205]/95 border-2 border-amber-500/70 shadow-2xl shadow-amber-950/40 mb-7 z-10 animate-fade-in max-w-full">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
          <span className="text-[10.5px] min-[340px]:text-xs sm:text-sm font-bold tracking-widest text-amber-300 uppercase text-center break-words">
            NIMS UNIVERSITY CULTURAL CHAMPIONSHIP • 18-21 NOVEMBER 2026
          </span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
        </div>

        {/* Outer Left Floating Cultural Event Badges (Colorful & Event-Centric) */}
        <div className="hidden xl:flex flex-col gap-7 2xl:gap-8 absolute left-2 2xl:left-6 top-[17%] 2xl:top-[19%] z-20">
          {/* Event 1: Battle of the Bands (Fiery Sunset Orange) */}
          <div className="w-[18rem] 2xl:w-[19.5rem] p-3.5 2xl:p-4 rounded-2xl bg-gradient-to-r from-[#2a0802]/95 via-[#380e04]/95 to-[#1c0401]/95 border-2 border-orange-500/70 backdrop-blur-2xl shadow-2xl shadow-orange-950/60 text-left transform hover:-translate-y-1 hover:border-orange-400 transition-all duration-300 animate-live-sway">
            <div className="flex items-center gap-3">
              <div className="p-2.5 2xl:p-3 rounded-xl bg-orange-500/25 border border-orange-400/60 text-orange-400 shrink-0 shadow-lg shadow-orange-500/20">
                <Flame className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-orange-200 uppercase whitespace-nowrap">BATTLE OF THE BANDS</h4>
                <p className="text-[11px] 2xl:text-xs text-amber-300 font-bold mt-0.5 whitespace-nowrap">Electric Rock & Fusion War</p>
              </div>
            </div>
          </div>

          {/* Event 2: Groove-o-Mania Dance (Radiant Hot Pink & Magenta) */}
          <div className="w-[18rem] 2xl:w-[19.5rem] p-3.5 2xl:p-4 rounded-2xl bg-gradient-to-r from-[#290422]/95 via-[#3b0832]/95 to-[#1c0218]/95 border-2 border-pink-500/70 backdrop-blur-2xl shadow-2xl shadow-pink-950/60 text-left transform hover:-translate-y-1 hover:border-pink-400 transition-all duration-300 animate-live-sway" style={{ animationDelay: "1.3s" }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 2xl:p-3 rounded-xl bg-pink-500/25 border border-pink-400/60 text-pink-400 shrink-0 shadow-lg shadow-pink-500/20">
                <Sparkles className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-pink-200 uppercase whitespace-nowrap">GROOVE-O-MANIA DANCE</h4>
                <p className="text-[11px] 2xl:text-xs text-fuchsia-300 font-bold mt-0.5 whitespace-nowrap">Classical & Street Battles</p>
              </div>
            </div>
          </div>

          {/* Event 3: Nukkad Natak & Theatre (Emerald Green & Mint) */}
          <div className="w-[18rem] 2xl:w-[19.5rem] p-3.5 2xl:p-4 rounded-2xl bg-gradient-to-r from-[#032415]/95 via-[#063b22]/95 to-[#02180e]/95 border-2 border-emerald-500/70 backdrop-blur-2xl shadow-2xl shadow-emerald-950/60 text-left transform hover:-translate-y-1 hover:border-emerald-400 transition-all duration-300 animate-live-sway" style={{ animationDelay: "2.6s" }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 2xl:p-3 rounded-xl bg-emerald-500/25 border border-emerald-400/60 text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/20">
                <Theater className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-emerald-200 uppercase whitespace-nowrap">NUKKAD NATAK & DRAMA</h4>
                <p className="text-[11px] 2xl:text-xs text-emerald-300 font-bold mt-0.5 whitespace-nowrap">Street Play & SoloFlix Act</p>
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

        </div>

        {/* Cluster 5: Bottom-Right Wide Zone (To Right Of Countdown Timer) */}
        <div className="hidden xl:flex items-center gap-3.5 absolute bottom-[10%] right-[17%] 2xl:right-[19%] pointer-events-none select-none z-10 animate-live-sway" style={{ animationDelay: "2.3s" }}>

          <div className="p-3 rounded-2xl bg-[#140206]/92 border border-amber-500/40 backdrop-blur-md shadow-2xl shadow-amber-950/60 flex items-center gap-2.5">
            <Trophy className="w-7 h-7 text-amber-300 drop-shadow-[0_0_14px_rgba(245,184,66,0.6)]" />
            <div className="h-6 w-px bg-amber-500/30" />
            <Music className="w-5 h-5 text-yellow-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]" />
          </div>
        </div>

        {/* Central Logo & Majestic Typography (Generous Unobstructed Space) */}
        <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto flex flex-col items-center px-2 min-[340px]:px-4 z-10">
          {/* Official Abhivyakti Stylized Logo - Blended Seamlessly In The Stage Atmosphere */}
          <div className="relative mb-6 max-w-xs sm:max-w-md w-full mx-auto flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            {/* Luminous Ambient Spotlight Aura Behind Logo */}
            <div className="absolute inset-0 -m-6 sm:-m-10 bg-radial from-amber-400/25 via-rose-600/15 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />
            <div className="absolute inset-x-6 inset-y-2 bg-white/10 blur-2xl rounded-full pointer-events-none -z-10" />

            <img
              src="/Abhivyakti.png"
              alt="Abhivyakti Cultural Festival Logo"
              style={{
                filter:
                  "drop-shadow(0 0 2px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.75)) drop-shadow(0 0 25px rgba(245, 184, 66, 0.5))",
              }}
              className="w-full h-auto max-h-32 sm:max-h-40 object-contain mx-auto"
            />
          </div>

          {/* Regal Headline With Pure White Line 1 & Golden Amber Line 2 (Big Impact Typography) */}
          <h1 className="font-serif text-[1.95rem] min-[340px]:text-[2.45rem] min-[380px]:text-[2.95rem] min-[440px]:text-[3.4rem] sm:text-[3.75rem] md:text-[4.4rem] lg:text-[4.9rem] xl:text-[5.4rem] 2xl:text-[6rem] font-black tracking-tight leading-[1.08] sm:leading-[1.04] mb-5 px-1 max-w-full text-center">
            <span className="block text-white font-serif font-black tracking-tight drop-shadow-[0_2px_24px_rgba(255,255,255,0.45)] break-words">
              Celebrating Cultural
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-serif font-black tracking-tight drop-shadow-[0_4px_32px_rgba(245,184,66,0.6)] break-words mt-1.5 sm:mt-2.5">
              Majesty & Excellence
            </span>
          </h1>

          {/* Subtitle Description With 18 to 21 November Date Range */}
          <p className="text-xs min-[360px]:text-sm sm:text-base text-rose-200/90 font-medium max-w-xl sm:max-w-2xl leading-relaxed mb-7 text-center">
            Colleges And Institutes Across NIMS University Compete From{" "}
            <strong className="text-amber-300 font-bold">18 To 21 November 2026</strong> In Singing, Classical Dance,
            Street Play, Battle Of The Bands, And Visual Arts For The Coveted{" "}
            <strong className="text-amber-300 font-bold">Abhivyakti Inter-College Championship Trophy</strong>.
          </p>

          {/* 4-Card Countdown Timer */}
          <div className="w-full max-w-md">
            <CountdownTimer targetDate="2026-11-18T09:00:00" />
          </div>

          {/* Action Buttons (Vibrant Festival Palette & 280px Responsive) */}
          <div className="mt-8 flex flex-col min-[440px]:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-sm min-[440px]:max-w-none px-2">
            <Link
              to="/competitions"
              className="w-full min-[440px]:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 text-black shadow-xl shadow-amber-500/35 hover:shadow-amber-500/50 hover:scale-105 border-2 border-yellow-200 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-black shrink-0" />
              <span>Explore Competitions</span>
            </Link>

            <a
              href="#leaderboard"
              className="w-full min-[440px]:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600 text-white border-2 border-purple-300 hover:border-yellow-300 shadow-xl shadow-purple-950/50 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Trophy className="w-4 h-4 text-yellow-300 shrink-0" />
              <span>View Leaderboard</span>
            </a>

            <button
              onClick={() => setIsRulebookOpen(true)}
              className="w-full min-[440px]:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-700 text-white border-2 border-emerald-300 hover:border-cyan-300 shadow-xl shadow-emerald-950/50 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-emerald-200 shrink-0" />
              <span>View Full Rulebook (PDF)</span>
            </button>
          </div>
        </div>

        {/* Outer Right Floating Cultural Event Badges (Colorful & Event-Centric) */}
        <div className="hidden xl:flex flex-col gap-7 2xl:gap-8 absolute right-2 2xl:right-6 top-[17%] 2xl:top-[19%] z-20">
          {/* Event 4: Couture Runway Vogue (Electric Cyan & Azure) */}
          <div className="w-[18rem] 2xl:w-[19.5rem] p-3.5 2xl:p-4 rounded-2xl bg-gradient-to-l from-[#041c2e]/95 via-[#062b47]/95 to-[#02121e]/95 border-2 border-cyan-400/70 backdrop-blur-2xl shadow-2xl shadow-cyan-950/60 text-right transform hover:-translate-y-1 hover:border-cyan-300 transition-all duration-300 animate-live-sway" style={{ animationDelay: "0.7s" }}>
            <div className="flex items-center justify-end gap-3">
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-cyan-200 uppercase whitespace-nowrap">COUTURE RUNWAY VOGUE</h4>
                <p className="text-[11px] 2xl:text-xs text-cyan-300 font-bold mt-0.5 whitespace-nowrap">Eco Glam & Sneaker Art Contest</p>
              </div>
              <div className="p-2.5 2xl:p-3 rounded-xl bg-cyan-500/25 border border-cyan-400/60 text-cyan-400 shrink-0 shadow-lg shadow-cyan-500/20">
                <Layers className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
            </div>
          </div>

          {/* Event 5: Harmony Hustle Singing (Luminous Golden Amber) */}
          <div className="w-[18rem] 2xl:w-[19.5rem] p-3.5 2xl:p-4 rounded-2xl bg-gradient-to-l from-[#2e1d03]/95 via-[#452b05]/95 to-[#1c1101]/95 border-2 border-amber-400/70 backdrop-blur-2xl shadow-2xl shadow-amber-950/60 text-right transform hover:-translate-y-1 hover:border-amber-300 transition-all duration-300 animate-live-sway" style={{ animationDelay: "2.0s" }}>
            <div className="flex items-center justify-end gap-3">
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">HARMONY HUSTLE SINGING</h4>
                <p className="text-[11px] 2xl:text-xs text-yellow-300 font-bold mt-0.5 whitespace-nowrap">Solo, Duet & Vocal Resonance</p>
              </div>
              <div className="p-2.5 2xl:p-3 rounded-xl bg-amber-500/25 border border-amber-400/60 text-amber-400 shrink-0 shadow-lg shadow-amber-500/20">
                <Mic className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
            </div>
          </div>

          {/* Event 6: Fine Arts & AI Challenge (Royal Amethyst Purple) */}
          <div className="w-[18rem] 2xl:w-[19.5rem] p-3.5 2xl:p-4 rounded-2xl bg-gradient-to-l from-[#1d0530]/95 via-[#2f094d]/95 to-[#12021e]/95 border-2 border-purple-400/70 backdrop-blur-2xl shadow-2xl shadow-purple-950/60 text-right transform hover:-translate-y-1 hover:border-purple-300 transition-all duration-300 animate-live-sway" style={{ animationDelay: "3.3s" }}>
            <div className="flex items-center justify-end gap-3">
              <div className="min-w-0">
                <h4 className="text-xs 2xl:text-sm font-black tracking-wider text-purple-200 uppercase whitespace-nowrap">FINE ARTS & AI CHALLENGE</h4>
                <p className="text-[11px] 2xl:text-xs text-purple-300 font-bold mt-0.5 whitespace-nowrap">Live Doodling, Clay & Digital Art</p>
              </div>
              <div className="p-2.5 2xl:p-3 rounded-xl bg-purple-500/25 border border-purple-400/60 text-purple-400 shrink-0 shadow-lg shadow-purple-500/20">
                <Palette className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cultural Event Badges Strip (Vibrant & Colorful) */}
        <div className="xl:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full mt-10 z-10 max-w-3xl px-2">
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#2a0802] to-[#1c0401] border-2 border-orange-500/60 text-center shadow-lg shadow-orange-950/40">
            <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-orange-200 uppercase">Battle Of The Bands</p>
            <p className="text-[11px] text-amber-300 font-semibold">Electric Rock & Fusion War</p>
          </div>
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#290422] to-[#1c0218] border-2 border-pink-500/60 text-center shadow-lg shadow-pink-950/40">
            <Sparkles className="w-5 h-5 text-pink-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-pink-200 uppercase">Groove-O-Mania Dance</p>
            <p className="text-[11px] text-fuchsia-300 font-semibold">Classical & Street Battles</p>
          </div>
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#032415] to-[#02180e] border-2 border-emerald-500/60 text-center shadow-lg shadow-emerald-950/40">
            <Theater className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-emerald-200 uppercase">Nukkad Natak & Drama</p>
            <p className="text-[11px] text-emerald-300 font-semibold">Street Play & Theatrical Arts</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ELEVATED FESTIVAL STAT CARDS
          Four High-Contrast Metric Showcase Cards With Icons & Amber Glow
          ========================================================================= */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 min-[340px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-1 sm:px-0">
          {/* Stat 1: 30+ Participating Institutes (Royal Gold Theme) */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#2a1a04]/95 via-[#180f02]/98 to-[#060300] border-2 border-amber-400/70 hover:border-amber-300 shadow-2xl shadow-amber-950/60 hover:shadow-[0_0_35px_rgba(245,184,66,0.35)] transition-all duration-300 group overflow-hidden text-center">
            <div className="w-11 h-11 mx-auto rounded-xl bg-amber-500/25 border border-amber-400/60 flex items-center justify-center text-amber-300 mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
              <Landmark className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_2px_14px_rgba(245,184,66,0.5)]">
              30+
            </p>
            <p className="text-xs sm:text-sm font-black tracking-wider text-amber-200 uppercase mt-2">
              Participating Institutes
            </p>
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent group-hover:via-yellow-300 transition-all" />
          </div>

          {/* Stat 2: 22+ Official Competitions (Vibrant Ruby Rose Theme) */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#330514]/95 via-[#1c020a]/98 to-[#080103] border-2 border-rose-500/70 hover:border-rose-400 shadow-2xl shadow-rose-950/60 hover:shadow-[0_0_35px_rgba(244,63,94,0.35)] transition-all duration-300 group overflow-hidden text-center">
            <div className="w-11 h-11 mx-auto rounded-xl bg-rose-500/25 border border-rose-400/60 flex items-center justify-center text-rose-300 mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-rose-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-rose-100 via-rose-300 to-pink-500 drop-shadow-[0_2px_14px_rgba(244,63,94,0.5)]">
              22+
            </p>
            <p className="text-xs sm:text-sm font-black tracking-wider text-rose-200 uppercase mt-2">
              Official Competitions
            </p>
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent group-hover:via-pink-300 transition-all" />
          </div>

          {/* Stat 3: 4 Days Of Cultural Brilliance (Radiant Emerald Mint Theme) */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#032616]/95 via-[#02180e]/98 to-[#010905] border-2 border-emerald-500/70 hover:border-emerald-400 shadow-2xl shadow-emerald-950/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.35)] transition-all duration-300 group overflow-hidden text-center">
            <div className="w-11 h-11 mx-auto rounded-xl bg-emerald-500/25 border border-emerald-400/60 flex items-center justify-center text-emerald-300 mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
              <Calendar className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-100 via-emerald-300 to-teal-400 drop-shadow-[0_2px_14px_rgba(16,185,129,0.5)]">
              4 Days
            </p>
            <p className="text-xs sm:text-sm font-black tracking-wider text-emerald-200 uppercase mt-2">
              Of Cultural Brilliance
            </p>
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent group-hover:via-teal-300 transition-all" />
          </div>

          {/* Stat 4: 5,000+ Passionate Students (Luminous Electric Cyan Theme) */}
          <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#042036]/95 via-[#021321]/98 to-[#01080d] border-2 border-cyan-400/70 hover:border-cyan-300 shadow-2xl shadow-cyan-950/60 hover:shadow-[0_0_35px_rgba(34,211,238,0.35)] transition-all duration-300 group overflow-hidden text-center">
            <div className="w-11 h-11 mx-auto rounded-xl bg-cyan-500/25 border border-cyan-400/60 flex items-center justify-center text-cyan-300 mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/20">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-100 via-cyan-300 to-sky-400 drop-shadow-[0_2px_14px_rgba(34,211,238,0.5)]">
              5,000+
            </p>
            <p className="text-xs sm:text-sm font-black tracking-wider text-cyan-200 uppercase mt-2">
              Passionate Students
            </p>
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:via-sky-300 transition-all" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          REDESIGNED OFFICIAL EVENT SCHEDULE & GUIDELINES SECTION
          Modern Festival Cards With Rich Badges, Category Icons & Guidelines CTA
          ========================================================================= */}
      <section id="schedule" className="py-14 sm:py-20 px-2 min-[340px]:px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#38081a] via-[#24052e] to-[#0a1e36] border-2 border-amber-400/60 text-amber-200 mb-3 shadow-lg">
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
            <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-gradient-to-r from-[#290514]/95 via-[#1a0426]/95 to-[#0b1c2e]/95 border-2 border-amber-400/50 overflow-x-auto max-w-full shadow-xl">
              {(["Day 1", "Day 2", "Day 3", "Day 4", "All"] as const).map((day) => {
                const labelMap: Record<string, string> = {
                  "Day 1": "Day 1 (18 Nov)",
                  "Day 2": "Day 2 (19 Nov)",
                  "Day 3": "Day 3 (20 Nov)",
                  "Day 4": "Day 4 (21 Nov)",
                  All: "View All 22 Events",
                };

                const activeStyles: Record<string, string> = {
                  "Day 1": "bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 text-black shadow-amber-500/40",
                  "Day 2": "bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white shadow-pink-500/40",
                  "Day 3": "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white shadow-purple-500/40",
                  "Day 4": "bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-500 text-black shadow-cyan-500/40",
                  All: "bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white shadow-rose-500/40",
                };

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all duration-300 ${
                      selectedDay === day
                        ? `${activeStyles[day]} font-black shadow-lg scale-105 border border-white/40`
                        : "text-amber-100 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {labelMap[day]}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsRulebookOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 border-2 border-emerald-400 text-emerald-100 text-xs font-black transition-all shadow-lg shrink-0 hover:scale-105"
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
              className={`p-6 rounded-2xl ${getEventCardStyle(item.category)} hover:-translate-y-1 transition-all duration-300 group shadow-2xl flex flex-col justify-between relative overflow-hidden`}
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
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 hover:from-amber-400 hover:via-yellow-300 hover:to-orange-500 hover:text-black text-amber-200 text-xs font-black border-2 border-amber-400/60 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-amber-500/35 group/btn"
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-black font-black border-2 border-yellow-200 shadow-xl shadow-amber-500/35 hover:scale-105 transition-all text-xs"
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
      <section id="leaderboard" className="py-14 sm:py-20 px-2 min-[340px]:px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 scroll-mt-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#38081a] via-[#24052e] to-[#0a1e36] border-2 border-amber-400/60 text-amber-200 text-xs font-black uppercase tracking-wider mb-2 backdrop-blur-md shadow-md">
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
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/15 border-2 border-amber-400/50 text-amber-300 text-xs font-bold shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Live Scores</span>
            </span>
          </div>
        </div>

        {/* Dedicated Top 3 Elevated Podium With Dummy Data */}
        <div className="mb-12">
          <Podium topThree={podium.length >= 3 ? podium : DEFAULT_TOP_THREE} />
        </div>

        {/* Full Table Standings Directly On Home Page */}
        <div id="full-standings" className="mt-8">
          <LeaderboardTable colleges={standings} />
        </div>
      </section>



      {/* Cultural Arenas Showcase */}
      <section className="py-14 sm:py-20 px-2 min-[340px]:px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
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
            const arenaGradients = [
              "bg-gradient-to-b from-[#38091d]/95 via-[#220511]/98 to-[#130209] border-2 border-rose-500/70 hover:border-rose-400 shadow-xl shadow-rose-950/40",
              "bg-gradient-to-b from-[#3d2406]/95 via-[#241503]/98 to-[#130a01] border-2 border-amber-400/70 hover:border-amber-300 shadow-xl shadow-amber-950/40",
              "bg-gradient-to-b from-[#2d0947]/95 via-[#1b052c]/98 to-[#0e0217] border-2 border-purple-400/70 hover:border-purple-300 shadow-xl shadow-purple-950/40",
              "bg-gradient-to-b from-[#381804]/95 via-[#240e02]/98 to-[#120701] border-2 border-yellow-500/70 hover:border-yellow-400 shadow-xl shadow-yellow-950/40",
              "bg-gradient-to-b from-[#082a45]/95 via-[#041a2c]/98 to-[#020e18] border-2 border-cyan-400/70 hover:border-cyan-300 shadow-xl shadow-cyan-950/40",
              "bg-gradient-to-b from-[#3b080f]/95 via-[#240409]/98 to-[#130205] border-2 border-red-500/70 hover:border-red-300 shadow-xl shadow-red-950/40",
            ];
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl ${arenaGradients[i % arenaGradients.length]} transition-all duration-300 group shadow-xl hover:-translate-y-1`}
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
                className="rounded-2xl bg-gradient-to-r from-[#290514]/90 via-[#1e0422]/90 to-[#100318]/90 border-2 border-amber-400/40 overflow-hidden transition-all shadow-lg"
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
