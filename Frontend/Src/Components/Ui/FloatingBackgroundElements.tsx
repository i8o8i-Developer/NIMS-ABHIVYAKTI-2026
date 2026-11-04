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
  Feather,
  Bell,
  Disc,
  Medal,
  Drama,
  Layers,
  BookOpen,
} from "lucide-react";

interface FloatingBackgroundElementsProps {
  variant?: "home" | "subpage" | "auth";
}

// Sacred Indian Rangoli Mandala Motif
const RangoliMandala: React.FC<{
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
}> = ({ className = "", size = 38, opacity = 0.5, color = "#F5B842" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    className={`pointer-events-none select-none ${className}`}
    style={{ opacity }}
  >
    <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="20" cy="20" r="12" stroke="#E11D48" strokeWidth="1" strokeOpacity="0.7" />
    <circle cx="20" cy="20" r="6" stroke="#FACC15" strokeWidth="1.2" />
    <path
      d="M20 2L23 15L38 20L23 25L20 38L17 25L2 20L17 15Z"
      fill={color}
      fillOpacity="0.35"
      stroke={color}
      strokeWidth="0.8"
    />
    <circle cx="20" cy="20" r="2.5" fill="#FEF08A" />
  </svg>
);

// Traditional Festive Diya Lamp
const FestiveDiya: React.FC<{
  className?: string;
  width?: number;
  height?: number;
  flameColor?: string;
  style?: React.CSSProperties;
}> = ({ className = "", width = 36, height = 28, flameColor = "#FACC15", style }) => (
  <div className={`pointer-events-none select-none animate-live-flicker ${className}`} style={style}>
    <svg width={width} height={height} viewBox="0 0 44 34" fill="none" className="drop-shadow-[0_0_12px_rgba(245,184,66,0.6)]">
      <path
        d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z"
        fill={flameColor}
      />
      <path
        d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z"
        fill="#FEF08A"
      />
      <path
        d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z"
        fill="#881337"
      />
      <path
        d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z"
        fill="#D97706"
      />
    </svg>
  </div>
);

// Auspicious Ashoka & Mango Leaf Motif
const FestiveLeaf: React.FC<{
  className?: string;
  width?: number;
  height?: number;
  fillColor?: string;
  strokeColor?: string;
  style?: React.CSSProperties;
}> = ({
  className = "",
  width = 22,
  height = 32,
  fillColor = "#047857",
  strokeColor = "#FDE68A",
  style,
}) => (
  <div className={`pointer-events-none select-none animate-live-leaf ${className}`} style={style}>
    <svg width={width} height={height} viewBox="0 0 34 44" fill="none">
      <path
        d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z"
        fill={fillColor}
        opacity="0.6"
      />
      <path
        d="M17 2L17 42M17 15L27 22M17 22L7 29M17 30L25 36"
        stroke={strokeColor}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export const FloatingBackgroundElements: React.FC<FloatingBackgroundElementsProps> = ({
  variant = "home",
}) => {
  if (variant === "auth") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_#140207_0%,_#0d0105_40%,_#060002_100%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[32rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.12)_0%,_rgba(225,29,72,0.06)_45%,_transparent_75%)] blur-3xl pointer-events-none" />
        <div className="absolute top-12 left-[12%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F5B842] opacity-75 animate-live-twinkle" />
        <div className="absolute top-16 right-[12%] w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#FDE047] opacity-75 animate-live-twinkle" style={{ animationDelay: "1.2s" }} />
        <div className="absolute bottom-12 left-[10%] w-1.5 h-1.5 rounded-full bg-pink-300 shadow-[0_0_8px_#F43F5E] opacity-70 animate-live-twinkle" style={{ animationDelay: "2.1s" }} />
        <div className="absolute bottom-16 right-[10%] w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#06B6D4] opacity-70 animate-live-twinkle" style={{ animationDelay: "0.8s" }} />
      </div>
    );
  }

  if (variant === "subpage") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_#1f020b_0%,_#2b0413_10%,_#1a020c_25%,_#0c0106_45%,_#060103_65%,_#0a0105_85%,_#140209_100%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[32rem] rounded-full bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.28)_0%,_rgba(225,29,72,0.15)_40%,_transparent_75%)] blur-3xl pointer-events-none" />
        <div className="absolute top-16 -left-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.22)_0%,_transparent_65%)] blur-[100px] pointer-events-none" />
        <div className="absolute top-16 -right-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.22)_0%,_transparent_65%)] blur-[100px] pointer-events-none" />
        <FestiveDiya className="absolute top-44 left-2 sm:left-6 opacity-75" />
        <FestiveDiya className="absolute top-48 right-2 sm:right-6 opacity-75" style={{ animationDelay: "1.2s" }} />
        <FestiveDiya className="absolute top-[40%] left-2 sm:left-6 opacity-70" style={{ animationDelay: "2.1s" }} />
        <FestiveDiya className="absolute top-[45%] right-2 sm:right-6 opacity-70" style={{ animationDelay: "0.8s" }} />
        <FestiveDiya className="absolute bottom-28 left-2 sm:left-6 opacity-70" style={{ animationDelay: "1.1s" }} />
        <FestiveDiya className="absolute bottom-36 right-2 sm:right-6 opacity-70" style={{ animationDelay: "1.9s" }} />
      </div>
    );
  }

  // DEFAULT: HOME VARIANT
  // PERFECTLY BALANCED, SYMMETRICAL FESTIVE ORNAMENTAL RAILS ON LEFT AND RIGHT
  // BEAUTIFULLY ALIGNED FROM SCHEDULE (IMAGE 2) DOWN TO LEADERBOARD, ARENAS, FAQ & FOOTER
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Deep Obsidian Velvet Festive Base Canvas */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_#1c0209_0%,_#280410_6%,_#17020a_14%,_#0a0105_22%,_#060103_36%,_#040002_52%,_#070104_68%,_#0f0208_84%,_#1a0209_100%)]" />

      {/* Atmospheric Theatrical Spotlights Across Sections */}
      <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-full max-w-6xl h-[38rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.25)_0%,_rgba(159,18,57,0.12)_45%,_transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute top-[22%] -left-20 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(217,70,239,0.18)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute top-[22%] -right-20 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.18)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-1/4 w-[42rem] h-[34rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.18)_0%,_transparent_70%)] blur-[130px] pointer-events-none" />
      <div className="absolute top-[60%] right-1/4 w-[42rem] h-[34rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.16)_0%,_transparent_70%)] blur-[130px] pointer-events-none" />
      <div className="absolute top-[80%] left-1/3 w-[38rem] h-[30rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.18)_0%,_transparent_70%)] blur-[130px] pointer-events-none" />


      {/* =========================================================================
          TIER 1 (24% - 28%): ELEVATED FESTIVAL STATS & HIGHLIGHTS
          Balanced Diya, Peepal Leaf & Peacock Feather Symmetrically Placed
          With Generous Vertical Spacing To Eliminate Any Visual Collision
          ========================================================================= */}
      {/* Tier 1 - Left */}
      <div className="absolute top-[25%] left-2 sm:left-4 lg:left-6 2xl:left-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <FestiveDiya width={34} height={26} style={{ animationDelay: "1.2s" }} />
        <div className="p-2 rounded-xl bg-[#031c10]/90 border border-emerald-500/50 shadow-lg shadow-emerald-950/60 animate-live-sway">
          <Feather className="w-4 h-4 text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F5B842] animate-live-twinkle" />
      </div>

      {/* Tier 1 - Right (Mirrored) */}
      <div className="absolute top-[25%] right-2 sm:right-4 lg:right-6 2xl:right-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <FestiveDiya width={34} height={26} style={{ animationDelay: "2.0s" }} />
        <div className="p-2 rounded-xl bg-[#21020a]/90 border border-rose-500/50 shadow-lg shadow-rose-950/60 animate-live-sway" style={{ animationDelay: "1.4s" }}>
          <FestiveLeaf width={18} height={26} fillColor="#E11D48" strokeColor="#FDE68A" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#FDE047] animate-live-twinkle" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* =========================================================================
          TIER 2 (36% - 41%): OFFICIAL EVENT SCHEDULE HEADER (IMAGE 2 ALIGNMENT)
          Sacred Mandalas + Classical Bell & Music Emblem Perfectly Mirrored
          With Generous Vertical Spacing To Eliminate Any Visual Collision
          ========================================================================= */}
      {/* Tier 2 - Left */}
      <div className="absolute top-[37%] left-2 sm:left-4 lg:left-6 2xl:left-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <RangoliMandala size={36} opacity={0.45} color="#F5B842" className="animate-live-spin-slow" />
        <div className="p-2 rounded-xl bg-[#1f1002]/90 border border-amber-500/50 shadow-lg shadow-amber-950/60 animate-live-sway" style={{ animationDelay: "0.8s" }}>
          <Bell className="w-4 h-4 text-amber-300 drop-shadow-[0_0_10px_rgba(245,184,66,0.7)]" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#06B6D4] animate-live-twinkle" style={{ animationDelay: "2.1s" }} />
      </div>

      {/* Tier 2 - Right (Mirrored) */}
      <div className="absolute top-[37%] right-2 sm:right-4 lg:right-6 2xl:right-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <RangoliMandala size={36} opacity={0.45} color="#06B6D4" className="animate-live-spin-slow" />
        <div className="p-2 rounded-xl bg-[#041d24]/90 border border-cyan-500/50 shadow-lg shadow-cyan-950/60 animate-live-sway" style={{ animationDelay: "2.2s" }}>
          <Music className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.7)]" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-pink-300 shadow-[0_0_8px_#F43F5E] animate-live-twinkle" style={{ animationDelay: "0.9s" }} />
      </div>

      {/* =========================================================================
          TIER 3 (47% - 52%): SCHEDULE CARDS GRID MIDLINE (IMAGE 2 ALIGNMENT)
          Auspicious Brass Diyas + Sacred Leaves Framing Schedule Cards Grid
          With Generous Vertical Spacing To Eliminate Any Visual Collision
          ========================================================================= */}
      {/* Tier 3 - Left */}
      <div className="absolute top-[48%] left-2 sm:left-4 lg:left-6 2xl:left-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <FestiveDiya width={36} height={28} style={{ animationDelay: "1.7s" }} />
        <div className="p-1.5 rounded-xl bg-[#031f13]/90 border border-emerald-500/50 shadow-lg shadow-emerald-950/60 animate-live-sway" style={{ animationDelay: "2.5s" }}>
          <FestiveLeaf width={20} height={28} />
        </div>
        <div className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] animate-live-twinkle" />
      </div>

      {/* Tier 3 - Right (Mirrored) */}
      <div className="absolute top-[48%] right-2 sm:right-4 lg:right-6 2xl:right-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <FestiveDiya width={36} height={28} style={{ animationDelay: "0.9s" }} />
        <div className="p-1.5 rounded-xl bg-[#210512]/90 border border-rose-500/50 shadow-lg shadow-rose-950/60 animate-live-sway" style={{ animationDelay: "1.3s" }}>
          <FestiveLeaf width={20} height={28} fillColor="#E11D48" strokeColor="#FDE68A" />
        </div>
        <div className="w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_10px_#FDE047] animate-live-twinkle" style={{ animationDelay: "1.8s" }} />
      </div>

      {/* =========================================================================
          TIER 4 (58% - 63%): CHAMPIONSHIP LEADERBOARD & PODIUM STAGE
          Golden Trophy & Royal Crown Emblems Marking Trophy Race
          With Generous Vertical Spacing To Eliminate Any Visual Collision
          ========================================================================= */}
      {/* Tier 4 - Left */}
      <div className="absolute top-[59%] left-2 sm:left-4 lg:left-6 2xl:left-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <div className="p-2.5 rounded-2xl bg-[#241302]/95 border-2 border-amber-400/60 shadow-xl shadow-amber-950/70 animate-live-sway">
          <Trophy className="w-5 h-5 text-amber-300 drop-shadow-[0_0_14px_rgba(245,184,66,0.8)]" />
        </div>
        <FestiveDiya width={32} height={24} style={{ animationDelay: "1.4s" }} />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#10B981] animate-live-twinkle" />
      </div>

      {/* Tier 4 - Right (Mirrored) */}
      <div className="absolute top-[59%] right-2 sm:right-4 lg:right-6 2xl:right-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <div className="p-2.5 rounded-2xl bg-[#241302]/95 border-2 border-yellow-400/60 shadow-xl shadow-yellow-950/70 animate-live-sway" style={{ animationDelay: "1.9s" }}>
          <Crown className="w-5 h-5 text-yellow-300 drop-shadow-[0_0_14px_rgba(253,224,71,0.8)]" />
        </div>
        <FestiveDiya width={32} height={24} style={{ animationDelay: "2.3s" }} />
        <div className="w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_#38BDF8] animate-live-twinkle" style={{ animationDelay: "1.1s" }} />
      </div>

      {/* =========================================================================
          TIER 5 (69% - 74%): CULTURAL ARENAS & 4-PILLAR EVALUATION RUBRIC
          Nataraja Dance Mudra & Fine Arts Palette Framing Rubrics
          With Generous Vertical Spacing To Eliminate Any Visual Collision
          ========================================================================= */}
      {/* Tier 5 - Left */}
      <div className="absolute top-[70%] left-2 sm:left-4 lg:left-6 2xl:left-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <RangoliMandala size={36} opacity={0.4} color="#EC4899" className="animate-live-spin-slow" />
        <div className="p-2 rounded-xl bg-[#1c0213]/90 border border-pink-500/50 shadow-lg shadow-pink-950/60 animate-live-sway" style={{ animationDelay: "2.7s" }}>
          <Theater className="w-4 h-4 text-pink-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]" />
        </div>
        <FestiveLeaf width={18} height={26} />
      </div>

      {/* Tier 5 - Right (Mirrored) */}
      <div className="absolute top-[70%] right-2 sm:right-4 lg:right-6 2xl:right-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <RangoliMandala size={36} opacity={0.4} color="#A855F7" className="animate-live-spin-slow" />
        <div className="p-2 rounded-xl bg-[#180221]/90 border border-purple-500/50 shadow-lg shadow-purple-950/60 animate-live-sway" style={{ animationDelay: "1.5s" }}>
          <Palette className="w-4 h-4 text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
        </div>
        <FestiveLeaf width={18} height={26} />
      </div>

      {/* =========================================================================
          TIER 6 (81% - 86%): FESTIVAL GUIDELINES & CELEBRATION FAQ
          Honor Award & Torch Flame Accompanying Guidelines
          With Generous Vertical Spacing To Eliminate Any Visual Collision
          ========================================================================= */}
      {/* Tier 6 - Left */}
      <div className="absolute top-[82%] left-2 sm:left-4 lg:left-6 2xl:left-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <FestiveDiya width={34} height={26} style={{ animationDelay: "1.5s" }} />
        <div className="p-2 rounded-xl bg-[#1c051f]/90 border border-fuchsia-500/50 shadow-lg shadow-fuchsia-950/60 animate-live-sway">
          <Award className="w-4 h-4 text-fuchsia-300 drop-shadow-[0_0_10px_rgba(217,70,239,0.7)]" />
        </div>
        <div className="w-2 h-2 rounded-full bg-pink-300 shadow-[0_0_10px_#F43F5E] animate-live-twinkle" />
      </div>

      {/* Tier 6 - Right (Mirrored) */}
      <div className="absolute top-[82%] right-2 sm:right-4 lg:right-6 2xl:right-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <FestiveDiya width={34} height={26} style={{ animationDelay: "2.6s" }} />
        <div className="p-2 rounded-xl bg-[#260802]/90 border border-orange-500/50 shadow-lg shadow-orange-950/60 animate-live-sway" style={{ animationDelay: "1.8s" }}>
          <Flame className="w-4 h-4 text-orange-400 drop-shadow-[0_0_12px_rgba(251,146,60,0.8)]" />
        </div>
        <div className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] animate-live-twinkle" />
      </div>

      {/* =========================================================================
          TIER 7 (93% - 97%): ABOVE FOOTER TERMINAL ANCHOR
          Golden Brass Diyas, Auspicious Leaves & Stardust Finishing The Journey
          With Generous Vertical Spacing To Eliminate Any Visual Collision
          ========================================================================= */}
      {/* Tier 7 - Left */}
      <div className="absolute top-[94%] left-2 sm:left-4 lg:left-6 2xl:left-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <FestiveDiya width={36} height={28} style={{ animationDelay: "0.6s" }} />
        <FestiveLeaf width={20} height={28} />
        <div className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] animate-live-twinkle" />
      </div>

      {/* Tier 7 - Right (Mirrored) */}
      <div className="absolute top-[94%] right-2 sm:right-4 lg:right-6 2xl:right-8 flex flex-col items-center gap-8 sm:gap-11 2xl:gap-14">
        <FestiveDiya width={36} height={28} style={{ animationDelay: "2.1s" }} />
        <FestiveLeaf width={20} height={28} />
        <div className="w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_10px_#FDE047] animate-live-twinkle" />
      </div>
    </div>
  );
};

export default FloatingBackgroundElements;
