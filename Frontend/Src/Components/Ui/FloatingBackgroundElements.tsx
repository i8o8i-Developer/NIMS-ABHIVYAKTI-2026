import React from "react";
import {
  Sparkles,
  Trophy,
  Flame,
  Music,
  Award,
  Star,
  Theater,
  Mic,
  Palette,
  Crown,
} from "lucide-react";

interface FloatingBackgroundElementsProps {
  variant?: "home" | "subpage";
}

export const FloatingBackgroundElements: React.FC<FloatingBackgroundElementsProps> = ({
  variant = "home",
}) => {
  if (variant === "subpage") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        {/* =========================================================================
            SUBPAGE THEATRICAL MULTI-COLORED VELVET CANVAS
            Vibrant, rich, and colorful festive atmosphere across all subpages
            ========================================================================= */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_#1f020b_0%,_#2b0413_10%,_#1a020c_25%,_#0c0106_45%,_#060103_65%,_#0a0105_85%,_#140209_100%)]" />

        {/* Theatrical Multicolor Overhead Spotlights & Radiant Auras */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[32rem] rounded-full bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.28)_0%,_rgba(225,29,72,0.15)_40%,_transparent_75%)] blur-3xl pointer-events-none" />
        <div className="absolute top-16 -left-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.22)_0%,_transparent_65%)] blur-[100px] pointer-events-none" />
        <div className="absolute top-16 -right-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.22)_0%,_transparent_65%)] blur-[100px] pointer-events-none" />
        <div className="absolute top-[40%] -left-12 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.20)_0%,_transparent_65%)] blur-[110px] pointer-events-none" />
        <div className="absolute top-[45%] -right-12 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.20)_0%,_transparent_65%)] blur-[110px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-[36rem] h-72 rounded-full bg-[radial-gradient(ellipse_at_bottom,_rgba(16,185,129,0.18)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />

        {/* Floating Colorful Bokeh Light Orbs (Tuned for Subpage Heights) */}
        <div className="absolute top-28 left-[8%] w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-cyan-400/22 blur-2xl animate-live-float-slow pointer-events-none" />
        <div className="absolute top-36 right-[8%] w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-pink-500/22 blur-2xl animate-live-float-reverse pointer-events-none" />
        <div className="absolute top-[48%] left-[6%] w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-purple-500/20 blur-2xl animate-live-float-slow pointer-events-none" />
        <div className="absolute top-[52%] right-[6%] w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-amber-400/22 blur-2xl animate-live-float-reverse pointer-events-none" />
        <div className="absolute bottom-24 left-[10%] w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-emerald-400/20 blur-2xl animate-live-float-slow pointer-events-none" />
        <div className="absolute bottom-32 right-[10%] w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-rose-500/22 blur-2xl animate-live-float-reverse pointer-events-none" />

        {/* Traditional Festive Glowing Diyas (Left & Right Gutters) */}
        <div className="absolute top-36 left-2 sm:left-6 opacity-65 pointer-events-none animate-live-flicker">
          <svg width="34" height="26" viewBox="0 0 44 34" fill="none">
            <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
            <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
            <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#D97706" />
          </svg>
        </div>

        <div className="absolute top-44 right-2 sm:right-6 opacity-65 pointer-events-none animate-live-flicker" style={{ animationDelay: "1.4s" }}>
          <svg width="32" height="24" viewBox="0 0 44 34" fill="none">
            <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FDE047" />
            <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#991B1B" />
          </svg>
        </div>

        <div className="absolute bottom-40 left-2 sm:left-6 opacity-60 pointer-events-none animate-live-flicker" style={{ animationDelay: "2.1s" }}>
          <svg width="32" height="24" viewBox="0 0 44 34" fill="none">
            <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
            <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
          </svg>
        </div>

        <div className="absolute bottom-48 right-2 sm:right-6 opacity-60 pointer-events-none animate-live-flicker" style={{ animationDelay: "0.9s" }}>
          <svg width="32" height="24" viewBox="0 0 44 34" fill="none">
            <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#F5B842" />
            <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#991B1B" />
          </svg>
        </div>

        {/* Sacred Festive Leaves */}
        <div className="absolute top-[32%] right-3 sm:right-10 opacity-35 pointer-events-none animate-live-leaf" style={{ animationDelay: "2.5s" }}>
          <svg width="26" height="36" viewBox="0 0 34 44" fill="none">
            <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#B45309" opacity="0.45" />
            <path d="M17 2L17 42M17 15L27 22" stroke="#FACC15" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute top-[62%] left-3 sm:left-10 opacity-35 pointer-events-none animate-live-leaf" style={{ animationDelay: "1.7s" }}>
          <svg width="26" height="36" viewBox="0 0 34 44" fill="none">
            <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#047857" opacity="0.45" />
            <path d="M17 2L17 42M17 15L27 22" stroke="#FDE68A" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Twinkling Golden Stars */}
        <div className="absolute top-24 left-[12%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F5B842] opacity-80 animate-live-twinkle" />
        <div className="absolute top-32 right-[14%] w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#FDE047] opacity-80 animate-live-twinkle" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-[45%] left-[8%] w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#06B6D4] opacity-80 animate-live-twinkle" style={{ animationDelay: "2.1s" }} />
        <div className="absolute top-[55%] right-[9%] w-1.5 h-1.5 rounded-full bg-pink-300 shadow-[0_0_8px_#F43F5E] opacity-80 animate-live-twinkle" style={{ animationDelay: "0.8s" }} />
        <div className="absolute bottom-28 left-[11%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F5B842] opacity-80 animate-live-twinkle" style={{ animationDelay: "1.7s" }} />
        <div className="absolute bottom-36 right-[12%] w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#10B981] opacity-80 animate-live-twinkle" style={{ animationDelay: "2.4s" }} />
      </div>
    );
  }

  // DEFAULT: HOME VARIANT (Preserves Home Page Exact Background Layout)
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* =========================================================================
          THEATRICAL OBSIDIAN VELVET FESTIVE CANVAS (MIXED DEEP BLACK & RICH WINE)
          Deep black depth blended seamlessly with rich royal crimson & wine tones
          ========================================================================= */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_#1c0209_0%,_#280410_6%,_#17020a_14%,_#0a0105_22%,_#060103_36%,_#040002_52%,_#070104_68%,_#0f0208_84%,_#1a0209_100%)]" />

      {/* Atmospheric Multi-Colored Theatrical Festival Spotlights (Rich Glows on Deep Velvet Black) */}
      <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-full max-w-6xl h-[38rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.30)_0%,_rgba(159,18,57,0.15)_45%,_transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute top-[22%] -left-20 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(217,70,239,0.18)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute top-[22%] -right-20 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.18)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute top-[45%] left-1/4 w-[42rem] h-[34rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.18)_0%,_transparent_70%)] blur-[130px] pointer-events-none" />
      <div className="absolute top-[65%] right-1/4 w-[42rem] h-[34rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.16)_0%,_transparent_70%)] blur-[130px] pointer-events-none" />
      <div className="absolute top-[85%] left-1/3 w-[38rem] h-[30rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.18)_0%,_transparent_70%)] blur-[130px] pointer-events-none" />

      {/* Floating Colorful Bokeh Light Orbs Across Stages */}
      <div className="absolute top-[14%] left-[10%] w-24 h-24 rounded-full bg-rose-500/20 blur-2xl animate-live-float-slow pointer-events-none" />
      <div className="absolute top-[26%] right-[10%] w-28 h-28 rounded-full bg-amber-400/20 blur-2xl animate-live-float-reverse pointer-events-none" />
      <div className="absolute top-[44%] left-[8%] w-32 h-32 rounded-full bg-cyan-400/20 blur-2xl animate-live-float-slow pointer-events-none" />
      <div className="absolute top-[64%] right-[8%] w-32 h-32 rounded-full bg-emerald-400/20 blur-2xl animate-live-float-reverse pointer-events-none" />
      <div className="absolute top-[82%] left-[12%] w-28 h-28 rounded-full bg-purple-500/20 blur-2xl animate-live-float-slow pointer-events-none" />

      {/* =========================================================================
          TRADITIONAL FESTIVE GLOWING DIYAS
          Evenly distributed along side margins across all sections
          ========================================================================= */}
      {/* Diya 1: Upper Left Gutter */}
      <div className="absolute top-44 left-3 sm:left-8 opacity-65 pointer-events-none animate-live-flicker">
        <svg width="36" height="28" viewBox="0 0 44 34" fill="none">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
          <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FEF08A" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
          <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#D97706" />
        </svg>
      </div>

      {/* Diya 2: Upper Right Gutter */}
      <div className="absolute top-52 right-3 sm:right-8 opacity-65 pointer-events-none animate-live-flicker" style={{ animationDelay: "1.4s" }}>
        <svg width="34" height="26" viewBox="0 0 44 34" fill="none">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FDE047" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#991B1B" />
          <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#B45309" />
        </svg>
      </div>

      {/* Diya 3: Schedule Section Left Gutter */}
      <div className="absolute top-[38%] left-3 sm:left-8 opacity-60 pointer-events-none animate-live-flicker" style={{ animationDelay: "2.1s" }}>
        <svg width="34" height="26" viewBox="0 0 44 34" fill="none">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
          <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#D97706" />
        </svg>
      </div>

      {/* Diya 4: Schedule Section Right Gutter */}
      <div className="absolute top-[48%] right-3 sm:right-8 opacity-60 pointer-events-none animate-live-flicker" style={{ animationDelay: "0.9s" }}>
        <svg width="34" height="26" viewBox="0 0 44 34" fill="none">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#F5B842" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#991B1B" />
        </svg>
      </div>

      {/* Diya 5: Leaderboard Section Left Gutter */}
      <div className="absolute top-[68%] left-3 sm:left-8 opacity-60 pointer-events-none animate-live-flicker" style={{ animationDelay: "1.7s" }}>
        <svg width="34" height="26" viewBox="0 0 44 34" fill="none">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
        </svg>
      </div>

      {/* Diya 6: Arenas Section Right Gutter */}
      <div className="absolute top-[84%] right-3 sm:right-8 opacity-60 pointer-events-none animate-live-flicker" style={{ animationDelay: "2.3s" }}>
        <svg width="34" height="26" viewBox="0 0 44 34" fill="none">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FDE047" />
          <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#991B1B" />
        </svg>
      </div>

      {/* =========================================================================
          SACRED FESTIVE PEEPAL / ASHOKA LEAF MOTIFS
          ========================================================= */}
      <div className="absolute top-[34%] right-4 sm:right-12 opacity-40 pointer-events-none animate-live-leaf" style={{ animationDelay: "2.5s" }}>
        <svg width="28" height="38" viewBox="0 0 34 44" fill="none">
          <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#B45309" opacity="0.45" />
          <path d="M17 2L17 42M17 15L27 22" stroke="#FACC15" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute top-[56%] left-4 sm:left-12 opacity-40 pointer-events-none animate-live-leaf" style={{ animationDelay: "1.7s" }}>
        <svg width="28" height="38" viewBox="0 0 34 44" fill="none">
          <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#047857" opacity="0.45" />
          <path d="M17 2L17 42M17 15L27 22" stroke="#FDE68A" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute top-[76%] right-4 sm:right-12 opacity-40 pointer-events-none animate-live-leaf" style={{ animationDelay: "0.8s" }}>
        <svg width="28" height="38" viewBox="0 0 34 44" fill="none">
          <path d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z" fill="#B45309" opacity="0.45" />
          <path d="M17 2L17 42M17 15L27 22" stroke="#FACC15" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>

      {/* =========================================================================
          CULTURAL FESTIVAL MOTIFS (SIDE GUTTERS)
          ========================================================================= */}
      <div className="absolute top-[42%] left-3 sm:left-8 opacity-40 pointer-events-none animate-live-drift-diag" style={{ animationDelay: "2.2s" }}>
        <Music className="w-6 h-6 text-pink-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]" />
      </div>

      <div className="absolute top-[54%] right-3 sm:right-8 opacity-40 pointer-events-none animate-live-sway" style={{ animationDelay: "0.8s" }}>
        <Trophy className="w-6 h-6 text-amber-400 drop-shadow-[0_0_12px_rgba(245,184,66,0.6)]" />
      </div>

      <div className="absolute top-[72%] left-3 sm:left-8 opacity-40 pointer-events-none animate-live-drift-diag" style={{ animationDelay: "1.1s" }}>
        <Theater className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
      </div>

      <div className="absolute top-[80%] right-3 sm:right-8 opacity-40 pointer-events-none animate-live-sway" style={{ animationDelay: "2.8s" }}>
        <Palette className="w-6 h-6 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
      </div>

      <div className="absolute top-[92%] left-3 sm:left-8 opacity-40 pointer-events-none animate-live-drift-diag" style={{ animationDelay: "1.5s" }}>
        <Crown className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]" />
      </div>

      {/* =========================================================================
          TWINKLING GOLDEN STARS & EMBERS
          ========================================================================= */}
      <div className="absolute top-[18%] left-[8%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F5B842] opacity-75 animate-live-twinkle" style={{ animationDelay: "0.3s" }} />
      <div className="absolute top-[22%] right-[8%] w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#FDE047] opacity-75 animate-live-twinkle" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[36%] left-[6%] w-1.5 h-1.5 rounded-full bg-pink-300 shadow-[0_0_8px_#F43F5E] opacity-75 animate-live-twinkle" style={{ animationDelay: "2.2s" }} />
      <div className="absolute top-[46%] right-[7%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F5B842] opacity-75 animate-live-twinkle" style={{ animationDelay: "0.9s" }} />
      <div className="absolute top-[62%] left-[7%] w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#06B6D4] opacity-75 animate-live-twinkle" style={{ animationDelay: "1.8s" }} />
      <div className="absolute top-[72%] right-[6%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F5B842] opacity-75 animate-live-twinkle" style={{ animationDelay: "2.7s" }} />
      <div className="absolute top-[88%] left-[8%] w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#10B981] opacity-75 animate-live-twinkle" style={{ animationDelay: "1.2s" }} />
      <div className="absolute top-[94%] right-[8%] w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#FDE047] opacity-75 animate-live-twinkle" style={{ animationDelay: "2.4s" }} />

      {/* Gentle Rising Warm Amber Embers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute left-[4%] top-[25%] w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F5B842] animate-live-sparkle" style={{ animationDelay: "0s", animationDuration: "6s" }} />
        <span className="absolute left-[8%] top-[60%] w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#FACC15] animate-live-sparkle" style={{ animationDelay: "1.8s", animationDuration: "7s" }} />
        <span className="absolute right-[8%] top-[35%] w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#FB7185] animate-live-sparkle" style={{ animationDelay: "2.6s", animationDuration: "6.5s" }} />
        <span className="absolute right-[4%] top-[70%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE] animate-live-sparkle" style={{ animationDelay: "0.8s", animationDuration: "7.5s" }} />
      </div>
    </div>
  );
};

export default FloatingBackgroundElements;
