import React from "react";
import { Sparkles, Trophy, Flame, Music, Award } from "lucide-react";

export const FloatingBackgroundElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Deep Blackish Vignette & Mask Overlays */}
      <div className="absolute inset-0 bg-[#050002]/85 mix-blend-multiply" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      {/* Primary Center Conic & Radial Golden Glow Behind Logo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] sm:w-[55rem] h-[20rem] sm:h-[40rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,184,66,0.18)_0%,_rgba(136,19,55,0.22)_45%,_rgba(5,0,2,0)_75%)] blur-2xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(245,184,66,0.06)_0%,_transparent_65%)]" />

      {/* Dramatic Dual Diagonal Stage Spotlight Beams (Matching Image 1 Reference) */}
      <div className="absolute -top-24 -left-20 w-[24rem] sm:w-[38rem] h-[45rem] sm:h-[65rem] rotate-[32deg] origin-top-left bg-gradient-to-b from-amber-400/25 via-rose-700/15 to-transparent blur-3xl animate-spotlight-sweep" />
      <div className="absolute -top-24 -right-20 w-[24rem] sm:w-[38rem] h-[45rem] sm:h-[65rem] -rotate-[32deg] origin-top-right bg-gradient-to-b from-amber-400/25 via-rose-700/15 to-transparent blur-3xl animate-spotlight-sweep" style={{ animationDelay: "3s" }} />

      {/* Floating Glowing Stage Orbs */}
      <div className="absolute top-12 left-6 sm:left-16 w-72 sm:w-[28rem] h-72 sm:h-[28rem] rounded-full bg-rose-950/40 blur-3xl animate-live-float-slow" />
      <div className="absolute bottom-16 right-6 sm:right-16 w-80 sm:w-[32rem] h-80 sm:h-[32rem] rounded-full bg-amber-950/30 blur-3xl animate-live-float-reverse" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full bg-yellow-600/10 blur-2xl animate-live-pulse-glow" />

      {/* Dual Dynamic Arc Motif Watermarks (Dashed / Dotted Rings As In Daan Utsav & Image 1) */}
      {/* Right Side Concentric Celestial Rings */}
      <div className="absolute -right-36 -top-20 w-[26rem] sm:w-[42rem] h-[26rem] sm:h-[42rem] rounded-full opacity-[0.16] border-[8px] sm:border-[14px] border-dashed border-amber-400 animate-live-spin-slow" />
      <div className="absolute -right-20 -top-6 w-[20rem] sm:w-[32rem] h-[20rem] sm:h-[32rem] rounded-full opacity-[0.10] border-[4px] sm:border-[8px] border-dotted border-rose-400 animate-live-spin-slow" style={{ animationDirection: "reverse" }} />

      {/* Left Side Concentric Astrolabe Rings */}
      <div className="absolute -left-36 -bottom-20 w-[24rem] sm:w-[38rem] h-[24rem] sm:h-[38rem] rounded-full opacity-[0.14] border-[8px] sm:border-[14px] border-dotted border-rose-500 animate-live-spin-slow" style={{ animationDirection: "reverse" }} />
      <div className="absolute -left-20 -bottom-6 w-[18rem] sm:w-[28rem] h-[18rem] sm:h-[28rem] rounded-full opacity-[0.10] border-[4px] sm:border-[8px] border-dashed border-amber-400 animate-live-spin-slow" />

      {/* Rising Golden Embers Across Canvas */}
      <div className="absolute inset-0 overflow-hidden">
        <span className="absolute left-[6%] bottom-2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F5B842] animate-live-sparkle" style={{ animationDelay: "0s", animationDuration: "5.5s" }} />
        <span className="absolute left-[16%] bottom-5 w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_12px_#FDE047] animate-live-sparkle" style={{ animationDelay: "1.2s", animationDuration: "6.8s" }} />
        <span className="absolute left-[28%] bottom-1 w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#FB7185] animate-live-sparkle" style={{ animationDelay: "2.6s", animationDuration: "5.2s" }} />
        <span className="absolute left-[38%] bottom-6 w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_12px_#F5B842] animate-live-sparkle" style={{ animationDelay: "0.5s", animationDuration: "7.1s" }} />
        <span className="absolute left-[52%] bottom-3 w-1.5 h-1.5 rounded-full bg-yellow-200 shadow-[0_0_8px_#FEF08A] animate-live-sparkle" style={{ animationDelay: "3.2s", animationDuration: "6.3s" }} />
        <span className="absolute left-[64%] bottom-7 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#F5B842] animate-live-sparkle" style={{ animationDelay: "1.8s", animationDuration: "8.0s" }} />
        <span className="absolute left-[76%] bottom-2 w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#FB7185] animate-live-sparkle" style={{ animationDelay: "2.9s", animationDuration: "5.8s" }} />
        <span className="absolute left-[86%] bottom-6 w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_10px_#FDE047] animate-live-sparkle" style={{ animationDelay: "0.9s", animationDuration: "6.6s" }} />
        <span className="absolute left-[94%] bottom-3 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] animate-live-sparkle" style={{ animationDelay: "2.3s", animationDuration: "7.4s" }} />
      </div>

      {/* Twinkling Diamond Stars */}
      <div className="absolute top-[12%] left-[18%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] animate-live-twinkle" style={{ animationDelay: "0.3s" }} />
      <div className="absolute top-[20%] right-[16%] w-1.5 h-1.5 rounded-full bg-yellow-200 shadow-[0_0_8px_#FEF08A] animate-live-twinkle" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[45%] left-[8%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#F5B842] animate-live-twinkle" style={{ animationDelay: "0.9s" }} />
      <div className="absolute top-[68%] right-[11%] w-2.5 h-2.5 rounded-full bg-rose-300 shadow-[0_0_12px_#FDA4AF] animate-live-twinkle" style={{ animationDelay: "2.2s" }} />
      <div className="absolute top-[82%] left-[20%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F5B842] animate-live-twinkle" style={{ animationDelay: "1.8s" }} />

      {/* Floating Cultural Motifs with Gentle Physics */}
      <div className="absolute top-20 left-[10%] opacity-25 animate-live-drift-diag" style={{ animationDelay: "0s" }}>
        <Sparkles className="w-6 h-6 text-amber-400" />
      </div>
      <div className="absolute top-36 right-[12%] opacity-25 animate-live-drift-diag" style={{ animationDelay: "2.5s" }}>
        <Flame className="w-6 h-6 text-rose-400" />
      </div>
      <div className="absolute bottom-32 left-[12%] opacity-20 animate-live-drift-diag" style={{ animationDelay: "1.2s" }}>
        <Trophy className="w-6 h-6 text-amber-500" />
      </div>
      <div className="absolute bottom-40 right-[15%] opacity-25 animate-live-drift-diag" style={{ animationDelay: "3.8s" }}>
        <Music className="w-6 h-6 text-yellow-400" />
      </div>
      <div className="absolute top-1/2 left-[5%] opacity-20 animate-live-drift-diag" style={{ animationDelay: "1.9s" }}>
        <Award className="w-6 h-6 text-rose-300" />
      </div>
    </div>
  );
};
export default FloatingBackgroundElements;
