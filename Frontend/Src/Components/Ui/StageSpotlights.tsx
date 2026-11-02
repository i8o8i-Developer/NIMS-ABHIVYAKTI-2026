import React from "react";

export const StageSpotlights: React.FC = () => {
  return (
    <div className="absolute top-0 inset-x-0 h-full pointer-events-none select-none overflow-hidden z-0">
      {/* =========================================================================
          THEATRICAL STAGE SPOTLIGHT 1: LEFT OVERHEAD BEAM (Angled Down-Right)
          ========================================================================= */}
      <div
        className="absolute -top-4 left-[10%] sm:left-[16%] 2xl:left-[20%] w-72 sm:w-96 h-[32rem] sm:h-[42rem] pointer-events-none opacity-60 mix-blend-screen transform rotate-[14deg] origin-top animate-pulse"
        style={{ animationDuration: "8s" }}
      >
        {/* Lamp Fixture Source Lens */}
        <div className="w-14 h-3.5 mx-auto rounded-full bg-gradient-to-r from-amber-600 via-amber-200 to-amber-600 shadow-[0_0_20px_#F5B842] blur-[1px]" />
        {/* Tapered Light Cone */}
        <svg className="w-full h-full -mt-1" viewBox="0 0 400 700" preserveAspectRatio="none">
          <defs>
            <linearGradient id="stageSpotlightLeft" x1="50%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.32" />
              <stop offset="25%" stopColor="#F5B842" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#D97706" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#881337" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="175,0 225,0 390,700 30,700" fill="url(#stageSpotlightLeft)" />
        </svg>
      </div>

      {/* =========================================================================
          THEATRICAL STAGE SPOTLIGHT 2: CENTER OVERHEAD BEAM (Straight Down-Center)
          ========================================================================= */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-80 sm:w-[32rem] h-[34rem] sm:h-[44rem] pointer-events-none opacity-70 mix-blend-screen origin-top animate-pulse"
        style={{ animationDuration: "6s" }}
      >
        {/* Lamp Fixture Source Lens */}
        <div className="w-18 h-4 mx-auto rounded-full bg-gradient-to-r from-amber-600 via-yellow-100 to-amber-600 shadow-[0_0_25px_#F5B842] blur-[1px]" />
        {/* Tapered Light Cone */}
        <svg className="w-full h-full -mt-1" viewBox="0 0 400 700" preserveAspectRatio="none">
          <defs>
            <linearGradient id="stageSpotlightCenter" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.35" />
              <stop offset="30%" stopColor="#F5B842" stopOpacity="0.20" />
              <stop offset="65%" stopColor="#D97706" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#881337" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="160,0 240,0 395,700 5,700" fill="url(#stageSpotlightCenter)" />
        </svg>
      </div>

      {/* =========================================================================
          THEATRICAL STAGE SPOTLIGHT 3: RIGHT OVERHEAD BEAM (Angled Down-Left)
          ========================================================================= */}
      <div
        className="absolute -top-4 right-[10%] sm:right-[16%] 2xl:right-[20%] w-72 sm:w-96 h-[32rem] sm:h-[42rem] pointer-events-none opacity-60 mix-blend-screen transform -rotate-[14deg] origin-top animate-pulse"
        style={{ animationDuration: "9s" }}
      >
        {/* Lamp Fixture Source Lens */}
        <div className="w-14 h-3.5 mx-auto rounded-full bg-gradient-to-r from-amber-600 via-amber-200 to-amber-600 shadow-[0_0_20px_#F5B842] blur-[1px]" />
        {/* Tapered Light Cone */}
        <svg className="w-full h-full -mt-1" viewBox="0 0 400 700" preserveAspectRatio="none">
          <defs>
            <linearGradient id="stageSpotlightRight" x1="50%" y1="0%" x2="30%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.32" />
              <stop offset="25%" stopColor="#F5B842" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#D97706" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#881337" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="175,0 225,0 370,700 10,700" fill="url(#stageSpotlightRight)" />
        </svg>
      </div>
    </div>
  );
};

export default StageSpotlights;
