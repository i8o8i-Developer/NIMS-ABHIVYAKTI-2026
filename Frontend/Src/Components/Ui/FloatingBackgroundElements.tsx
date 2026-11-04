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
} from "lucide-react";

interface FloatingBackgroundElementsProps {
  variant?: "home" | "subpage";
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
  width = 24,
  height = 34,
  fillColor = "#047857",
  strokeColor = "#FDE68A",
  style,
}) => (
  <div className={`pointer-events-none select-none animate-live-leaf ${className}`} style={style}>
    <svg width={width} height={height} viewBox="0 0 34 44" fill="none">
      <path
        d="M17 2C17 2 32 14 32 28C32 36 25 42 17 42C9 42 2 36 2 28C2 14 17 2 17 2Z"
        fill={fillColor}
        opacity="0.55"
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
  if (variant === "subpage") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
        {/* Subpage Theatrical Canvas */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_#1f020b_0%,_#2b0413_10%,_#1a020c_25%,_#0c0106_45%,_#060103_65%,_#0a0105_85%,_#140209_100%)]" />

        {/* Spotlights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[32rem] rounded-full bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.28)_0%,_rgba(225,29,72,0.15)_40%,_transparent_75%)] blur-3xl pointer-events-none" />
        <div className="absolute top-16 -left-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.22)_0%,_transparent_65%)] blur-[100px] pointer-events-none" />
        <div className="absolute top-16 -right-16 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.22)_0%,_transparent_65%)] blur-[100px] pointer-events-none" />
        <div className="absolute top-[40%] -left-12 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.20)_0%,_transparent_65%)] blur-[110px] pointer-events-none" />
        <div className="absolute top-[45%] -right-12 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.20)_0%,_transparent_65%)] blur-[110px] pointer-events-none" />

        {/* Floating Diyas Along Margins */}
        <FestiveDiya className="absolute top-28 left-2 sm:left-6 opacity-75" />
        <FestiveDiya className="absolute top-36 right-2 sm:right-6 opacity-75" style={{ animationDelay: "1.2s" }} />
        <FestiveDiya className="absolute top-[32%] left-2 sm:left-6 opacity-70" style={{ animationDelay: "2.1s" }} />
        <FestiveDiya className="absolute top-[42%] right-2 sm:right-6 opacity-70" style={{ animationDelay: "0.8s" }} />
        <FestiveDiya className="absolute top-[62%] left-2 sm:left-6 opacity-65" style={{ animationDelay: "1.7s" }} />
        <FestiveDiya className="absolute top-[72%] right-2 sm:right-6 opacity-65" style={{ animationDelay: "2.4s" }} />
        <FestiveDiya className="absolute bottom-28 left-2 sm:left-6 opacity-70" style={{ animationDelay: "1.1s" }} />
        <FestiveDiya className="absolute bottom-36 right-2 sm:right-6 opacity-70" style={{ animationDelay: "1.9s" }} />

        {/* Sacred Leaves */}
        <FestiveLeaf className="absolute top-44 right-3 sm:right-10 opacity-45" style={{ animationDelay: "1.5s" }} />
        <FestiveLeaf className="absolute top-[38%] left-3 sm:left-10 opacity-45" style={{ animationDelay: "2.3s" }} />
        <FestiveLeaf className="absolute top-[68%] right-3 sm:right-10 opacity-45" style={{ animationDelay: "0.9s" }} />
        <FestiveLeaf className="absolute bottom-40 left-3 sm:left-10 opacity-45" style={{ animationDelay: "1.8s" }} />

        {/* Rangoli Mandalas */}
        <RangoliMandala className="absolute top-52 left-[8%] animate-live-spin-slow" size={32} opacity={0.4} />
        <RangoliMandala className="absolute top-[48%] right-[8%] animate-live-spin-slow" size={36} opacity={0.4} color="#EC4899" />
        <RangoliMandala className="absolute bottom-48 left-[7%] animate-live-spin-slow" size={32} opacity={0.35} color="#06B6D4" />

        {/* Twinkling Stars */}
        <div className="absolute top-24 left-[12%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] opacity-85 animate-live-twinkle" />
        <div className="absolute top-32 right-[14%] w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_10px_#FDE047] opacity-85 animate-live-twinkle" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-[45%] left-[8%] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#06B6D4] opacity-85 animate-live-twinkle" style={{ animationDelay: "2.1s" }} />
        <div className="absolute top-[55%] right-[9%] w-2 h-2 rounded-full bg-pink-300 shadow-[0_0_10px_#F43F5E] opacity-85 animate-live-twinkle" style={{ animationDelay: "0.8s" }} />
        <div className="absolute bottom-28 left-[11%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] opacity-85 animate-live-twinkle" style={{ animationDelay: "1.7s" }} />
        <div className="absolute bottom-36 right-[12%] w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_10px_#10B981] opacity-85 animate-live-twinkle" style={{ animationDelay: "2.4s" }} />
      </div>
    );
  }

  // DEFAULT: HOME VARIANT — ENRICHED WITH FESTIVE ELEMENTS ALL OVER THE PAGE
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Deep Obsidian Velvet Festive Base Canvas */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_#1c0209_0%,_#280410_6%,_#17020a_14%,_#0a0105_22%,_#060103_36%,_#040002_52%,_#070104_68%,_#0f0208_84%,_#1a0209_100%)]" />

      {/* Atmospheric Theatrical Spotlights */}
      <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-full max-w-6xl h-[38rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.30)_0%,_rgba(159,18,57,0.15)_45%,_transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute top-[18%] -left-20 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(217,70,239,0.18)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute top-[18%] -right-20 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.18)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute top-[38%] left-1/4 w-[42rem] h-[34rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.18)_0%,_transparent_70%)] blur-[130px] pointer-events-none" />
      <div className="absolute top-[58%] right-1/4 w-[42rem] h-[34rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.16)_0%,_transparent_70%)] blur-[130px] pointer-events-none" />
      <div className="absolute top-[78%] left-1/3 w-[38rem] h-[30rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.18)_0%,_transparent_70%)] blur-[130px] pointer-events-none" />

      {/* =========================================================================
          TRADITIONAL FESTIVE GLOWING DIYAS (ALL OVER PAGE VERTICAL GUTTERS)
          Evenly distributed from Hero down through Competitions, Schedule,
          Leaderboard, Contingents, FAQ, and Footer
          ========================================================================= */}
      {/* Zone 1: Upper Hero */}
      <FestiveDiya className="absolute top-28 left-2 sm:left-6 opacity-75" />
      <FestiveDiya className="absolute top-36 right-2 sm:right-6 opacity-75" style={{ animationDelay: "1.4s" }} />

      {/* Zone 2: Mid Hero */}
      <FestiveDiya className="absolute top-[14%] left-3 sm:left-8 opacity-70" style={{ animationDelay: "2.1s" }} />
      <FestiveDiya className="absolute top-[17%] right-3 sm:right-8 opacity-70" style={{ animationDelay: "0.7s" }} />

      {/* Zone 3: Competitions Arenas Showcase */}
      <FestiveDiya className="absolute top-[25%] left-2 sm:left-7 opacity-75" style={{ animationDelay: "1.8s" }} />
      <FestiveDiya className="absolute top-[29%] right-2 sm:right-7 opacity-75" style={{ animationDelay: "1.1s" }} />

      {/* Zone 4: Competitions Cards Midzone */}
      <FestiveDiya className="absolute top-[36%] left-3 sm:left-8 opacity-70" style={{ animationDelay: "2.4s" }} />
      <FestiveDiya className="absolute top-[40%] right-3 sm:right-8 opacity-70" style={{ animationDelay: "0.9s" }} />

      {/* Zone 5: Schedule 4-Day Timeline */}
      <FestiveDiya className="absolute top-[47%] left-2 sm:left-7 opacity-75" style={{ animationDelay: "1.6s" }} />
      <FestiveDiya className="absolute top-[52%] right-2 sm:right-7 opacity-75" style={{ animationDelay: "2.2s" }} />

      {/* Zone 6: Championship Leaderboard & Podium */}
      <FestiveDiya className="absolute top-[60%] left-3 sm:left-8 opacity-75" style={{ animationDelay: "0.5s" }} />
      <FestiveDiya className="absolute top-[64%] right-3 sm:right-8 opacity-75" style={{ animationDelay: "1.9s" }} />

      {/* Zone 7: College Contingents Standings */}
      <FestiveDiya className="absolute top-[72%] left-2 sm:left-7 opacity-70" style={{ animationDelay: "2.5s" }} />
      <FestiveDiya className="absolute top-[77%] right-2 sm:right-7 opacity-70" style={{ animationDelay: "1.3s" }} />

      {/* Zone 8: FAQ & Celebration Zone */}
      <FestiveDiya className="absolute top-[85%] left-3 sm:left-8 opacity-75" style={{ animationDelay: "0.8s" }} />
      <FestiveDiya className="absolute top-[90%] right-3 sm:right-8 opacity-75" style={{ animationDelay: "2.0s" }} />

      {/* Zone 9: Footer Anchor */}
      <FestiveDiya className="absolute bottom-16 left-3 sm:left-8 opacity-70" style={{ animationDelay: "1.5s" }} />
      <FestiveDiya className="absolute bottom-20 right-3 sm:right-8 opacity-70" style={{ animationDelay: "2.7s" }} />

      {/* =========================================================================
          SACRED FESTIVE PEEPAL / ASHOKA LEAF MOTIFS (DISTRIBUTED ALL OVER PAGE)
          ========================================================================= */}
      <FestiveLeaf className="absolute top-[10%] right-4 sm:right-12 opacity-50" style={{ animationDelay: "2.5s" }} />
      <FestiveLeaf className="absolute top-[21%] left-4 sm:left-12 opacity-50" style={{ animationDelay: "1.7s" }} />
      <FestiveLeaf className="absolute top-[32%] right-4 sm:right-12 opacity-50" style={{ animationDelay: "0.8s" }} />
      <FestiveLeaf className="absolute top-[43%] left-4 sm:left-12 opacity-50" style={{ animationDelay: "2.9s" }} />
      <FestiveLeaf className="absolute top-[55%] right-4 sm:right-12 opacity-50" style={{ animationDelay: "1.3s" }} />
      <FestiveLeaf className="absolute top-[66%] left-4 sm:left-12 opacity-50" style={{ animationDelay: "2.1s" }} />
      <FestiveLeaf className="absolute top-[78%] right-4 sm:right-12 opacity-50" style={{ animationDelay: "1.0s" }} />
      <FestiveLeaf className="absolute top-[88%] left-4 sm:left-12 opacity-50" style={{ animationDelay: "2.6s" }} />

      {/* =========================================================================
          SACRED RANGOLI MANDALAS (ROTATING GENTLY AT SECTION TRANSITIONS)
          ========================================================================= */}
      <RangoliMandala className="absolute top-[15%] left-[5%] animate-live-spin-slow" size={38} opacity={0.4} color="#F5B842" />
      <RangoliMandala className="absolute top-[28%] right-[5%] animate-live-spin-slow" size={42} opacity={0.4} color="#EC4899" />
      <RangoliMandala className="absolute top-[45%] left-[4%] animate-live-spin-slow" size={40} opacity={0.35} color="#06B6D4" />
      <RangoliMandala className="absolute top-[63%] right-[5%] animate-live-spin-slow" size={44} opacity={0.4} color="#FACC15" />
      <RangoliMandala className="absolute top-[81%] left-[5%] animate-live-spin-slow" size={38} opacity={0.35} color="#10B981" />
      <RangoliMandala className="absolute top-[93%] right-[4%] animate-live-spin-slow" size={40} opacity={0.4} color="#A855F7" />

      {/* =========================================================================
          CULTURAL FESTIVAL MOTIF BADGES & ICONS (FLOATING ALONG GUTTERS ALL OVER PAGE)
          ========================================================================= */}
      {/* 1. Dramatic Arts (Natya) */}
      <div className="absolute top-[8%] left-4 sm:left-10 opacity-75 animate-live-drift-diag" style={{ animationDelay: "1.2s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#170208]/90 border border-rose-500/50 shadow-lg shadow-rose-950/60 flex items-center justify-center">
          <Theater className="w-5 h-5 sm:w-6 sm:h-6 text-rose-300 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)]" />
        </div>
      </div>

      {/* 2. Classical Music & Sitar Swara */}
      <div className="absolute top-[12%] right-4 sm:right-10 opacity-75 animate-live-sway" style={{ animationDelay: "0.6s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#170208]/90 border border-amber-500/50 shadow-lg shadow-amber-950/60 flex items-center justify-center">
          <Music className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 drop-shadow-[0_0_12px_rgba(245,184,66,0.7)]" />
        </div>
      </div>

      {/* 3. Dance Mudras & Peacock Feather */}
      <div className="absolute top-[22%] left-3 sm:left-9 opacity-75 animate-live-sway" style={{ animationDelay: "2.3s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#02170d]/90 border border-emerald-500/50 shadow-lg shadow-emerald-950/60 flex items-center justify-center">
          <Feather className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
        </div>
      </div>

      {/* 4. Fine Arts & Painting Palette */}
      <div className="absolute top-[26%] right-3 sm:right-9 opacity-75 animate-live-drift-diag" style={{ animationDelay: "1.7s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#140217]/90 border border-purple-500/50 shadow-lg shadow-purple-950/60 flex items-center justify-center">
          <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
        </div>
      </div>

      {/* 5. Electric Beats & DJ Disc */}
      <div className="absolute top-[34%] left-4 sm:left-10 opacity-75 animate-live-spin-slow" style={{ animationDelay: "0.9s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#021419]/90 border border-cyan-500/50 shadow-lg shadow-cyan-950/60 flex items-center justify-center">
          <Disc className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]" />
        </div>
      </div>

      {/* 6. Vocal Poetry & Stage Mic */}
      <div className="absolute top-[38%] right-4 sm:right-10 opacity-75 animate-live-sway" style={{ animationDelay: "2.7s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#1c0208]/90 border border-pink-500/50 shadow-lg shadow-pink-950/60 flex items-center justify-center">
          <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-pink-300 drop-shadow-[0_0_12px_rgba(236,72,153,0.7)]" />
        </div>
      </div>

      {/* 7. Ghungroo / Sacred Bell */}
      <div className="absolute top-[49%] left-3 sm:left-9 opacity-75 animate-live-sway" style={{ animationDelay: "1.4s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#1a0e02]/90 border border-amber-500/50 shadow-lg shadow-amber-950/60 flex items-center justify-center">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 drop-shadow-[0_0_12px_rgba(250,204,21,0.7)]" />
        </div>
      </div>

      {/* 8. Championship Trophy */}
      <div className="absolute top-[54%] right-3 sm:right-9 opacity-75 animate-live-drift-diag" style={{ animationDelay: "0.8s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#1a0e02]/90 border border-yellow-400/50 shadow-lg shadow-yellow-950/60 flex items-center justify-center">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 drop-shadow-[0_0_14px_rgba(245,184,66,0.8)]" />
        </div>
      </div>

      {/* 9. Olympic Victory Medal */}
      <div className="absolute top-[66%] left-4 sm:left-10 opacity-75 animate-live-sway" style={{ animationDelay: "2.0s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#051525]/90 border border-blue-400/50 shadow-lg shadow-blue-950/60 flex items-center justify-center">
          <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-sky-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
        </div>
      </div>

      {/* 10. Crown of Excellence */}
      <div className="absolute top-[70%] right-4 sm:right-10 opacity-75 animate-live-drift-diag" style={{ animationDelay: "1.1s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#19020e]/90 border border-yellow-400/50 shadow-lg shadow-yellow-950/60 flex items-center justify-center">
          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 drop-shadow-[0_0_14px_rgba(253,224,71,0.8)]" />
        </div>
      </div>

      {/* 11. Street Theatre Drama */}
      <div className="absolute top-[80%] left-3 sm:left-9 opacity-75 animate-live-drift-diag" style={{ animationDelay: "2.4s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#041a12]/90 border border-emerald-400/50 shadow-lg shadow-emerald-950/60 flex items-center justify-center">
          <Drama className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
        </div>
      </div>

      {/* 12. Festival Torch & Energy Flame */}
      <div className="absolute top-[84%] right-3 sm:right-9 opacity-75 animate-live-sway" style={{ animationDelay: "1.6s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#1f0902]/90 border border-orange-400/50 shadow-lg shadow-orange-950/60 flex items-center justify-center">
          <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 drop-shadow-[0_0_14px_rgba(251,146,60,0.8)]" />
        </div>
      </div>

      {/* 13. Prestigious Honor Award */}
      <div className="absolute top-[94%] left-4 sm:left-10 opacity-75 animate-live-sway" style={{ animationDelay: "0.5s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#140212]/90 border border-fuchsia-400/50 shadow-lg shadow-fuchsia-950/60 flex items-center justify-center">
          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-300 drop-shadow-[0_0_12px_rgba(217,70,239,0.7)]" />
        </div>
      </div>

      {/* 14. Celestial Cultural Sparkle */}
      <div className="absolute top-[96%] right-4 sm:right-10 opacity-75 animate-live-drift-diag" style={{ animationDelay: "2.2s" }}>
        <div className="p-2 sm:p-2.5 rounded-xl bg-[#1a0e02]/90 border border-amber-400/50 shadow-lg shadow-amber-950/60 flex items-center justify-center">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 drop-shadow-[0_0_14px_rgba(245,184,66,0.8)]" />
        </div>
      </div>

      {/* =========================================================================
          TWINKLING GOLDEN & GEMSTONE STARS (ALL OVER PAGE)
          ========================================================================= */}
      <div className="absolute top-[6%] left-[9%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] opacity-85 animate-live-twinkle" style={{ animationDelay: "0.2s" }} />
      <div className="absolute top-[9%] right-[9%] w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_10px_#FDE047] opacity-85 animate-live-twinkle" style={{ animationDelay: "1.4s" }} />
      <div className="absolute top-[16%] left-[6%] w-2 h-2 rounded-full bg-pink-300 shadow-[0_0_10px_#F43F5E] opacity-85 animate-live-twinkle" style={{ animationDelay: "2.1s" }} />
      <div className="absolute top-[20%] right-[7%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] opacity-85 animate-live-twinkle" style={{ animationDelay: "0.8s" }} />
      <div className="absolute top-[30%] left-[8%] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#06B6D4] opacity-85 animate-live-twinkle" style={{ animationDelay: "1.7s" }} />
      <div className="absolute top-[35%] right-[8%] w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_10px_#10B981] opacity-85 animate-live-twinkle" style={{ animationDelay: "2.5s" }} />
      <div className="absolute top-[44%] left-[7%] w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_10px_#FACC15] opacity-85 animate-live-twinkle" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-[50%] right-[6%] w-2 h-2 rounded-full bg-rose-300 shadow-[0_0_10px_#FB7185] opacity-85 animate-live-twinkle" style={{ animationDelay: "1.9s" }} />
      <div className="absolute top-[58%] left-[8%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] opacity-85 animate-live-twinkle" style={{ animationDelay: "2.6s" }} />
      <div className="absolute top-[64%] right-[7%] w-2 h-2 rounded-full bg-purple-300 shadow-[0_0_10px_#C084FC] opacity-85 animate-live-twinkle" style={{ animationDelay: "1.1s" }} />
      <div className="absolute top-[73%] left-[7%] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22D3EE] opacity-85 animate-live-twinkle" style={{ animationDelay: "2.3s" }} />
      <div className="absolute top-[79%] right-[8%] w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_10px_#FDE047] opacity-85 animate-live-twinkle" style={{ animationDelay: "0.7s" }} />
      <div className="absolute top-[86%] left-[8%] w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_10px_#34D399] opacity-85 animate-live-twinkle" style={{ animationDelay: "1.8s" }} />
      <div className="absolute top-[92%] right-[7%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] opacity-85 animate-live-twinkle" style={{ animationDelay: "2.7s" }} />

      {/* Gentle Rising Warm Amber Embers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute left-[4%] top-[15%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#F5B842] animate-live-sparkle" style={{ animationDelay: "0s", animationDuration: "6s" }} />
        <span className="absolute left-[7%] top-[35%] w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#FACC15] animate-live-sparkle" style={{ animationDelay: "1.8s", animationDuration: "7s" }} />
        <span className="absolute left-[5%] top-[55%] w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_10px_#FB923C] animate-live-sparkle" style={{ animationDelay: "3.2s", animationDuration: "6.5s" }} />
        <span className="absolute left-[6%] top-[75%] w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#FB7185] animate-live-sparkle" style={{ animationDelay: "1.1s", animationDuration: "7.5s" }} />
        <span className="absolute right-[5%] top-[25%] w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_10px_#FB7185] animate-live-sparkle" style={{ animationDelay: "2.6s", animationDuration: "6.5s" }} />
        <span className="absolute right-[7%] top-[45%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE] animate-live-sparkle" style={{ animationDelay: "0.8s", animationDuration: "7.5s" }} />
        <span className="absolute right-[4%] top-[65%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#F5B842] animate-live-sparkle" style={{ animationDelay: "3.5s", animationDuration: "7s" }} />
        <span className="absolute right-[6%] top-[85%] w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_#FACC15] animate-live-sparkle" style={{ animationDelay: "1.5s", animationDuration: "6s" }} />
      </div>
    </div>
  );
};

export default FloatingBackgroundElements;
