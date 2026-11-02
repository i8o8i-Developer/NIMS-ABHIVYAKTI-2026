import React from "react";
import { Sparkles, Trophy, Flame, Music, Award, Star } from "lucide-react";

export const FloatingBackgroundElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Deep Blackish Vignette & Ambient Radial Mask Overlays */}
      <div className="absolute inset-0 bg-[#050002]/75 mix-blend-multiply" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/85 to-transparent z-10" />

      {/* Bottom Left & Bottom Right Theatrical Ambient Corner Glow Masks */}
      <div className="absolute -bottom-28 -left-28 w-[28rem] sm:w-[38rem] h-[28rem] sm:h-[38rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(136,19,55,0.36)_0%,_rgba(190,18,60,0.18)_40%,_rgba(255,255,255,0.06)_60%,_transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -right-28 w-[28rem] sm:w-[38rem] h-[28rem] sm:h-[38rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,184,66,0.32)_0%,_rgba(180,83,9,0.18)_40%,_rgba(255,255,255,0.06)_60%,_transparent_75%)] blur-3xl pointer-events-none" />

      {/* Primary Center Golden Radial Glow Behind Logo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[42rem] h-60 sm:h-[28rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_rgba(245,184,66,0.24)_35%,_rgba(136,19,55,0.25)_65%,_transparent_80%)] blur-2xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(245,184,66,0.07)_0%,_transparent_65%)]" />

      {/* Dramatic Dual Diagonal Stage Spotlight Beams */}
      <div className="absolute -top-24 -left-20 w-72 sm:w-96 h-[40rem] sm:h-[55rem] rotate-[32deg] origin-top-left bg-gradient-to-b from-white/18 via-amber-400/22 to-transparent blur-3xl animate-spotlight-sweep" />
      <div className="absolute -top-24 -right-20 w-72 sm:w-96 h-[40rem] sm:h-[55rem] -rotate-[32deg] origin-top-right bg-gradient-to-b from-white/18 via-amber-400/22 to-transparent blur-3xl animate-spotlight-sweep" style={{ animationDelay: "3.5s" }} />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-16 left-8 sm:left-20 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-rose-950/40 blur-2xl animate-live-float-slow" />
      <div className="absolute top-44 right-8 sm:right-20 w-52 sm:w-72 h-52 sm:h-72 rounded-full bg-amber-950/35 blur-2xl animate-live-float-reverse" />
      <div className="absolute top-96 left-1/4 w-36 h-36 rounded-full bg-yellow-500/10 blur-xl animate-live-pulse-glow" />

      {/* Top Right Astrolabe Celestial Rings */}
      <div className="absolute top-8 -right-10 sm:-right-14 w-44 sm:w-60 h-44 sm:h-60 rounded-full opacity-[0.25] border-2 border-dashed border-amber-400/60 animate-live-spin-slow" />
      <div className="absolute top-14 -right-4 sm:-right-8 w-32 sm:w-44 h-32 sm:h-44 rounded-full opacity-[0.20] border border-dotted border-rose-400/50 animate-live-spin-slow" style={{ animationDirection: "reverse" }} />

      {/* Top Left Astrolabe Celestial Rings */}
      <div className="absolute top-16 -left-10 sm:-left-14 w-40 sm:w-56 h-40 sm:h-56 rounded-full opacity-[0.24] border-2 border-dotted border-rose-400/60 animate-live-spin-slow" style={{ animationDirection: "reverse" }} />
      <div className="absolute top-24 -left-4 sm:-left-8 w-28 sm:w-40 h-28 sm:h-40 rounded-full opacity-[0.18] border border-dashed border-amber-400/50 animate-live-spin-slow" />

      {/* Bottom Right Theatrical Astrolabe Arcs */}
      <div className="absolute -bottom-12 -right-12 w-64 sm:w-80 h-64 sm:h-80 rounded-full opacity-[0.28] border-2 border-dashed border-amber-400/60 animate-live-spin-slow pointer-events-none" />
      <div className="absolute bottom-4 -right-4 w-48 sm:w-60 h-48 sm:h-60 rounded-full opacity-[0.22] border border-dotted border-rose-400/50 animate-live-spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} />

      {/* Bottom Left Theatrical Astrolabe Arcs */}
      <div className="absolute -bottom-12 -left-12 w-64 sm:w-80 h-64 sm:h-80 rounded-full opacity-[0.26] border-2 border-dotted border-rose-400/60 animate-live-spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} />
      <div className="absolute bottom-4 -left-4 w-48 sm:w-60 h-48 sm:h-60 rounded-full opacity-[0.20] border border-dashed border-amber-400/50 animate-live-spin-slow pointer-events-none" />

      {/* Rising Golden & Pure White Embers Across Canvas */}
      <div className="absolute inset-0 overflow-hidden">
        <span className="absolute left-[6%] top-[25%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] animate-live-sparkle" style={{ animationDelay: "0s", animationDuration: "5.5s" }} />
        <span className="absolute left-[14%] top-[70%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_12px_#FDE047] animate-live-sparkle" style={{ animationDelay: "1.2s", animationDuration: "6.8s" }} />
        <span className="absolute left-[26%] top-[45%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] animate-live-sparkle" style={{ animationDelay: "2.6s", animationDuration: "5.2s" }} />
        <span className="absolute left-[40%] top-[80%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_#F5B842] animate-live-sparkle" style={{ animationDelay: "0.5s", animationDuration: "7.1s" }} />
        <span className="absolute left-[54%] top-[60%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] animate-live-sparkle" style={{ animationDelay: "3.2s", animationDuration: "6.3s" }} />
        <span className="absolute left-[68%] top-[75%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_12px_#FDE047] animate-live-sparkle" style={{ animationDelay: "1.8s", animationDuration: "8.0s" }} />
        <span className="absolute left-[80%] top-[35%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] animate-live-sparkle" style={{ animationDelay: "2.9s", animationDuration: "5.8s" }} />
        <span className="absolute left-[92%] top-[68%] w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_12px_#FDE047] animate-live-sparkle" style={{ animationDelay: "0.9s", animationDuration: "6.6s" }} />
      </div>

      {/* Brilliant Twinkling Diamond Stars */}
      <div className="absolute top-[12%] left-[14%] w-2 h-2 rounded-full bg-white shadow-[0_0_14px_#FFFFFF] animate-live-twinkle" style={{ animationDelay: "0.3s" }} />
      <div className="absolute top-[20%] right-[16%] w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_10px_#FEF08A] animate-live-twinkle" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[48%] left-[7%] w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#FFFFFF] animate-live-twinkle" style={{ animationDelay: "0.9s" }} />
      <div className="absolute top-[55%] right-[10%] w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_12px_#F5B842] animate-live-twinkle" style={{ animationDelay: "2.2s" }} />
      <div className="absolute bottom-28 left-[18%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#FFFFFF] animate-live-twinkle" style={{ animationDelay: "1.7s" }} />
      <div className="absolute bottom-32 right-[20%] w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_#F5B842] animate-live-twinkle" style={{ animationDelay: "2.5s" }} />

      {/* Floating Cultural Motifs with Gentle Ambient Motion */}
      <div className="absolute top-20 left-[11%] opacity-25 animate-live-drift-diag" style={{ animationDelay: "0s" }}>
        <Sparkles className="w-5 h-5 text-amber-300" />
      </div>
      <div className="absolute top-36 right-[12%] opacity-25 animate-live-drift-diag" style={{ animationDelay: "2.5s" }}>
        <Flame className="w-5 h-5 text-rose-400" />
      </div>
      <div className="absolute bottom-36 left-[8%] opacity-20 animate-live-drift-diag" style={{ animationDelay: "1.2s" }}>
        <Trophy className="w-5 h-5 text-amber-400" />
      </div>
      <div className="absolute bottom-40 right-[8%] opacity-25 animate-live-drift-diag" style={{ animationDelay: "3.8s" }}>
        <Music className="w-5 h-5 text-yellow-300" />
      </div>
      <div className="absolute top-1/2 left-[4%] opacity-20 animate-live-drift-diag" style={{ animationDelay: "1.9s" }}>
        <Award className="w-5 h-5 text-rose-300" />
      </div>
    </div>
  );
};
export default FloatingBackgroundElements;
