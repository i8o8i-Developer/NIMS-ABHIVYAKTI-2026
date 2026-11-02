import React from "react";

export const FloatingBackgroundElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Center Spotlight Ray */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[550px] bg-radial from-festival-gold-500/10 via-festival-crimson-600/15 to-transparent blur-3xl opacity-80" />

      {/* Left Ambient Spotlight */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-festival-crimson-600/15 rounded-full blur-3xl" />

      {/* Right Ambient Spotlight */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-festival-gold-500/10 rounded-full blur-3xl" />

      {/* Floating Golden Embers & Star Points */}
      <div className="absolute top-16 left-[15%] w-1.5 h-1.5 rounded-full bg-festival-gold-400/60 shadow-[0_0_8px_#F5B842] animate-float-slow" />
      <div className="absolute top-36 right-[20%] w-2 h-2 rounded-full bg-festival-gold-300/50 shadow-[0_0_10px_#F5B842] animate-pulse" />
      <div className="absolute top-72 left-[25%] w-1 h-1 rounded-full bg-festival-cream-100/60 animate-float-slow" />
      <div className="absolute top-96 right-[12%] w-1.5 h-1.5 rounded-full bg-festival-gold-500/40 animate-pulse" />
    </div>
  );
};
