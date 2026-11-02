import React from "react";
import { Sparkles } from "lucide-react";

export const HeroCulturalElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10">
      {/* =========================================================================
          QUADRANT 1: TOP-LEFT HERO ZONE (Circled In Red In User Image 1)
          Classical Theatrical Natya & Kathakali Drama Masks With Ornate Crown & Ribbons
          Positioned In The Open Space Between Left Badges & Center Abhivyakti Logo
          ========================================================================= */}
      <div className="hidden lg:flex flex-col items-center absolute top-[11%] lg:top-[12%] 2xl:top-[13%] left-[17%] lg:left-[19%] xl:left-[21%] 2xl:left-[23%] pointer-events-none z-10 animate-live-sway">
        {/* Glow Halo */}
        <div className="absolute -inset-4 bg-gradient-to-r from-rose-600/20 via-amber-500/20 to-transparent blur-2xl rounded-full pointer-events-none" />

        {/* Detailed Theatrical Masks SVG Container */}
        <div className="relative p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-[#180307]/95 via-[#0f0104]/95 to-[#080002]/98 border border-rose-500/40 shadow-2xl shadow-rose-950/70 backdrop-blur-md flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
          <svg
            width="78"
            height="72"
            viewBox="0 0 100 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_4px_12px_rgba(244,63,94,0.45)]"
          >
            <defs>
              {/* Gold Mask Gradient */}
              <linearGradient id="goldMaskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="35%" stopColor="#FACC15" />
                <stop offset="70%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              {/* Ruby Tragedy Mask Gradient */}
              <linearGradient id="rubyMaskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="40%" stopColor="#E11D48" />
                <stop offset="75%" stopColor="#9F1239" />
                <stop offset="100%" stopColor="#4C0519" />
              </linearGradient>
              {/* Crown Jewels Gradient */}
              <linearGradient id="jewelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Floating Silk Ribbons (Left Mask) */}
            <path
              d="M18 52 C10 60 8 72 14 80 C18 84 22 80 20 74 C18 68 22 62 25 58"
              stroke="#FACC15"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            {/* Floating Silk Ribbons (Right Mask) */}
            <path
              d="M82 52 C90 60 92 72 86 80 C82 84 78 80 80 74 C82 68 78 62 75 58"
              stroke="#FB7185"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />

            {/* MASK 2 (Left / Background): Expressive Ruby Mask (Tragedy / Natya Mudra) */}
            <g transform="translate(4, 8) rotate(-12 35 45)">
              {/* Kathakali / Theatrical Headdress Crown */}
              <path
                d="M24 16 L35 4 L46 16 L42 22 L28 22 Z"
                fill="url(#goldMaskGrad)"
                stroke="#78350F"
                strokeWidth="1"
              />
              <circle cx="35" cy="14" r="3" fill="url(#jewelGrad)" />
              {/* Face Contour */}
              <path
                d="M20 22 C14 26 14 50 22 62 C28 70 42 70 48 62 C56 50 56 26 50 22 Z"
                fill="url(#rubyMaskGrad)"
                stroke="#F43F5E"
                strokeWidth="1.2"
              />
              {/* Ornate Cheek Paint Patterns */}
              <path
                d="M22 36 C26 38 28 44 26 50"
                stroke="#FEF08A"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M48 36 C44 38 42 44 44 50"
                stroke="#FEF08A"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Arched Eyes */}
              <path
                d="M25 32 Q30 28 34 33"
                stroke="#FEF9C3"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M36 33 Q40 28 45 32"
                stroke="#FEF9C3"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Expressive Contoured Mouth */}
              <path
                d="M29 52 Q35 47 41 52"
                stroke="#FEF08A"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* MASK 1 (Right / Foreground): Regal Golden Mask (Comedy / Rangmanch) */}
            <g transform="translate(26, 4) rotate(8 50 45)">
              {/* Grand Multi-Tiered Kathakali Crown (Kireedam) */}
              <path
                d="M32 14 L42 2 L48 6 L54 2 L64 14 L58 20 L38 20 Z"
                fill="url(#goldMaskGrad)"
                stroke="#92400E"
                strokeWidth="1"
              />
              <circle cx="48" cy="12" r="3.5" fill="#E11D48" />
              <circle cx="38" cy="15" r="2" fill="url(#jewelGrad)" />
              <circle cx="58" cy="15" r="2" fill="url(#jewelGrad)" />
              {/* Face Contour */}
              <path
                d="M34 20 C27 25 27 52 36 64 C42 72 56 72 62 64 C71 52 71 25 64 20 Z"
                fill="url(#goldMaskGrad)"
                stroke="#FEF08A"
                strokeWidth="1.5"
              />
              {/* Classical Indian Bindi & Tilak */}
              <path d="M48 24 L49.5 28 L46.5 28 Z" fill="#DC2626" />
              <circle cx="48" cy="30" r="1.5" fill="#DC2626" />
              {/* Expressive Almond Eyes */}
              <path
                d="M38 34 Q43 29 46 34 Q43 38 38 34 Z"
                fill="#180307"
                stroke="#FEF08A"
                strokeWidth="0.8"
              />
              <circle cx="42" cy="33.5" r="1.2" fill="#FEF9C3" />
              <path
                d="M50 34 Q53 29 58 34 Q53 38 50 34 Z"
                fill="#180307"
                stroke="#FEF08A"
                strokeWidth="0.8"
              />
              <circle cx="54" cy="33.5" r="1.2" fill="#FEF9C3" />
              {/* Joyous Classical Smile */}
              <path
                d="M41 49 Q48 56 55 49 Q48 53 41 49 Z"
                fill="#991B1B"
                stroke="#FEF08A"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>

        {/* Ornate Label Pill */}
        <div className="mt-2 px-3 py-1 rounded-full bg-[#120205]/95 border border-amber-500/40 shadow-lg flex items-center gap-1.5 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] 2xl:text-[11px] font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">
            Natya & Rangmanch
          </span>
        </div>
      </div>

      {/* =========================================================================
          QUADRANT 2: TOP-RIGHT HERO ZONE (Circled In Red In User Image 1)
          Classical Indian Musical Sitar / Veena Ensemble With Flute & Golden Swaras
          Positioned In The Open Space Between Center Abhivyakti Logo & Right Badges
          ========================================================================= */}
      <div className="hidden lg:flex flex-col items-center absolute top-[11%] lg:top-[12%] 2xl:top-[13%] right-[17%] lg:right-[19%] xl:right-[21%] 2xl:right-[23%] pointer-events-none z-10 animate-live-sway" style={{ animationDelay: "1.2s" }}>
        {/* Glow Halo */}
        <div className="absolute -inset-4 bg-gradient-to-l from-amber-500/20 via-yellow-500/20 to-transparent blur-2xl rounded-full pointer-events-none" />

        {/* Detailed Sitar & Flute SVG Container */}
        <div className="relative p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-[#180307]/95 via-[#0f0104]/95 to-[#080002]/98 border border-amber-500/40 shadow-2xl shadow-amber-950/70 backdrop-blur-md flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
          <svg
            width="78"
            height="72"
            viewBox="0 0 100 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_4px_12px_rgba(245,184,66,0.45)]"
          >
            <defs>
              <linearGradient id="sitarGourdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="50%" stopColor="#92400E" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
              <linearGradient id="fluteGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
              <linearGradient id="stringGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEF9C3" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>

            {/* Floating Swara / Musical Notes */}
            <g className="animate-live-twinkle">
              <text x="12" y="24" fill="#FDE047" fontSize="13" fontFamily="serif" fontWeight="bold" opacity="0.85">♪</text>
              <text x="76" y="22" fill="#FACC15" fontSize="15" fontFamily="serif" fontWeight="bold" opacity="0.9">♫</text>
              <text x="84" y="44" fill="#FEF08A" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.75">♩</text>
            </g>

            {/* CLASSICAL SITAR / VEENA (Angled Across) */}
            <g transform="translate(18, 10) rotate(32 35 35)">
              {/* Pegbox / Headstock (Peacock Carved Scroll) */}
              <path
                d="M12 6 C10 2 16 0 18 4 C20 8 16 10 14 10 Z"
                fill="#F59E0B"
                stroke="#78350F"
                strokeWidth="1"
              />
              {/* Tuning Pegs (Kunti) */}
              <line x1="8" y1="5" x2="18" y2="5" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="8" y1="9" x2="18" y2="9" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="14" y1="2" x2="14" y2="12" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" />

              {/* Long Dandi (Fingerboard Neck) */}
              <rect x="13" y="10" width="5" height="46" rx="1.5" fill="#78350F" stroke="#F59E0B" strokeWidth="0.8" />
              {/* Curved Brass Frets (Pardas) */}
              <line x1="12" y1="18" x2="19" y2="18" stroke="#FEF08A" strokeWidth="1" />
              <line x1="12" y1="26" x2="19" y2="26" stroke="#FEF08A" strokeWidth="1" />
              <line x1="12" y1="34" x2="19" y2="34" stroke="#FEF08A" strokeWidth="1" />
              <line x1="12" y1="42" x2="19" y2="42" stroke="#FEF08A" strokeWidth="1" />
              <line x1="12" y1="50" x2="19" y2="50" stroke="#FEF08A" strokeWidth="1" />

              {/* Resonating Gourd (Kaddu / Kudam) */}
              <ellipse cx="15.5" cy="62" rx="14" ry="12" fill="url(#sitarGourdGrad)" stroke="#F59E0B" strokeWidth="1.2" />
              {/* Gourd Inlay Rosette / Tabli Ornament */}
              <ellipse cx="15.5" cy="60" rx="7" ry="5.5" fill="#451A03" stroke="#FEF08A" strokeWidth="0.8" />
              <circle cx="15.5" cy="60" r="2.5" fill="#DC2626" />

              {/* Ivory Bridge (Javari) */}
              <rect x="13" y="56" width="5" height="2" rx="0.5" fill="#FEF9C3" />
              {/* Golden Sitar Strings */}
              <line x1="14" y1="7" x2="14" y2="66" stroke="url(#stringGrad)" strokeWidth="0.8" />
              <line x1="15.5" y1="7" x2="15.5" y2="66" stroke="url(#stringGrad)" strokeWidth="0.8" />
              <line x1="17" y1="7" x2="17" y2="66" stroke="url(#stringGrad)" strokeWidth="0.8" />
            </g>

            {/* CLASSICAL INDIAN BANSURI (Bamboo Flute Crossing Under Sitar) */}
            <g transform="translate(10, 48) rotate(-24 40 10)">
              {/* Flute Body */}
              <rect x="0" y="8" width="62" height="4.5" rx="2" fill="url(#fluteGrad)" stroke="#78350F" strokeWidth="0.8" />
              {/* Red Silk Thread Bindings */}
              <line x1="8" y1="8" x2="8" y2="12.5" stroke="#DC2626" strokeWidth="1.5" />
              <line x1="12" y1="8" x2="12" y2="12.5" stroke="#DC2626" strokeWidth="1.5" />
              <line x1="52" y1="8" x2="52" y2="12.5" stroke="#DC2626" strokeWidth="1.5" />
              {/* Blowhole & Fingerholes */}
              <circle cx="16" cy="10.25" r="1.2" fill="#180307" />
              <circle cx="26" cy="10.25" r="1" fill="#180307" />
              <circle cx="32" cy="10.25" r="1" fill="#180307" />
              <circle cx="38" cy="10.25" r="1" fill="#180307" />
              <circle cx="44" cy="10.25" r="1" fill="#180307" />
              {/* Floating Silk Tassel */}
              <path d="M58 10 Q64 14 62 20 Q60 22 58 24" stroke="#DC2626" strokeWidth="1.2" fill="none" />
            </g>
          </svg>
        </div>

        {/* Ornate Label Pill */}
        <div className="mt-2 px-3 py-1 rounded-full bg-[#120205]/95 border border-amber-500/40 shadow-lg flex items-center gap-1.5 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] 2xl:text-[11px] font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">
            Sangeet & Swara
          </span>
        </div>
      </div>

      {/* =========================================================================
          QUADRANT 3: BOTTOM-LEFT HERO ZONE (Circled In Red In User Image 1)
          Classical Indian Dance (Kathak / Nataraja Mudra) & Sacred Festive Brass Diya
          Positioned In The Wide Open Area Below The 3 Left Badges & Left Of Timer
          ========================================================================= */}
      <div className="hidden lg:flex flex-col items-center absolute bottom-[6%] lg:bottom-[7%] 2xl:bottom-[8%] left-[4%] lg:left-[6%] xl:left-[8%] 2xl:left-[10%] pointer-events-none z-10 animate-live-sway" style={{ animationDelay: "1.8s" }}>
        {/* Glow Halo */}
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-rose-600/15 to-transparent blur-2xl rounded-full pointer-events-none" />

        {/* Dance Mudra & Sacred Diya SVG Container */}
        <div className="relative p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-[#180307]/95 via-[#0f0104]/95 to-[#080002]/98 border border-amber-500/40 shadow-2xl shadow-rose-950/70 backdrop-blur-md flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
          <svg
            width="82"
            height="74"
            viewBox="0 0 110 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_4px_14px_rgba(245,184,66,0.5)]"
          >
            <defs>
              <linearGradient id="dancerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="45%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
              <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEF9C3" />
                <stop offset="35%" stopColor="#FDE047" />
                <stop offset="70%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
              <linearGradient id="diyaBrassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="40%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
            </defs>

            {/* CLASSICAL DANCER SILHOUETTE (Left Side Of Plinth) */}
            <g transform="translate(6, 4)">
              {/* Radiant Halo / Mandala Arch */}
              <circle cx="28" cy="28" r="22" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

              {/* Head & Classical Headdress (Juda / Mogra) */}
              <circle cx="28" cy="14" r="5" fill="url(#dancerGrad)" />
              <path d="M28 8 C32 8 35 11 34 15 C31 15 28 12 28 8 Z" fill="#DC2626" />

              {/* Graceful Torso in Tribhanga Mudra */}
              <path
                d="M26 19 C23 23 23 31 28 35 C32 31 34 23 30 19 Z"
                fill="url(#dancerGrad)"
              />
              {/* Extended Mudra Arm 1 (Raised) */}
              <path
                d="M28 20 C23 16 16 14 11 18 C14 20 18 20 25 24"
                stroke="url(#dancerGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Extended Mudra Arm 2 (Crossed) */}
              <path
                d="M29 22 C35 24 43 23 46 27 C43 29 37 27 28 27"
                stroke="url(#dancerGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Flowing Pleated Classical Dance Costume (Saree / Dhoti Fan) */}
              <path
                d="M28 35 L16 52 C22 56 34 56 40 52 Z"
                fill="#DC2626"
                stroke="#FACC15"
                strokeWidth="1.2"
              />
              {/* Golden Pleat Radii */}
              <line x1="28" y1="35" x2="22" y2="54" stroke="#FEF08A" strokeWidth="1" />
              <line x1="28" y1="35" x2="28" y2="55" stroke="#FEF08A" strokeWidth="1" />
              <line x1="28" y1="35" x2="34" y2="54" stroke="#FEF08A" strokeWidth="1" />

              {/* Ghungroo Bells (Anklets) */}
              <circle cx="20" cy="54" r="1.5" fill="#FEF08A" />
              <circle cx="23" cy="55" r="1.5" fill="#FEF08A" />
              <circle cx="33" cy="55" r="1.5" fill="#FEF08A" />
              <circle cx="36" cy="54" r="1.5" fill="#FEF08A" />
            </g>

            {/* TRADITIONAL SACRED BRASS DIYA (Right Side With Radiant Flame) */}
            <g transform="translate(56, 18)" className="animate-live-flicker">
              {/* Dancing Diya Flame */}
              <path
                d="M24 2 C24 2 31 11 31 18 C31 23 27.5 26 24 26 C20.5 26 17 23 17 18 C17 11 24 2 24 2Z"
                fill="url(#flameGrad)"
              />
              <path
                d="M24 7 C24 7 28 13 28 18 C28 21 26 23 24 23 C22 23 20 21 20 18 C20 13 24 7 24 7Z"
                fill="#FFFFFF"
                opacity="0.8"
              />

              {/* Ornate Brass Lamp Bowl */}
              <path
                d="M4 22 C8 34 18 39 24 39 C30 39 40 34 44 22 C36 27 29 28 24 28 C19 28 12 27 4 22Z"
                fill="url(#diyaBrassGrad)"
                stroke="#FEF08A"
                strokeWidth="1"
              />
              {/* Engraved Lamp Rim */}
              <path
                d="M8 23 C14 27 19 28 24 28 C29 28 34 27 40 23 C36 30 30 35 24 35 C18 35 12 30 8 23Z"
                fill="#92400E"
              />
              {/* Ornate Tiered Base Stand */}
              <path d="M21 39 L27 39 L29 46 L19 46 Z" fill="url(#diyaBrassGrad)" />
              <rect x="15" y="46" width="18" height="4" rx="2" fill="url(#diyaBrassGrad)" stroke="#78350F" strokeWidth="0.8" />
            </g>
          </svg>
        </div>

        {/* Ornate Label Pill */}
        <div className="mt-2 px-3 py-1 rounded-full bg-[#120205]/95 border border-amber-500/40 shadow-lg flex items-center gap-1.5 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] 2xl:text-[11px] font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">
            Nritya & Mudra
          </span>
        </div>
      </div>

      {/* =========================================================================
          QUADRANT 4: BOTTOM-RIGHT HERO ZONE (Circled In Red In User Image 1)
          Cultural Championship Rolling Trophy, Golden Laurels & Visual Arts Palette
          Positioned In The Wide Open Area Below The 3 Right Badges & Right Of CTAs
          ========================================================================= */}
      <div className="hidden lg:flex flex-col items-center absolute bottom-[6%] lg:bottom-[7%] 2xl:bottom-[8%] right-[4%] lg:right-[6%] xl:right-[8%] 2xl:right-[10%] pointer-events-none z-10 animate-live-sway" style={{ animationDelay: "2.4s" }}>
        {/* Glow Halo */}
        <div className="absolute -inset-4 bg-gradient-to-l from-amber-500/20 via-yellow-500/15 to-transparent blur-2xl rounded-full pointer-events-none" />

        {/* Trophy & Arts Palette SVG Container */}
        <div className="relative p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-[#180307]/95 via-[#0f0104]/95 to-[#080002]/98 border border-amber-500/40 shadow-2xl shadow-amber-950/70 backdrop-blur-md flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
          <svg
            width="82"
            height="74"
            viewBox="0 0 110 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_4px_14px_rgba(245,184,66,0.55)]"
          >
            <defs>
              <linearGradient id="trophyCupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF9C3" />
                <stop offset="35%" stopColor="#FACC15" />
                <stop offset="75%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <linearGradient id="paletteWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="50%" stopColor="#92400E" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
            </defs>

            {/* ARTIST'S FINE ART PALETTE (Tilted Behind Trophy) */}
            <g transform="translate(6, 12) rotate(-16 35 35)">
              {/* Palette Wood Body */}
              <path
                d="M14 26 C12 12 28 6 42 10 C56 14 62 26 58 40 C54 52 42 56 30 54 C24 53 18 58 14 54 C10 50 16 38 14 26 Z"
                fill="url(#paletteWoodGrad)"
                stroke="#FDE68A"
                strokeWidth="1.2"
              />
              {/* Thumb Hole */}
              <ellipse cx="22" cy="48" rx="4" ry="5" fill="#140206" stroke="#FEF08A" strokeWidth="0.8" />

              {/* Vibrant Cultural Paint Daubs */}
              <circle cx="22" cy="18" r="3" fill="#E11D48" /> {/* Sindoor Ruby */}
              <circle cx="32" cy="15" r="3" fill="#FACC15" /> {/* Haldi Gold */}
              <circle cx="42" cy="18" r="3" fill="#10B981" /> {/* Emerald Jade */}
              <circle cx="50" cy="26" r="3" fill="#3B82F6" /> {/* Neelam Sapphire */}
              <circle cx="52" cy="36" r="3" fill="#A855F7" /> {/* Royal Amethyst */}

              {/* Crossed Paintbrushes */}
              <line x1="8" y1="58" x2="48" y2="8" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
              <polygon points="46,10 52,4 50,14" fill="#E11D48" />
              <line x1="14" y1="62" x2="56" y2="16" stroke="#FEF9C3" strokeWidth="1.8" strokeLinecap="round" />
              <polygon points="54,18 60,12 58,22" fill="#FACC15" />
            </g>

            {/* OFFICIAL ABHIVYAKTI ROLLING CHAMPIONSHIP TROPHY (Foreground) */}
            <g transform="translate(44, 8)">
              {/* Victory Laurel Wreath Surrounding Trophy */}
              <g stroke="#FACC15" strokeWidth="1.2" fill="#FDE68A" opacity="0.8">
                {/* Left Laurel Branch */}
                <path d="M6 34 C4 24 8 16 14 10" stroke="#FACC15" fill="none" />
                <ellipse cx="6" cy="30" rx="3" ry="1.5" transform="rotate(-30 6 30)" />
                <ellipse cx="8" cy="22" rx="3" ry="1.5" transform="rotate(-20 8 22)" />
                <ellipse cx="12" cy="14" rx="3" ry="1.5" transform="rotate(-10 12 14)" />
                {/* Right Laurel Branch */}
                <path d="M46 34 C48 24 44 16 38 10" stroke="#FACC15" fill="none" />
                <ellipse cx="46" cy="30" rx="3" ry="1.5" transform="rotate(30 46 30)" />
                <ellipse cx="44" cy="22" rx="3" ry="1.5" transform="rotate(20 44 22)" />
                <ellipse cx="40" cy="14" rx="3" ry="1.5" transform="rotate(10 40 14)" />
              </g>

              {/* Sculpted Trophy Handles */}
              <path
                d="M17 16 C9 16 9 32 18 36"
                stroke="url(#trophyCupGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M35 16 C43 16 43 32 34 36"
                stroke="url(#trophyCupGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Grand Goblet / Cup Body */}
              <path
                d="M16 12 L36 12 L34 32 C34 40 18 40 18 32 Z"
                fill="url(#trophyCupGrad)"
                stroke="#FEF9C3"
                strokeWidth="1.2"
              />
              {/* Crown Emblem On Trophy Face */}
              <path d="M22 20 L26 16 L29 22 L23 22 Z" fill="#78350F" />
              <circle cx="26" cy="24" r="2.5" fill="#DC2626" />

              {/* Sculpted Stem & Node */}
              <rect x="24.5" y="38" width="3" height="10" fill="url(#trophyCupGrad)" />
              <ellipse cx="26" cy="42" rx="4" ry="2" fill="#FEF08A" />

              {/* Solid Tiered Marble / Brass Plinth Base */}
              <path d="M19 48 L33 48 L36 58 L16 58 Z" fill="url(#trophyCupGrad)" stroke="#78350F" strokeWidth="1" />
              <rect x="13" y="58" width="26" height="5" rx="1.5" fill="#451A03" stroke="#FEF08A" strokeWidth="1" />
              {/* Plinth Gold Plaque */}
              <rect x="17" y="59.5" width="18" height="2" fill="#FEF9C3" />
            </g>
          </svg>
        </div>

        {/* Ornate Label Pill */}
        <div className="mt-2 px-3 py-1 rounded-full bg-[#120205]/95 border border-amber-500/40 shadow-lg flex items-center gap-1.5 backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] 2xl:text-[11px] font-black tracking-wider text-amber-200 uppercase whitespace-nowrap">
            Kala & Vijayi
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroCulturalElements;

