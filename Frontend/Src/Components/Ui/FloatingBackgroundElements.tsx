import React from "react";
import {
  Sparkles,
  Trophy,
  Flame,
  Music,
  Award,
  Star,
  Theater,
  Feather,
  Mic,
  Palette,
  Camera,
  Film,
  Shirt,
  Bot,
  BookOpen,
} from "lucide-react";

export const FloatingBackgroundElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Deep Blackish Vignette & Ambient Radial Mask Overlays */}
      <div className="absolute inset-0 bg-[#050002]/80 mix-blend-multiply" />
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-black via-black/85 to-transparent z-10" />

      {/* =========================================================================
          THE THREE THEATRICAL STAGE SPOTLIGHT BEAMS (FROM TOP CEILING)
          Matching Image Reference: Pure Warm Theatrical Amber & Wine Stage Lighting
          (harsh white streaks removed completely)
          ========================================================================= */}
      {/* 1. Left Spotlight Beam: Angled downwards towards center-left */}
      <div
        className="absolute top-0 left-[4%] sm:left-[8%] 2xl:left-[12%] w-52 sm:w-72 2xl:w-88 h-[42rem] sm:h-[50rem] 2xl:h-[56rem] origin-top rotate-[22deg] sm:rotate-[24deg] bg-gradient-to-b from-[#F5B842]/24 via-[#881337]/16 to-transparent blur-2xl pointer-events-none animate-spotlight-sweep"
      />

      {/* 2. Center Spotlight Beam: Vertical cone shining directly down on logo & headline */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 sm:w-[32rem] 2xl:w-[42rem] h-[38rem] sm:h-[46rem] 2xl:h-[52rem] bg-gradient-to-b from-[#F5B842]/28 via-[#F5B842]/10 to-transparent blur-3xl pointer-events-none"
      />

      {/* 3. Right Spotlight Beam: Angled downwards towards center-right */}
      <div
        className="absolute top-0 right-[4%] sm:right-[8%] 2xl:right-[12%] w-52 sm:w-72 2xl:w-88 h-[42rem] sm:h-[50rem] 2xl:h-[56rem] origin-top -rotate-[22deg] sm:-rotate-[24deg] bg-gradient-to-b from-[#F5B842]/24 via-[#881337]/16 to-transparent blur-2xl pointer-events-none animate-spotlight-sweep"
        style={{ animationDelay: "3s" }}
      />

      {/* Primary Central Golden Radial Glow Behind Abhivyakti Logo */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[48rem] h-60 sm:h-[32rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,184,66,0.24)_0%,_rgba(136,19,55,0.22)_45%,_transparent_75%)] blur-2xl" />

      {/* =========================================================================
          SIGNATURE CELESTIAL CIRCLE RINGS ("THAT CIRCLE THING")
          Prominent, high-contrast dashed & dotted circular arcs across the canvas
          ========================================================================= */}
      {/* Hero Right: Giant Signature Dashed Celestial Ring (Behind Right Badges & Timer) */}
      <div className="absolute top-[5%] sm:top-[7%] -right-24 sm:-right-36 2xl:-right-24 w-80 sm:w-[38rem] 2xl:w-[48rem] h-80 sm:h-[38rem] 2xl:h-[48rem] rounded-full border-[6px] sm:border-[10px] 2xl:border-[12px] border-dashed border-[#F5B842]/40 opacity-85 pointer-events-none animate-live-spin-slow" />
      <div
        className="absolute top-[10%] sm:top-[12%] -right-12 sm:-right-20 w-64 sm:w-[28rem] 2xl:w-[36rem] h-64 sm:h-[28rem] 2xl:h-[36rem] rounded-full border-[3px] sm:border-[6px] border-dotted border-rose-500/35 opacity-75 pointer-events-none animate-live-spin-slow"
        style={{ animationDirection: "reverse" }}
      />

      {/* Hero Left: Matching Counter-Rotating Celestial Dotted Ring */}
      <div
        className="absolute top-[8%] sm:top-[10%] -left-24 sm:-left-36 2xl:-left-24 w-72 sm:w-[34rem] 2xl:w-[44rem] h-72 sm:h-[34rem] 2xl:h-[44rem] rounded-full border-[5px] sm:border-[8px] 2xl:border-[10px] border-dotted border-[#BE123C]/40 opacity-80 pointer-events-none animate-live-spin-slow"
        style={{ animationDirection: "reverse" }}
      />
      <div className="absolute top-[13%] sm:top-[15%] -left-12 sm:-left-20 w-56 sm:w-[24rem] 2xl:w-[32rem] h-56 sm:h-[24rem] 2xl:h-[32rem] rounded-full border-[3px] sm:border-[5px] border-dashed border-[#F5B842]/35 opacity-70 pointer-events-none animate-live-spin-slow" />

      {/* Schedule Zone Astrolabe Arcs (~38% Scroll Height) */}
      <div className="absolute top-[38%] -right-20 sm:-right-32 w-72 sm:w-[32rem] h-72 sm:h-[32rem] rounded-full border-[6px] sm:border-[8px] border-dashed border-amber-400/30 opacity-75 pointer-events-none animate-live-spin-slow" />
      <div
        className="absolute top-[42%] -left-16 sm:-left-24 w-60 sm:w-[26rem] h-60 sm:h-[26rem] rounded-full border-[4px] sm:border-[6px] border-dotted border-rose-400/30 opacity-65 pointer-events-none animate-live-spin-slow"
        style={{ animationDirection: "reverse" }}
      />

      {/* Leaderboard Zone Celestial Rings (~60% Scroll Height - Exactly Matching Screenshot) */}
      <div
        className="absolute top-[59%] -left-20 sm:-left-28 w-64 sm:w-[30rem] h-64 sm:h-[30rem] rounded-full border-[5px] sm:border-[8px] border-dotted border-rose-400/35 opacity-75 pointer-events-none animate-live-spin-slow"
        style={{ animationDirection: "reverse" }}
      />
      <div className="absolute top-[62%] -right-20 sm:-right-28 w-72 sm:w-[34rem] h-72 sm:h-[34rem] rounded-full border-[6px] sm:border-[10px] border-dashed border-amber-400/35 opacity-75 pointer-events-none animate-live-spin-slow" />

      {/* Arenas Zone Astrolabe Ring (~80% Scroll Height) */}
      <div className="absolute top-[79%] -left-20 sm:-left-28 w-72 sm:w-[32rem] h-72 sm:h-[32rem] rounded-full border-[5px] sm:border-[8px] border-dashed border-amber-400/30 opacity-70 pointer-events-none animate-live-spin-slow" />

      {/* Footer Zone Astrolabe Ring (~95% Scroll Height) */}
      <div
        className="absolute bottom-6 -right-20 sm:-right-28 w-64 sm:w-[28rem] h-64 sm:h-[28rem] rounded-full border-[4px] sm:border-[6px] border-dotted border-rose-400/30 opacity-65 pointer-events-none animate-live-spin-slow"
        style={{ animationDirection: "reverse" }}
      />

      {/* Ambient Multi-Stop Radial Orbs Spaced Along Whole Page */}
      <div className="absolute top-[6%] left-[6%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-rose-950/30 blur-3xl pointer-events-none" />
      <div className="absolute top-[24%] right-[6%] w-80 sm:w-[32rem] h-80 sm:h-[32rem] rounded-full bg-amber-950/25 blur-3xl pointer-events-none" />
      <div className="absolute top-[44%] left-[4%] w-72 sm:w-[28rem] h-72 sm:h-[28rem] rounded-full bg-rose-950/25 blur-3xl pointer-events-none" />
      <div className="absolute top-[64%] right-[6%] w-80 sm:w-[30rem] h-80 sm:h-[30rem] rounded-full bg-amber-950/25 blur-3xl pointer-events-none" />
      <div className="absolute top-[82%] left-[6%] w-72 sm:w-[28rem] h-72 sm:h-[28rem] rounded-full bg-rose-950/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[8%] w-80 sm:w-[32rem] h-80 sm:h-[32rem] rounded-full bg-amber-950/25 blur-3xl pointer-events-none" />

      {/* =========================================================================
          TRADITIONAL FESTIVE GLOWING DIYAS (OIL LAMPS WITH GOLDEN FLICKERING FLAMES)
          Distributed All Over The Page Canvas (From Top Hero Down To Footer)
          ========================================================================= */}
      {/* Diya 1: Hero Top-Left */}
      <div className="absolute top-[7%] left-[4%] opacity-60 animate-live-flicker">
        <svg width="44" height="34" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
          <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FFFBEB" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
          <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#D97706" />
        </svg>
      </div>

      {/* Diya 2: Hero Top-Right */}
      <div className="absolute top-[16%] right-[5%] opacity-55 animate-live-flicker" style={{ animationDelay: "1.4s" }}>
        <svg width="40" height="30" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FDE047" />
          <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FFFFFF" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#991B1B" />
          <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#B45309" />
        </svg>
      </div>

      {/* Diya 3: Metrics Zone (~25%) */}
      <div className="absolute top-[25%] left-[5%] opacity-50 animate-live-flicker" style={{ animationDelay: "0.8s" }}>
        <svg width="38" height="28" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#F5B842" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
        </svg>
      </div>

      {/* Diya 4: Schedule Zone (~42%) */}
      <div className="absolute top-[42%] right-[5%] opacity-55 animate-live-flicker" style={{ animationDelay: "2.1s" }}>
        <svg width="42" height="32" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#991B1B" />
        </svg>
      </div>

      {/* Diya 5: Leaderboard & Podium Zone (~61% - Exactly as seen in Image 8!) */}
      <div className="absolute top-[61%] left-[4%] opacity-55 animate-live-flicker" style={{ animationDelay: "1.1s" }}>
        <svg width="44" height="34" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#F5B842" />
          <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FFFBEB" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
          <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#D97706" />
        </svg>
      </div>

      {/* Diya 6: Cultural Arenas Zone (~81%) */}
      <div className="absolute top-[81%] right-[5%] opacity-50 animate-live-flicker" style={{ animationDelay: "2.6s" }}>
        <svg width="40" height="30" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FDE047" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
        </svg>
      </div>

      {/* Diya 7: FAQ & Footer Zone (~94%) */}
      <div className="absolute top-[94%] left-[5%] opacity-50 animate-live-flicker" style={{ animationDelay: "1.8s" }}>
        <svg width="40" height="30" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#F5B842" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#991B1B" />
        </svg>
      </div>

      {/* =========================================================================
          SACRED FESTIVE PEEPAL / ASHOKA LEAF MOTIFS (DISTRIBUTED DOWN CANVAS)
          ========================================================================= */}
      {/* Leaf 1: Hero Left */}
      <div className="absolute top-[9%] left-[16%] opacity-35 animate-live-leaf">
        <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#047857" opacity="0.4" />
          <path d="M17 2L17 42M17 15L27 22M17 22L7 29M17 28L25 35" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Leaf 2: Metrics Zone */}
      <div className="absolute top-[27%] right-[11%] opacity-35 animate-live-leaf" style={{ animationDelay: "2.3s" }}>
        <svg width="32" height="42" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#B45309" opacity="0.35" />
          <path d="M17 2L17 42M17 15L27 22M17 22L7 29" stroke="#FACC15" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Leaf 3: Schedule Zone */}
      <div className="absolute top-[46%] left-[13%] opacity-35 animate-live-leaf" style={{ animationDelay: "1.2s" }}>
        <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#047857" opacity="0.4" />
          <path d="M17 2L17 42M17 15L27 22M17 22L7 29" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Leaf 4: Leaderboard Zone */}
      <div className="absolute top-[67%] right-[10%] opacity-35 animate-live-leaf" style={{ animationDelay: "3.2s" }}>
        <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#B45309" opacity="0.35" />
          <path d="M17 2L17 42M17 15L27 22M17 22L7 29" stroke="#FACC15" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Leaf 5: Arenas / FAQ Zone */}
      <div className="absolute top-[85%] left-[12%] opacity-30 animate-live-leaf" style={{ animationDelay: "1.9s" }}>
        <svg width="30" height="40" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#047857" opacity="0.35" />
          <path d="M17 2L17 42M17 15L27 22" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* =========================================================================
          CULTURAL COMPETITION MOTIFS (FROM OFFICIAL 22-EVENT RULEBOOK)
          Distributed Continuously Across All 6 Sections Of The Page
          ========================================================================= */}
      {/* --- Section 1: Hero Zone Motifs (0% - 18%) --- */}
      <div className="absolute top-[4%] left-[7%] opacity-40 animate-live-drift-diag" style={{ animationDelay: "0s" }}>
        <Sparkles className="w-6 h-6 text-amber-300 drop-shadow-[0_0_12px_rgba(245,184,66,0.8)]" />
      </div>
      <div className="absolute top-[11%] right-[14%] opacity-35 animate-live-sway" style={{ animationDelay: "1.8s" }}>
        <Music className="w-7 h-7 text-amber-300 drop-shadow-[0_0_14px_rgba(245,184,66,0.7)]" />
      </div>
      <div className="absolute top-[14%] left-[11%] opacity-35 animate-live-drift-diag" style={{ animationDelay: "2.4s" }}>
        <Theater className="w-8 h-8 text-rose-300 drop-shadow-[0_0_14px_rgba(251,113,133,0.7)]" />
      </div>

      {/* --- Section 2: Metrics & Quick Actions Zone Motifs (18% - 35%) --- */}
      <div className="absolute top-[22%] right-[8%] opacity-35 animate-live-drift-diag" style={{ animationDelay: "1.2s" }}>
        <Trophy className="w-7 h-7 text-amber-400 drop-shadow-[0_0_14px_rgba(245,184,66,0.7)]" />
      </div>
      <div className="absolute top-[28%] left-[8%] opacity-35 animate-live-sway" style={{ animationDelay: "2.7s" }}>
        <Flame className="w-6 h-6 text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)]" />
      </div>
      <div className="absolute top-[32%] right-[14%] opacity-30 animate-live-drift-diag" style={{ animationDelay: "0.5s" }}>
        <Award className="w-6 h-6 text-amber-200 drop-shadow-[0_0_10px_rgba(253,230,138,0.7)]" />
      </div>

      {/* --- Section 3: Schedule Zone Motifs (35% - 55%) --- */}
      <div className="absolute top-[38%] left-[7%] opacity-35 animate-live-leaf" style={{ animationDelay: "1.5s" }}>
        <Feather className="w-7 h-7 text-rose-300 drop-shadow-[0_0_12px_rgba(251,113,133,0.7)]" />
      </div>
      <div className="absolute top-[44%] left-[9%] opacity-35 animate-live-sway" style={{ animationDelay: "3.2s" }}>
        <Mic className="w-7 h-7 text-amber-300 drop-shadow-[0_0_14px_rgba(245,184,66,0.7)]" />
      </div>
      <div className="absolute top-[48%] right-[8%] opacity-35 animate-live-drift-diag" style={{ animationDelay: "1.1s" }}>
        <Music className="w-7 h-7 text-rose-300 drop-shadow-[0_0_12px_rgba(251,113,133,0.7)]" />
      </div>
      <div className="absolute top-[52%] left-[10%] opacity-30 animate-live-sway" style={{ animationDelay: "2.8s" }}>
        <BookOpen className="w-6 h-6 text-amber-200 drop-shadow-[0_0_10px_rgba(253,230,138,0.7)]" />
      </div>

      {/* --- Section 4: Official Leaderboard & Podium Zone Motifs (55% - 75% - As In Image 8!) --- */}
      <div className="absolute top-[58%] left-[9%] opacity-40 animate-live-drift-diag" style={{ animationDelay: "0.7s" }}>
        <Trophy className="w-8 h-8 text-amber-300 drop-shadow-[0_0_16px_rgba(245,184,66,0.8)]" />
      </div>
      <div className="absolute top-[63%] right-[7%] opacity-35 animate-live-sway" style={{ animationDelay: "2.2s" }}>
        <Star className="w-7 h-7 text-amber-200 drop-shadow-[0_0_14px_rgba(253,230,138,0.8)]" />
      </div>
      <div className="absolute top-[69%] left-[7%] opacity-35 animate-live-drift-diag" style={{ animationDelay: "1.6s" }}>
        <Award className="w-7 h-7 text-rose-300 drop-shadow-[0_0_12px_rgba(251,113,133,0.7)]" />
      </div>
      <div className="absolute top-[72%] right-[11%] opacity-35 animate-live-sway" style={{ animationDelay: "3.1s" }}>
        <Flame className="w-6 h-6 text-amber-400 drop-shadow-[0_0_12px_rgba(245,184,66,0.7)]" />
      </div>

      {/* --- Section 5: Cultural Arenas Zone Motifs (75% - 90%) --- */}
      <div className="absolute top-[76%] left-[6%] opacity-35 animate-live-drift-diag" style={{ animationDelay: "0.4s" }}>
        <Palette className="w-7 h-7 text-amber-400 drop-shadow-[0_0_12px_rgba(245,184,66,0.7)]" />
      </div>
      <div className="absolute top-[80%] right-[12%] opacity-30 animate-live-drift-diag" style={{ animationDelay: "2.5s" }}>
        <Shirt className="w-7 h-7 text-purple-300 drop-shadow-[0_0_12px_rgba(192,132,252,0.7)]" />
      </div>
      <div className="absolute top-[83%] left-[9%] opacity-30 animate-live-sparkle" style={{ animationDelay: "1.9s" }}>
        <Bot className="w-7 h-7 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
      </div>
      <div className="absolute top-[87%] right-[7%] opacity-30 animate-live-drift-diag" style={{ animationDelay: "3.3s" }}>
        <Film className="w-7 h-7 text-yellow-200 drop-shadow-[0_0_12px_rgba(254,240,138,0.7)]" />
      </div>
      <div className="absolute top-[89%] left-[11%] opacity-30 animate-live-sway" style={{ animationDelay: "1.1s" }}>
        <Camera className="w-6 h-6 text-rose-300 drop-shadow-[0_0_10px_rgba(251,113,133,0.7)]" />
      </div>

      {/* --- Section 6: FAQ & Footer Zone Motifs (90% - 100%) --- */}
      <div className="absolute top-[92%] right-[13%] opacity-35 animate-live-leaf" style={{ animationDelay: "2.1s" }}>
        <Feather className="w-7 h-7 text-rose-300 drop-shadow-[0_0_12px_rgba(251,113,133,0.7)]" />
      </div>
      <div className="absolute top-[96%] left-[8%] opacity-30 animate-live-sway" style={{ animationDelay: "0.9s" }}>
        <BookOpen className="w-6 h-6 text-amber-200 drop-shadow-[0_0_10px_rgba(253,230,138,0.7)]" />
      </div>
      <div className="absolute top-[97%] right-[9%] opacity-35 animate-live-drift-diag" style={{ animationDelay: "2.8s" }}>
        <Sparkles className="w-6 h-6 text-amber-300 drop-shadow-[0_0_12px_rgba(245,184,66,0.8)]" />
      </div>

      {/* =========================================================================
          TWINKLING DIAMOND STARS DISTRIBUTED ACROSS THE FULL VERTICAL HEIGHT
          ========================================================================= */}
      <div className="absolute top-[3%] left-[15%] w-2 h-2 rounded-full bg-white shadow-[0_0_14px_#FFFFFF] animate-live-twinkle" style={{ animationDelay: "0.2s" }} />
      <div className="absolute top-[8%] right-[18%] w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_10px_#FEF08A] animate-live-twinkle" style={{ animationDelay: "1.4s" }} />
      <div className="absolute top-[15%] left-[8%] w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#FFFFFF] animate-live-twinkle" style={{ animationDelay: "0.8s" }} />
      <div className="absolute top-[23%] right-[12%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_12px_#F5B842] animate-live-twinkle" style={{ animationDelay: "2.2s" }} />
      <div className="absolute top-[33%] left-[16%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] animate-live-twinkle" style={{ animationDelay: "1.1s" }} />
      <div className="absolute top-[41%] right-[16%] w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_12px_#FEF08A] animate-live-twinkle" style={{ animationDelay: "2.7s" }} />
      <div className="absolute top-[49%] left-[6%] w-2 h-2 rounded-full bg-white shadow-[0_0_14px_#FFFFFF] animate-live-twinkle" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-[58%] right-[10%] w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_14px_#F5B842] animate-live-twinkle" style={{ animationDelay: "1.9s" }} />
      <div className="absolute top-[67%] left-[14%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] animate-live-twinkle" style={{ animationDelay: "2.4s" }} />
      <div className="absolute top-[77%] right-[14%] w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_12px_#FEF08A] animate-live-twinkle" style={{ animationDelay: "0.6s" }} />
      <div className="absolute top-[85%] left-[7%] w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#FFFFFF] animate-live-twinkle" style={{ animationDelay: "1.7s" }} />
      <div className="absolute top-[92%] right-[11%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_12px_#F5B842] animate-live-twinkle" style={{ animationDelay: "2.9s" }} />
      <div className="absolute top-[97%] left-[15%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] animate-live-twinkle" style={{ animationDelay: "1.3s" }} />

      {/* =========================================================================
          RISING GOLDEN EMBERS (STAGGERED ACROSS ALL COLUMNS AND SCROLL DEPTHS)
          ========================================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute left-[5%] top-[12%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_#FDE047] animate-live-sparkle" style={{ animationDelay: "0s", animationDuration: "5.5s" }} />
        <span className="absolute left-[13%] top-[28%] w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#FFFFFF] animate-live-sparkle" style={{ animationDelay: "1.3s", animationDuration: "6.8s" }} />
        <span className="absolute left-[24%] top-[45%] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_#F5B842] animate-live-sparkle" style={{ animationDelay: "2.5s", animationDuration: "5.2s" }} />
        <span className="absolute left-[37%] top-[62%] w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#FFFFFF] animate-live-sparkle" style={{ animationDelay: "0.6s", animationDuration: "7.1s" }} />
        <span className="absolute left-[52%] top-[78%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_#FDE047] animate-live-sparkle" style={{ animationDelay: "3.1s", animationDuration: "6.3s" }} />
        <span className="absolute left-[66%] top-[22%] w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#FFFFFF] animate-live-sparkle" style={{ animationDelay: "1.7s", animationDuration: "8.0s" }} />
        <span className="absolute left-[78%] top-[52%] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_#F5B842] animate-live-sparkle" style={{ animationDelay: "2.9s", animationDuration: "5.8s" }} />
        <span className="absolute left-[91%] top-[86%] w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_12px_#FDE047] animate-live-sparkle" style={{ animationDelay: "0.8s", animationDuration: "6.6s" }} />
      </div>
    </div>
  );
};

export default FloatingBackgroundElements;
