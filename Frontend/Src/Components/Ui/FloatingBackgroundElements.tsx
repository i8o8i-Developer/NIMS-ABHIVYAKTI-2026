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
      {/* Deep Rich Velvet Dark Canvas (Zero Whitish Haze, 100% Deep Festival Wine & Blackish Tone) */}
      <div className="absolute inset-0 bg-[#050002]/90 mix-blend-multiply" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050002] via-[#050002]/95 to-transparent z-10" />

      {/* Warm Golden Central Radiance Behind Hero Center (Pure Amber/Wine, Zero White Haze) */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[36rem] h-52 sm:h-[24rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,184,66,0.18)_0%,_rgba(136,19,55,0.14)_50%,_transparent_75%)] blur-3xl pointer-events-none" />

      {/* =========================================================================
          TRADITIONAL FESTIVE GLOWING DIYAS
          Safely Positioned in Outer Side Margins - NEVER COLLAPSE OR OVERLAP HEADERS!
          (Top Header Zone 0px to 140px is completely clear)
          ========================================================================= */}
      {/* Diya 1: Left Gutter Below Header (Safely Below Navbar & Logo) */}
      <div className="absolute top-44 left-4 sm:left-8 opacity-50 pointer-events-none animate-live-flicker">
        <svg width="36" height="28" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
          <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FEF08A" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
          <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#D97706" />
        </svg>
      </div>

      {/* Diya 2: Right Gutter Below Header */}
      <div className="absolute top-52 right-4 sm:right-8 opacity-50 pointer-events-none animate-live-flicker" style={{ animationDelay: "1.4s" }}>
        <svg width="34" height="26" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FDE047" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#991B1B" />
          <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#B45309" />
        </svg>
      </div>

      {/* Diya 3: Mid-Page Left Gutter */}
      <div className="absolute top-[48%] left-4 sm:left-8 opacity-45 pointer-events-none animate-live-flicker" style={{ animationDelay: "2.1s" }}>
        <svg width="34" height="26" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
        </svg>
      </div>

      {/* Diya 4: Lower-Page Right Gutter */}
      <div className="absolute top-[75%] right-4 sm:right-8 opacity-45 pointer-events-none animate-live-flicker" style={{ animationDelay: "0.9s" }}>
        <svg width="34" height="26" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#F5B842" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#991B1B" />
        </svg>
      </div>

      {/* =========================================================================
          SACRED FESTIVE PEEPAL / ASHOKA LEAF MOTIFS
          Safely Positioned in Outer Side Gutters
          ========================================================================= */}
      <div className="absolute top-64 left-6 sm:left-12 opacity-30 pointer-events-none animate-live-leaf">
        <svg width="28" height="38" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#047857" opacity="0.35" />
          <path d="M17 2L17 42M17 15L27 22M17 22L7 29" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute top-[38%] right-6 sm:right-12 opacity-30 pointer-events-none animate-live-leaf" style={{ animationDelay: "2.5s" }}>
        <svg width="28" height="38" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#B45309" opacity="0.35" />
          <path d="M17 2L17 42M17 15L27 22" stroke="#FACC15" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute top-[68%] left-6 sm:left-12 opacity-30 pointer-events-none animate-live-leaf" style={{ animationDelay: "1.7s" }}>
        <svg width="28" height="38" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#047857" opacity="0.35" />
          <path d="M17 2L17 42M17 15L27 22" stroke="#FDE68A" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* =========================================================================
          CULTURAL COMPETITION MOTIFS (SAFE SIDE GUTTERS ONLY)
          Never Overlap Headings, Cards, Or Central Layout!
          ========================================================================= */}
      {/* Top Left Outer Gutter */}
      <div className="absolute top-80 left-4 sm:left-8 opacity-30 pointer-events-none animate-live-drift-diag">
        <Theater className="w-6 h-6 text-rose-300 drop-shadow-[0_0_10px_rgba(251,113,133,0.5)]" />
      </div>

      {/* Top Right Outer Gutter */}
      <div className="absolute top-80 right-4 sm:right-8 opacity-30 pointer-events-none animate-live-sway" style={{ animationDelay: "1.5s" }}>
        <Music className="w-6 h-6 text-amber-300 drop-shadow-[0_0_10px_rgba(245,184,66,0.5)]" />
      </div>

      {/* Mid Left Outer Gutter */}
      <div className="absolute top-[52%] left-4 sm:left-8 opacity-30 pointer-events-none animate-live-drift-diag" style={{ animationDelay: "2.2s" }}>
        <Trophy className="w-6 h-6 text-amber-400 drop-shadow-[0_0_10px_rgba(245,184,66,0.5)]" />
      </div>

      {/* Mid Right Outer Gutter */}
      <div className="absolute top-[56%] right-4 sm:right-8 opacity-30 pointer-events-none animate-live-sway" style={{ animationDelay: "0.8s" }}>
        <Flame className="w-5 h-5 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
      </div>

      {/* Lower Left Outer Gutter */}
      <div className="absolute top-[78%] left-4 sm:left-8 opacity-25 pointer-events-none animate-live-drift-diag" style={{ animationDelay: "1.1s" }}>
        <Palette className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(245,184,66,0.5)]" />
      </div>

      {/* Lower Right Outer Gutter */}
      <div className="absolute top-[86%] right-4 sm:right-8 opacity-25 pointer-events-none animate-live-sway" style={{ animationDelay: "2.8s" }}>
        <Star className="w-5 h-5 text-amber-300 drop-shadow-[0_0_8px_rgba(245,184,66,0.5)]" />
      </div>

      {/* =========================================================================
          TWINKLING GOLDEN STARS & EMBERS (PURE WARM GOLD, ZERO WHITE GLARE)
          ========================================================================= */}
      <div className="absolute top-[18%] left-[8%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F5B842] opacity-60 animate-live-twinkle" style={{ animationDelay: "0.3s" }} />
      <div className="absolute top-[22%] right-[8%] w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#FDE047] opacity-60 animate-live-twinkle" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[36%] left-[6%] w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_#FEF08A] opacity-60 animate-live-twinkle" style={{ animationDelay: "2.2s" }} />
      <div className="absolute top-[46%] right-[7%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F5B842] opacity-60 animate-live-twinkle" style={{ animationDelay: "0.9s" }} />
      <div className="absolute top-[62%] left-[7%] w-1.5 h-1.5 rounded-full bg-yellow-200 shadow-[0_0_8px_#FEF08A] opacity-60 animate-live-twinkle" style={{ animationDelay: "1.8s" }} />
      <div className="absolute top-[72%] right-[6%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F5B842] opacity-60 animate-live-twinkle" style={{ animationDelay: "2.7s" }} />
      <div className="absolute top-[88%] left-[8%] w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_#FEF08A] opacity-60 animate-live-twinkle" style={{ animationDelay: "1.2s" }} />
      <div className="absolute top-[94%] right-[8%] w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#FDE047] opacity-60 animate-live-twinkle" style={{ animationDelay: "2.4s" }} />

      {/* Gentle Rising Warm Amber Embers (Zero White Sparks) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute left-[4%] top-[25%] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F5B842] animate-live-sparkle" style={{ animationDelay: "0s", animationDuration: "6s" }} />
        <span className="absolute left-[8%] top-[60%] w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#FACC15] animate-live-sparkle" style={{ animationDelay: "1.8s", animationDuration: "7s" }} />
        <span className="absolute right-[8%] top-[35%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#FDE047] animate-live-sparkle" style={{ animationDelay: "2.6s", animationDuration: "6.5s" }} />
        <span className="absolute right-[4%] top-[70%] w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#FACC15] animate-live-sparkle" style={{ animationDelay: "0.8s", animationDuration: "7.5s" }} />
      </div>
    </div>
  );
};

export default FloatingBackgroundElements;
