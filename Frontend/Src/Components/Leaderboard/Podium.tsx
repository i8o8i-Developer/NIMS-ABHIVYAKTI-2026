import React from "react";
import { Trophy } from "lucide-react";

export interface LeaderboardCollege {
  rank: number;
  college_id: number;
  college_name: string;
  college_code: string;
  city: string;
  avatar_color: string;
  total_points: number;
  gold_medals: number;
  silver_medals: number;
  bronze_medals: number;
  events_participated: number;
}

interface PodiumProps {
  topThree?: LeaderboardCollege[];
}

export const DEFAULT_TOP_THREE: LeaderboardCollege[] = [
  {
    rank: 1,
    college_id: 2,
    college_name: "NIMS Institute Of Engineering & Technology",
    college_code: "NIET",
    city: "Jaipur",
    avatar_color: "#1E293B",
    total_points: 320,
    gold_medals: 1,
    silver_medals: 2,
    bronze_medals: 2,
    events_participated: 5,
  },
  {
    rank: 2,
    college_id: 1,
    college_name: "National Institute Of Medical Sciences",
    college_code: "NIMSR",
    city: "Jaipur",
    avatar_color: "#881337",
    total_points: 240,
    gold_medals: 1,
    silver_medals: 2,
    bronze_medals: 0,
    events_participated: 3,
  },
  {
    rank: 3,
    college_id: 4,
    college_name: "NIMS Law School",
    college_code: "NLS",
    city: "Jaipur",
    avatar_color: "#312E81",
    total_points: 180,
    gold_medals: 1,
    silver_medals: 0,
    bronze_medals: 2,
    events_participated: 3,
  },
];

export const Podium: React.FC<PodiumProps> = ({ topThree }) => {
  const data = topThree && topThree.length >= 3 ? topThree : DEFAULT_TOP_THREE;

  const first = data[0];
  const second = data[1];
  const third = data[2];

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-8 select-none">
      {/* =========================================================================
          ARCHITECTURAL THREE-TIER CHAMPIONSHIP PODIUM
          Matte Physical Dais With Realistic Solid Finishes & Zero Neon Edge Lighting
          ========================================================================= */}
      <div className="relative pt-6 sm:pt-10">
        {/* Subtle Ambient Vignette Behind The Dais (Zero Neon Halo) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-40 bg-[radial-gradient(ellipse_at_bottom,_rgba(136,19,55,0.08)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

        {/* The 3 Connected Physical Podium Steps */}
        <div className="grid grid-cols-3 items-end gap-2 sm:gap-4 max-w-4xl mx-auto relative z-10">
          {/* =========================================================
              2ND PLACE: STERLING SILVER PEDESTAL (Left Tier)
              Matte Brushed Steel, No Neon Outline
              ========================================================= */}
          {second && (
            <div className="flex flex-col items-center">
              {/* Faculty Crest Medallion */}
              <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center">
                {/* Physical Silver Crest */}
                <div className="relative group">
                  <div className="w-16 sm:w-22 h-16 sm:h-22 rounded-full bg-gradient-to-br from-slate-600 via-slate-700 to-slate-900 p-[2px] shadow-md border border-slate-600/30 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#111827] via-[#0b0f19] to-[#05070c] border border-slate-700/50 flex flex-col items-center justify-center p-1">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Faculty
                      </span>
                      <span className="font-serif font-black text-sm sm:text-lg text-slate-200 tracking-wider">
                        {second.college_code.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                  {/* Silver Medal Ribbon Tag */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#1e2533] border border-slate-600/40 text-slate-200 text-[10px] font-bold uppercase tracking-wider shadow whitespace-nowrap">
                    2nd Place
                  </div>
                </div>

                {/* College Name & Scoreboard */}
                <div className="mt-4 px-1 w-full">
                  <h4 className="text-xs sm:text-sm font-serif font-black text-white leading-tight min-h-[2.4rem] flex items-center justify-center">
                    {second.college_name}
                  </h4>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0e1422] border border-slate-700/50">
                    <span className="text-xs sm:text-sm font-mono font-black text-slate-300">
                      {second.total_points} PTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Physical Silver Step Riser (Matte, Non-Lighting Edges) */}
              <div className="w-full">
                {/* Solid Brushed Steel Landing Platform Top */}
                <div className="h-3.5 sm:h-4 rounded-t-lg bg-gradient-to-r from-[#1e2533] via-[#334155] to-[#1e2533] border-t border-slate-600/30" />
                {/* Riser Face */}
                <div className="h-32 sm:h-44 bg-gradient-to-b from-[#111827] via-[#0b0f19] to-[#05070c] border-x border-b border-slate-700/40 p-3 sm:p-4 flex flex-col items-center justify-between shadow-xl relative overflow-hidden">
                  <div className="w-full text-center">
                    <span className="font-serif font-black text-4xl sm:text-6xl text-slate-300 tracking-wider">
                      II
                    </span>
                  </div>
                  {/* Medal Matrix */}
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold text-slate-300 bg-slate-950/90 px-2.5 py-1 rounded-md border border-slate-700/40">
                    <span>🥇 {second.gold_medals}</span>
                    <span>🥈 {second.silver_medals}</span>
                    <span>🥉 {second.bronze_medals}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              1ST PLACE: CHAMPIONS GOLD PEDESTAL (Center Tier)
              Matte Dark Brass / Gold, Zero Neon Glow On Edges
              ========================================================= */}
          {first && (
            <div className="flex flex-col items-center -translate-y-4 sm:-translate-y-6 z-20">
              {/* Grand Trophy & Gold Crest Medallion */}
              <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center">
                {/* Sculpted Trophy (Clean, No Glowing Neon Halo) */}
                <div className="mb-2 relative">
                  <div className="p-2.5 rounded-2xl bg-[#1e0e07] border border-amber-700/40 shadow-md">
                    <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
                  </div>
                </div>

                {/* Physical Gold Crest */}
                <div className="relative group">
                  <div className="w-20 sm:w-26 h-20 sm:h-26 rounded-full bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 p-[2.5px] shadow-md border border-amber-600/30 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1c0409] via-[#120206] to-[#070002] border border-amber-700/40 flex flex-col items-center justify-center p-1">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                        Champion
                      </span>
                      <span className="font-serif font-black text-base sm:text-2xl text-amber-200 tracking-wider">
                        {first.college_code.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                  {/* Gold Champion Ribbon Tag */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#2a1306] border border-amber-600/50 text-amber-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow whitespace-nowrap">
                    1st Gold Champion
                  </div>
                </div>

                {/* College Name & Scoreboard */}
                <div className="mt-4 px-1 w-full">
                  <h4 className="text-xs sm:text-base font-serif font-black text-amber-100 leading-tight min-h-[2.4rem] flex items-center justify-center">
                    {first.college_name}
                  </h4>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#1a0409] border border-amber-700/50 shadow-md">
                    <span className="text-sm sm:text-lg font-serif font-black text-amber-300">
                      {first.total_points} PTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Physical Gold Step Riser (Grand Height, Matte Solid Finishes) */}
              <div className="w-full">
                {/* Solid Dark Brass Landing Platform Top */}
                <div className="h-4 sm:h-5 rounded-t-lg bg-gradient-to-r from-[#381e0e] via-[#4d2d14] to-[#381e0e] border-t border-amber-700/40" />
                {/* Riser Face */}
                <div className="h-44 sm:h-60 bg-gradient-to-b from-[#24040b] via-[#140206] to-[#0a0103] border-x border-b border-amber-800/40 p-3 sm:p-5 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
                  <div className="w-full text-center">
                    <span className="font-serif font-black text-5xl sm:text-7xl text-amber-400 tracking-wider">
                      I
                    </span>
                  </div>
                  {/* Medal Matrix */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300 bg-[#160307] px-3 py-1.5 rounded-lg border border-amber-700/40">
                    <span>🥇 {first.gold_medals}</span>
                    <span>🥈 {first.silver_medals}</span>
                    <span>🥉 {first.bronze_medals}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              3RD PLACE: ANTIQUE BRONZE PEDESTAL (Right Tier)
              Matte Antique Bronze, Zero Neon Glow
              ========================================================= */}
          {third && (
            <div className="flex flex-col items-center">
              {/* Faculty Crest Medallion */}
              <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center">
                {/* Physical Bronze Crest */}
                <div className="relative group">
                  <div className="w-16 sm:w-22 h-16 sm:h-22 rounded-full bg-gradient-to-br from-amber-800 via-amber-900 to-[#1c0803] p-[2px] shadow-md border border-amber-800/30 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#140602] via-[#0d0301] to-[#040100] border border-amber-900/40 flex flex-col items-center justify-center p-1">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
                        Faculty
                      </span>
                      <span className="font-serif font-black text-sm sm:text-lg text-amber-300 tracking-wider">
                        {third.college_code.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                  {/* Bronze Medal Ribbon Tag */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#200c04] border border-amber-800/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider shadow whitespace-nowrap">
                    3rd Place
                  </div>
                </div>

                {/* College Name & Scoreboard */}
                <div className="mt-4 px-1 w-full">
                  <h4 className="text-xs sm:text-sm font-serif font-black text-white leading-tight min-h-[2.4rem] flex items-center justify-center">
                    {third.college_name}
                  </h4>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#140501] border border-amber-900/40">
                    <span className="text-xs sm:text-sm font-mono font-black text-amber-400">
                      {third.total_points} PTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Physical Bronze Step Riser (Matte, Non-Lighting Edges) */}
              <div className="w-full">
                {/* Solid Antique Bronze Landing Platform Top */}
                <div className="h-3.5 sm:h-4 rounded-t-lg bg-gradient-to-r from-[#220d05] via-[#331508] to-[#220d05] border-t border-amber-800/30" />
                {/* Riser Face */}
                <div className="h-28 sm:h-38 bg-gradient-to-b from-[#180702] via-[#0f0401] to-[#060200] border-x border-b border-amber-900/40 p-3 sm:p-4 flex flex-col items-center justify-between shadow-xl relative overflow-hidden">
                  <div className="w-full text-center">
                    <span className="font-serif font-black text-4xl sm:text-6xl text-amber-600 tracking-wider">
                      III
                    </span>
                  </div>
                  {/* Medal Matrix */}
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold text-amber-300 bg-[#0c0401] px-2.5 py-1 rounded-md border border-amber-900/30">
                    <span>🥇 {third.gold_medals}</span>
                    <span>🥈 {third.silver_medals}</span>
                    <span>🥉 {third.bronze_medals}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            MONOLITHIC STAGE PLINTH BASE
            Solid Architectural Anchor With Clean Non-Illuminated Edge
            ========================================================================= */}
        <div className="max-w-4xl mx-auto -mt-0.5 relative z-30">
          {/* Solid Architectural Base Trim (Zero Neon Light Strip) */}
          <div className="h-2 rounded-t bg-gradient-to-r from-[#1c0f08] via-[#2c180e] to-[#1c0f08] border-t border-amber-900/40" />

          {/* Foundation Plinth Base */}
          <div className="py-3 px-6 rounded-b-2xl bg-gradient-to-b from-[#120205] to-[#070002] border-b border-x border-amber-900/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-xl">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-serif font-black text-amber-200 tracking-wider uppercase">
                Official Championship Podium • 2026 Inter-College Championship
              </span>
            </div>
            <p className="text-[11px] text-rose-300/80 font-mono">
              Scores Calculated In Real-Time Across All 22 Official Competitions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podium;
