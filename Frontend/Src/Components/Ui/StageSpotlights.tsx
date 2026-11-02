import React from "react";

export const StageSpotlights: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      {/* Soft Theatrical Wine-Crimson Ambient Stage Depth */}
      <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_50%_18%,_rgba(100,12,38,0.35)_0%,_rgba(45,6,17,0.20)_45%,_transparent_75%)] blur-2xl pointer-events-none" />

      {/* =========================================================================
          THEATRICAL STAGE SPOTLIGHT 1: LEFT OVERHEAD BEAM (Angled Down-Right)
          ========================================================================= */}
      <div
        className="absolute -top-4 left-[6%] sm:left-[12%] 2xl:left-[16%] w-72 sm:w-[26rem] 2xl:w-[30rem] h-[36rem] sm:h-[46rem] pointer-events-none opacity-75 mix-blend-screen transform rotate-[18deg] origin-top animate-pulse"
        style={{ animationDuration: "8s" }}
      >
        {/* Lamp Fixture Source Lens */}
        <div className="w-16 h-3.5 mx-auto rounded-full bg-gradient-to-r from-amber-600 via-yellow-200 to-amber-600 shadow-[0_0_25px_#F5B842] blur-[1px]" />
        {/* Tapered Light Cone */}
        <svg className="w-full h-full -mt-1 filter drop-shadow-[0_0_20px_rgba(245,184,66,0.3)]" viewBox="0 0 400 700" preserveAspectRatio="none">
          <defs>
            <linearGradient id="stageSpotlightLeft" x1="50%" y1="0%" x2="70%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.45" />
              <stop offset="20%" stopColor="#F5B842" stopOpacity="0.28" />
              <stop offset="55%" stopColor="#D97706" stopOpacity="0.12" />
              <stop offset="80%" stopColor="#881337" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#220308" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="170,0 230,0 395,700 25,700" fill="url(#stageSpotlightLeft)" />
        </svg>
      </div>

      {/* =========================================================================
          THEATRICAL STAGE SPOTLIGHT 2: CENTER OVERHEAD BEAM (Vertical Center)
          ========================================================================= */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-80 sm:w-[34rem] 2xl:w-[40rem] h-[38rem] sm:h-[48rem] pointer-events-none opacity-85 mix-blend-screen origin-top animate-pulse"
        style={{ animationDuration: "6s" }}
      >
        {/* Lamp Fixture Source Lens */}
        <div className="w-20 h-4 mx-auto rounded-full bg-gradient-to-r from-amber-600 via-yellow-100 to-amber-600 shadow-[0_0_30px_#FDE047] blur-[1px]" />
        {/* Tapered Light Cone */}
        <svg className="w-full h-full -mt-1 filter drop-shadow-[0_0_25px_rgba(245,184,66,0.35)]" viewBox="0 0 400 700" preserveAspectRatio="none">
          <defs>
            <linearGradient id="stageSpotlightCenter" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.50" />
              <stop offset="25%" stopColor="#FACC15" stopOpacity="0.30" />
              <stop offset="60%" stopColor="#D97706" stopOpacity="0.12" />
              <stop offset="85%" stopColor="#881337" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#220308" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="155,0 245,0 395,700 5,700" fill="url(#stageSpotlightCenter)" />
        </svg>
      </div>

      {/* =========================================================================
          THEATRICAL STAGE SPOTLIGHT 3: RIGHT OVERHEAD BEAM (Angled Down-Left)
          ========================================================================= */}
      <div
        className="absolute -top-4 right-[6%] sm:right-[12%] 2xl:right-[16%] w-72 sm:w-[26rem] 2xl:w-[30rem] h-[36rem] sm:h-[46rem] pointer-events-none opacity-75 mix-blend-screen transform -rotate-[18deg] origin-top animate-pulse"
        style={{ animationDuration: "9s" }}
      >
        {/* Lamp Fixture Source Lens */}
        <div className="w-16 h-3.5 mx-auto rounded-full bg-gradient-to-r from-amber-600 via-yellow-200 to-amber-600 shadow-[0_0_25px_#F5B842] blur-[1px]" />
        {/* Tapered Light Cone */}
        <svg className="w-full h-full -mt-1 filter drop-shadow-[0_0_20px_rgba(245,184,66,0.3)]" viewBox="0 0 400 700" preserveAspectRatio="none">
          <defs>
            <linearGradient id="stageSpotlightRight" x1="50%" y1="0%" x2="30%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.45" />
              <stop offset="20%" stopColor="#F5B842" stopOpacity="0.28" />
              <stop offset="55%" stopColor="#D97706" stopOpacity="0.12" />
              <stop offset="80%" stopColor="#881337" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#220308" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="170,0 230,0 375,700 5,700" fill="url(#stageSpotlightRight)" />
        </svg>
      </div>

      {/* =========================================================================
          GENTLE FLOATING GOLDEN PETALS & EMBERS (As Seen In Reference Image)
          Drifting Down Across The Reddish Stage Beams
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Golden Petal 1 */}
        <div className="absolute top-[20%] left-[18%] opacity-70 animate-live-sparkle" style={{ animationDuration: "6s" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 16 7 16 12C16 17 12 22 12 22C12 22 8 17 8 12C8 7 12 2 12 2Z" fill="#FACC15" />
          </svg>
        </div>
        {/* Golden Petal 2 */}
        <div className="absolute top-[32%] right-[22%] opacity-65 animate-live-sparkle" style={{ animationDelay: "2s", animationDuration: "7s" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 16 7 16 12C16 17 12 22 12 22C12 22 8 17 8 12C8 7 12 2 12 2Z" fill="#F5B842" />
          </svg>
        </div>
        {/* Golden Petal 3 */}
        <div className="absolute top-[50%] left-[28%] opacity-60 animate-live-sparkle" style={{ animationDelay: "3.5s", animationDuration: "6.5s" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 16 7 16 12C16 17 12 22 12 22C12 22 8 17 8 12C8 7 12 2 12 2Z" fill="#FDE047" />
          </svg>
        </div>
        {/* Golden Petal 4 */}
        <div className="absolute top-[42%] right-[32%] opacity-60 animate-live-sparkle" style={{ animationDelay: "1s", animationDuration: "8s" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 16 7 16 12C16 17 12 22 12 22C12 22 8 17 8 12C8 7 12 2 12 2Z" fill="#D97706" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StageSpotlights;
