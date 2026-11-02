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
      <div className="absolute inset-0 bg-[#050002]/75 mix-blend-multiply" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/85 to-transparent z-10" />

      {/* Bottom Left & Bottom Right Theatrical Ambient Corner Glow Masks */}
      <div className="absolute -bottom-28 -left-28 w-[28rem] sm:w-[40rem] h-[28rem] sm:h-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(136,19,55,0.40)_0%,_rgba(190,18,60,0.20)_40%,_rgba(255,255,255,0.06)_60%,_transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -right-28 w-[28rem] sm:w-[40rem] h-[28rem] sm:h-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(245,184,66,0.36)_0%,_rgba(180,83,9,0.20)_40%,_rgba(255,255,255,0.06)_60%,_transparent_75%)] blur-3xl pointer-events-none" />

      {/* Primary Center Golden Radial Glow Behind Logo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[44rem] h-60 sm:h-[30rem] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.16)_0%,_rgba(245,184,66,0.26)_35%,_rgba(136,19,55,0.26)_65%,_transparent_80%)] blur-2xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(245,184,66,0.08)_0%,_transparent_65%)]" />

      {/* Dramatic Dual Diagonal Stage Spotlight Beams */}
      <div className="absolute -top-24 -left-20 w-72 sm:w-96 h-[40rem] sm:h-[55rem] rotate-[32deg] origin-top-left bg-gradient-to-b from-white/20 via-amber-400/24 to-transparent blur-3xl animate-spotlight-sweep" />
      <div className="absolute -top-24 -right-20 w-72 sm:w-96 h-[40rem] sm:h-[55rem] -rotate-[32deg] origin-top-right bg-gradient-to-b from-white/20 via-amber-400/24 to-transparent blur-3xl animate-spotlight-sweep" style={{ animationDelay: "3.5s" }} />

      {/* Top Right Astrolabe Celestial Rings */}
      <div className="absolute top-8 -right-10 sm:-right-14 w-44 sm:w-60 h-44 sm:h-60 rounded-full opacity-[0.28] border-2 border-dashed border-amber-400/60 animate-live-spin-slow" />
      <div className="absolute top-14 -right-4 sm:-right-8 w-32 sm:w-44 h-32 sm:h-44 rounded-full opacity-[0.22] border border-dotted border-rose-400/50 animate-live-spin-slow" style={{ animationDirection: "reverse" }} />

      {/* Top Left Astrolabe Celestial Rings */}
      <div className="absolute top-16 -left-10 sm:-left-14 w-40 sm:w-56 h-40 sm:h-56 rounded-full opacity-[0.26] border-2 border-dotted border-rose-400/60 animate-live-spin-slow" style={{ animationDirection: "reverse" }} />
      <div className="absolute top-24 -left-4 sm:-left-8 w-28 sm:w-40 h-28 sm:h-40 rounded-full opacity-[0.20] border border-dashed border-amber-400/50 animate-live-spin-slow" />

      {/* Bottom Right Theatrical Astrolabe Arcs */}
      <div className="absolute -bottom-12 -right-12 w-64 sm:w-84 h-64 sm:h-84 rounded-full opacity-[0.30] border-2 border-dashed border-amber-400/60 animate-live-spin-slow pointer-events-none" />
      <div className="absolute bottom-4 -right-4 w-48 sm:w-64 h-48 sm:h-64 rounded-full opacity-[0.24] border border-dotted border-rose-400/50 animate-live-spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} />

      {/* Bottom Left Theatrical Astrolabe Arcs */}
      <div className="absolute -bottom-12 -left-12 w-64 sm:w-84 h-64 sm:h-84 rounded-full opacity-[0.28] border-2 border-dotted border-rose-400/60 animate-live-spin-slow pointer-events-none" style={{ animationDirection: "reverse" }} />
      <div className="absolute bottom-4 -left-4 w-48 sm:w-64 h-48 sm:h-64 rounded-full opacity-[0.22] border border-dashed border-amber-400/50 animate-live-spin-slow pointer-events-none" />

      {/* Traditional Glowing Diyas (Festive Oil Lamps With Golden Flickering Flames) */}
      {/* Diya 1: Bottom-Left Foreground Radiance */}
      <div className="absolute bottom-16 left-[5%] opacity-40 animate-live-flicker">
        <svg width="44" height="34" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glowing Flame */}
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
          <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FFFBEB" />
          {/* Diya Clay Bowl */}
          <path d="M4 18C4 18 10 28 22 28C34 28 40 18 40 18C40 18 36 21 22 21C8 21 4 18 4 18Z" fill="#B45309" stroke="#F5B842" strokeWidth="1.5" />
          <ellipse cx="22" cy="28" rx="8" ry="3" fill="#78350F" />
        </svg>
      </div>

      {/* Diya 2: Bottom-Right Foreground Radiance */}
      <div className="absolute bottom-16 right-[5%] opacity-40 animate-live-flicker" style={{ animationDelay: "1.2s" }}>
        <svg width="44" height="34" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glowing Flame */}
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
          <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FFFBEB" />
          {/* Diya Clay Bowl */}
          <path d="M4 18C4 18 10 28 22 28C34 28 40 18 40 18C40 18 36 21 22 21C8 21 4 18 4 18Z" fill="#B45309" stroke="#F5B842" strokeWidth="1.5" />
          <ellipse cx="22" cy="28" rx="8" ry="3" fill="#78350F" />
        </svg>
      </div>

      {/* Diya 3: Mid-Upper Subtle Radiance */}
      <div className="absolute top-28 left-[22%] opacity-25 animate-live-flicker" style={{ animationDelay: "2.1s" }}>
        <svg width="32" height="26" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
          <path d="M4 18C4 18 10 28 22 28C34 28 40 18 40 18C40 18 36 21 22 21C8 21 4 18 4 18Z" fill="#B45309" stroke="#F5B842" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Festive Golden Leaves & Floral Garland Petals (RangRush & Traditional Decor) */}
      <div className="absolute top-14 left-[8%] opacity-30 animate-live-leaf" style={{ animationDelay: "0.5s" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5B842" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>

      <div className="absolute top-20 right-[10%] opacity-30 animate-live-leaf" style={{ animationDelay: "3.2s" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>

      <div className="absolute bottom-32 left-[14%] opacity-25 animate-live-leaf" style={{ animationDelay: "1.8s" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5B842" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        </svg>
      </div>

      {/* Theatrical Drama Masks (SoloFlix Mono Act & Act-O-Graphy Skit) */}
      <div className="absolute top-24 left-[15%] opacity-30 animate-live-sway" style={{ animationDelay: "0.8s" }}>
        <Theater className="w-8 h-8 text-amber-300 drop-shadow-[0_0_16px_rgba(245,184,66,0.6)]" />
      </div>
      <div className="absolute bottom-40 right-[14%] opacity-30 animate-live-sway" style={{ animationDelay: "2.4s" }}>
        <Theater className="w-8 h-8 text-rose-300 drop-shadow-[0_0_16px_rgba(244,63,94,0.6)]" />
      </div>

      {/* Singing & Vocal Motifs (Harmony Hustle – Solo, Duet, Rap & Group) */}
      <div className="absolute top-40 right-[18%] opacity-30 animate-live-drift-diag" style={{ animationDelay: "1.4s" }}>
        <Mic className="w-7 h-7 text-amber-300 drop-shadow-[0_0_14px_rgba(245,184,66,0.6)]" />
      </div>
      <div className="absolute bottom-52 left-[10%] opacity-28 animate-live-drift-diag" style={{ animationDelay: "3.6s" }}>
        <Music className="w-7 h-7 text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.6)]" />
      </div>

      {/* Dance & Pirouette Spark (Groove-o-Mania) */}
      <div className="absolute top-64 left-[7%] opacity-25 animate-live-drift-diag" style={{ animationDelay: "2.2s" }}>
        <Sparkles className="w-7 h-7 text-amber-300 drop-shadow-[0_0_14px_rgba(245,184,66,0.6)]" />
      </div>

      {/* Sports & Stadium Motifs (University Cricket Ground Grand Finale & Championship) */}
      <div className="absolute bottom-28 right-[24%] opacity-30 animate-live-sway" style={{ animationDelay: "1.6s" }}>
        <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_16px_rgba(250,204,21,0.6)]" />
      </div>
      <div className="absolute top-72 right-[8%] opacity-30 animate-live-flicker" style={{ animationDelay: "2.8s" }}>
        <Flame className="w-7 h-7 text-rose-400 drop-shadow-[0_0_14px_rgba(244,63,94,0.6)]" />
      </div>

      {/* Literature & Spoken Word (Alfaaz Unplugged Poetry, Clash of Takes Debate, Lit Check Quiz, Spellbound) */}
      <div className="absolute top-52 left-[20%] opacity-25 animate-live-leaf" style={{ animationDelay: "1.1s" }}>
        <Feather className="w-7 h-7 text-rose-300 drop-shadow-[0_0_12px_rgba(251,113,133,0.6)]" />
      </div>
      <div className="absolute bottom-60 right-[12%] opacity-25 animate-live-sway" style={{ animationDelay: "3.1s" }}>
        <BookOpen className="w-7 h-7 text-amber-200 drop-shadow-[0_0_12px_rgba(253,230,138,0.6)]" />
      </div>

      {/* Fine Arts, Rangoli & Face Painting (RangRush, Inked Expressions, ScribbleSquad) */}
      <div className="absolute top-36 left-[3%] opacity-25 animate-live-drift-diag" style={{ animationDelay: "0.4s" }}>
        <Palette className="w-7 h-7 text-amber-400 drop-shadow-[0_0_12px_rgba(245,184,66,0.6)]" />
      </div>

      {/* Fashion Show & Couture (Couture Clique & ReThread Fashion Upcycling) */}
      <div className="absolute bottom-44 left-[18%] opacity-25 animate-live-drift-diag" style={{ animationDelay: "2.7s" }}>
        <Shirt className="w-7 h-7 text-purple-300 drop-shadow-[0_0_12px_rgba(192,132,252,0.6)]" />
      </div>

      {/* AI Art & Digital Creativity (BOT-Brush AI Art Generation) */}
      <div className="absolute top-60 right-[22%] opacity-22 animate-live-sparkle" style={{ animationDelay: "1.9s" }}>
        <Bot className="w-7 h-7 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
      </div>

      {/* Film Reel & Photography (Reel-ity Check Reel Making & Pixel Tales Photo Story) */}
      <div className="absolute bottom-20 left-[26%] opacity-22 animate-live-drift-diag" style={{ animationDelay: "3.4s" }}>
        <Film className="w-7 h-7 text-yellow-200 drop-shadow-[0_0_12px_rgba(254,240,138,0.6)]" />
      </div>

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
    </div>
  );
};
export default FloatingBackgroundElements;
