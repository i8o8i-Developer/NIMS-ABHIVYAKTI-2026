import React from "react";
import { Sparkles, Trophy, Flame, Music, Award } from "lucide-react";

export const FloatingBackgroundElements: React.FC = () => {
  return (
    <div className="absolute inset-x-0 top-0 h-[720px] sm:h-[800px] overflow-hidden pointer-events-none z-0 select-none">
      {/* Deep Blackish Vignette & Mask Overlays */}
      <div className="absolute inset-0 bg-[#050002]/80 mix-blend-multiply" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050002] via-[#050002]/90 to-transparent z-10" />

      {/* Primary Center Golden Radial Glow Behind Logo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-[32rem] h-48 sm:h-[22rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,184,66,0.16)_0%,_rgba(136,19,55,0.18)_45%,_rgba(5,0,2,0)_75%)] blur-2xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(245,184,66,0.05)_0%,_transparent_60%)]" />

      {/* Dramatic Dual Diagonal Stage Spotlight Beams */}
      <div className="absolute -top-20 -left-16 w-56 sm:w-80 h-96 sm:h-[48rem] rotate-[30deg] origin-top-left bg-gradient-to-b from-amber-400/20 via-rose-700/12 to-transparent blur-3xl animate-spotlight-sweep" />
      <div className="absolute -top-20 -right-16 w-56 sm:w-80 h-96 sm:h-[48rem] -rotate-[30deg] origin-top-right bg-gradient-to-b from-amber-400/20 via-rose-700/12 to-transparent blur-3xl animate-spotlight-sweep" style={{ animationDelay: "3s" }} />

      {/* Compact Subtle Ambient Glowing Orbs */}
      <div className="absolute top-10 left-6 sm:left-14 w-40 sm:w-56 h-40 sm:h-56 rounded-full bg-rose-950/30 blur-2xl animate-live-float-slow" />
      <div className="absolute top-36 right-6 sm:right-14 w-44 sm:w-60 h-44 sm:h-60 rounded-full bg-amber-950/25 blur-2xl animate-live-float-reverse" />
      <div className="absolute top-72 right-1/4 w-32 h-32 rounded-full bg-yellow-600/10 blur-xl animate-live-pulse-glow" />

      {/* Small Refined Celestial Rings (Scaled Down Delicate Astrolabe Watermarks) */}
      {/* Right Side Small Celestial Rings */}
      <div className="absolute top-10 -right-8 sm:-right-10 w-36 sm:w-48 h-36 sm:h-48 rounded-full opacity-[0.22] border-[1.5px] sm:border-2 border-dashed border-amber-400/50 animate-live-spin-slow" />
      <div className="absolute top-16 -right-2 sm:-right-4 w-24 sm:w-32 h-24 sm:h-32 rounded-full opacity-[0.16] border border-dotted border-rose-400/40 animate-live-spin-slow" style={{ animationDirection: "reverse" }} />

      {/* Left Side Small Celestial Rings */}
      <div className="absolute top-24 -left-8 sm:-left-10 w-32 sm:w-44 h-32 sm:h-44 rounded-full opacity-[0.20] border-[1.5px] sm:border-2 border-dotted border-rose-400/50 animate-live-spin-slow" style={{ animationDirection: "reverse" }} />
      <div className="absolute top-32 -left-2 sm:-left-4 w-20 sm:w-28 h-20 sm:h-28 rounded-full opacity-[0.15] border border-dashed border-amber-400/40 animate-live-spin-slow" />

      {/* Rising Golden Embers (Strictly Confined to Upper Canvas - Never in Footer) */}
      <div className="absolute inset-0 overflow-hidden">
        <span className="absolute left-[8%] top-[65%] w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_8px_#F5B842] animate-live-sparkle" style={{ animationDelay: "0s", animationDuration: "5.5s" }} />
        <span className="absolute left-[20%] top-[70%] w-1.5 h-1.5 rounded-full bg-yellow-300/80 shadow-[0_0_10px_#FDE047] animate-live-sparkle" style={{ animationDelay: "1.2s", animationDuration: "6.8s" }} />
        <span className="absolute left-[32%] top-[60%] w-1.5 h-1.5 rounded-full bg-rose-400/70 shadow-[0_0_8px_#FB7185] animate-live-sparkle" style={{ animationDelay: "2.6s", animationDuration: "5.2s" }} />
        <span className="absolute left-[45%] top-[75%] w-2 h-2 rounded-full bg-amber-300/80 shadow-[0_0_10px_#F5B842] animate-live-sparkle" style={{ animationDelay: "0.5s", animationDuration: "7.1s" }} />
        <span className="absolute left-[58%] top-[68%] w-1.5 h-1.5 rounded-full bg-yellow-200/80 shadow-[0_0_8px_#FEF08A] animate-live-sparkle" style={{ animationDelay: "3.2s", animationDuration: "6.3s" }} />
        <span className="absolute left-[70%] top-[72%] w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_10px_#F5B842] animate-live-sparkle" style={{ animationDelay: "1.8s", animationDuration: "8.0s" }} />
        <span className="absolute left-[82%] top-[62%] w-1.5 h-1.5 rounded-full bg-rose-400/70 shadow-[0_0_8px_#FB7185] animate-live-sparkle" style={{ animationDelay: "2.9s", animationDuration: "5.8s" }} />
        <span className="absolute left-[92%] top-[66%] w-1.5 h-1.5 rounded-full bg-yellow-300/80 shadow-[0_0_10px_#FDE047] animate-live-sparkle" style={{ animationDelay: "0.9s", animationDuration: "6.6s" }} />
      </div>

      {/* Subtle Twinkling Diamond Stars In Hero Zone */}
      <div className="absolute top-[14%] left-[16%] w-1.5 h-1.5 rounded-full bg-amber-300/80 shadow-[0_0_8px_#F5B842] animate-live-twinkle" style={{ animationDelay: "0.3s" }} />
      <div className="absolute top-[22%] right-[18%] w-1.5 h-1.5 rounded-full bg-yellow-200/80 shadow-[0_0_8px_#FEF08A] animate-live-twinkle" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[48%] left-[9%] w-1.5 h-1.5 rounded-full bg-amber-400/80 shadow-[0_0_8px_#F5B842] animate-live-twinkle" style={{ animationDelay: "0.9s" }} />
      <div className="absolute top-[52%] right-[12%] w-2 h-2 rounded-full bg-rose-300/70 shadow-[0_0_10px_#FDA4AF] animate-live-twinkle" style={{ animationDelay: "2.2s" }} />

      {/* Floating Cultural Motifs (Upper Viewport Only) */}
      <div className="absolute top-20 left-[12%] opacity-20 animate-live-drift-diag" style={{ animationDelay: "0s" }}>
        <Sparkles className="w-5 h-5 text-amber-400" />
      </div>
      <div className="absolute top-32 right-[14%] opacity-20 animate-live-drift-diag" style={{ animationDelay: "2.5s" }}>
        <Flame className="w-5 h-5 text-rose-400" />
      </div>
      <div className="absolute top-56 left-[8%] opacity-15 animate-live-drift-diag" style={{ animationDelay: "1.2s" }}>
        <Trophy className="w-5 h-5 text-amber-500" />
      </div>
      <div className="absolute top-64 right-[8%] opacity-20 animate-live-drift-diag" style={{ animationDelay: "3.8s" }}>
        <Music className="w-5 h-5 text-yellow-400" />
      </div>
      <div className="absolute top-44 left-[4%] opacity-15 animate-live-drift-diag" style={{ animationDelay: "1.9s" }}>
        <Award className="w-5 h-5 text-rose-300" />
      </div>
    </div>
  );
};
export default FloatingBackgroundElements;
