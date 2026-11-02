import React from "react";
import { Trophy, Award, Sparkles, Medal } from "lucide-react";

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
          Sculpted Physical Dais With Realistic Metallic Finishes & Stage Depth
          ========================================================================= */}
      <div className="relative pt-6 sm:pt-10">
        {/* Ambient Stage Uplight Glow Behind The Dais */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-48 bg-[radial-gradient(ellipse_at_bottom,_rgba(245,184,66,0.25)_0%,_rgba(136,19,55,0.18)_45%,_transparent_75%)] blur-2xl pointer-events-none" />

        {/* The 3 Connected Physical Podium Steps */}
        <div className="grid grid-cols-3 items-end gap-2 sm:gap-4 max-w-4xl mx-auto relative z-10">
          {/* =========================================================
              2ND PLACE: STERLING SILVER PEDESTAL (Left Tier)
              ========================================================= */}
          {second && (
            <div className="flex flex-col items-center">
              {/* Faculty Crest Medallion */}
              <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center">
                {/* Physical Silver Crest */}
                <div className="relative group">
                  <div className="w-16 sm:w-22 h-16 sm:h-22 rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-700 p-[3px] shadow-[0_8px_25px_rgba(203,213,225,0.35)] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#030712] border-2 border-slate-300/60 flex flex-col items-center justify-center p-1">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                        Faculty
                      </span>
                      <span className="font-serif font-black text-sm sm:text-lg text-slate-100 tracking-wider">
                        {second.college_code.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                  {/* Silver Medal Ribbon Tag */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 text-black text-[10px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                    2nd Place
                  </div>
                </div>

                {/* College Name & Scoreboard */}
                <div className="mt-4 px-1 w-full">
                  <h4 className="text-xs sm:text-sm font-serif font-black text-white leading-tight min-h-[2.4rem] flex items-center justify-center">
                    {second.college_name}
                  </h4>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0e1422] border border-slate-400/40 shadow-inner">
                    <span className="text-xs sm:text-sm font-mono font-black text-slate-200">
                      {second.total_points} PTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Physical Silver Step Riser */}
              <div className="w-full">
                {/* 3D Chamfered Landing Platform Top */}
                <div className="h-4 sm:h-5 rounded-t-xl bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 shadow-md border-t border-white/60" />
                {/* Riser Face */}
                <div className="h-32 sm:h-44 bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#060a12] border-x-2 border-b-2 border-slate-400/50 p-3 sm:p-4 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
                  <div className="w-full text-center">
                    <span className="font-serif font-black text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                      II
                    </span>
                  </div>
                  {/* Medal Matrix */}
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-600/40">
                    <span>🥇 {second.gold_medals}</span>
                    <span>🥈 {second.silver_medals}</span>
                    <span>🥉 {second.bronze_medals}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              1ST PLACE: 24K CHAMPIONS GOLD PEDESTAL (Center Tier)
              ========================================================= */}
          {first && (
            <div className="flex flex-col items-center -translate-y-4 sm:-translate-y-6 z-20">
              {/* Grand Trophy & Gold Crest Medallion */}
              <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center">
                {/* Floating Sculpted Gold Cup Trophy */}
                <div className="mb-2 relative">
                  <div className="p-2 rounded-2xl bg-amber-500/20 border border-amber-400/60 shadow-[0_0_30px_rgba(245,184,66,0.6)]">
                    <Trophy className="w-8 h-8 sm:w-11 sm:h-11 text-amber-300 filter drop-shadow-[0_2px_12px_#F5B842]" />
                  </div>
                </div>

                {/* Physical Gold Crest */}
                <div className="relative group">
                  <div className="w-20 sm:w-26 h-20 sm:h-26 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-700 p-[3.5px] shadow-[0_10px_35px_rgba(245,184,66,0.5)] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#2a060e] via-[#160205] to-[#070002] border-2 border-amber-400 flex flex-col items-center justify-center p-1">
                      <span className="text-[10px] sm:text-xs font-mono font-black text-amber-400 uppercase tracking-widest">
                        Champion
                      </span>
                      <span className="font-serif font-black text-base sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-400 tracking-wider">
                        {first.college_code.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                  {/* Gold Champion Ribbon Tag */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 text-black text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-lg whitespace-nowrap">
                    1st Gold Champion
                  </div>
                </div>

                {/* College Name & Scoreboard */}
                <div className="mt-4 px-1 w-full">
                  <h4 className="text-xs sm:text-base font-serif font-black text-amber-100 leading-tight min-h-[2.4rem] flex items-center justify-center">
                    {first.college_name}
                  </h4>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-950 via-[#26050e] to-amber-950 border border-amber-400/80 shadow-lg shadow-amber-950/60">
                    <span className="text-sm sm:text-lg font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-400">
                      {first.total_points} PTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Physical Gold Step Riser (Grand Height) */}
              <div className="w-full">
                {/* 3D Chamfered Landing Platform Top */}
                <div className="h-5 sm:h-6 rounded-t-xl bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 shadow-lg border-t-2 border-yellow-100" />
                {/* Riser Face */}
                <div className="h-44 sm:h-60 bg-gradient-to-b from-[#3a0814] via-[#200308] to-[#0c0104] border-x-2 border-b-2 border-amber-400/80 p-3 sm:p-5 flex flex-col items-center justify-between shadow-[0_0_50px_rgba(245,184,66,0.3)] relative overflow-hidden">
                  <div className="w-full text-center">
                    <span className="font-serif font-black text-5xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_4px_16px_rgba(245,184,66,0.6)]">
                      I
                    </span>
                  </div>
                  {/* Medal Matrix */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300 bg-[#160307] px-3 py-1.5 rounded-lg border border-amber-500/50 shadow-inner">
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
              ========================================================= */}
          {third && (
            <div className="flex flex-col items-center">
              {/* Faculty Crest Medallion */}
              <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center">
                {/* Physical Bronze Crest */}
                <div className="relative group">
                  <div className="w-16 sm:w-22 h-16 sm:h-22 rounded-full bg-gradient-to-br from-amber-600 via-amber-800 to-amber-950 p-[3px] shadow-[0_8px_25px_rgba(180,83,9,0.35)] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1c0803] via-[#100401] to-[#040100] border-2 border-amber-700/60 flex flex-col items-center justify-center p-1">
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-600 uppercase tracking-widest">
                        Faculty
                      </span>
                      <span className="font-serif font-black text-sm sm:text-lg text-amber-200 tracking-wider">
                        {third.college_code.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                  {/* Bronze Medal Ribbon Tag */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800 text-white text-[10px] font-black uppercase tracking-wider shadow-md whitespace-nowrap">
                    3rd Place
                  </div>
                </div>

                {/* College Name & Scoreboard */}
                <div className="mt-4 px-1 w-full">
                  <h4 className="text-xs sm:text-sm font-serif font-black text-white leading-tight min-h-[2.4rem] flex items-center justify-center">
                    {third.college_name}
                  </h4>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1a0803] border border-amber-700/50 shadow-inner">
                    <span className="text-xs sm:text-sm font-mono font-black text-amber-300">
                      {third.total_points} PTS
                    </span>
                  </div>
                </div>
              </div>

              {/* Physical Bronze Step Riser */}
              <div className="w-full">
                {/* 3D Chamfered Landing Platform Top */}
                <div className="h-4 sm:h-5 rounded-t-xl bg-gradient-to-r from-amber-600 via-amber-400 to-amber-800 shadow-md border-t border-amber-300/40" />
                {/* Riser Face */}
                <div className="h-28 sm:h-38 bg-gradient-to-b from-[#2a0e05] via-[#1a0803] to-[#0a0301] border-x-2 border-b-2 border-amber-700/60 p-3 sm:p-4 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
                  <div className="w-full text-center">
                    <span className="font-serif font-black text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-amber-300 via-amber-600 to-amber-800 drop-shadow-[0_2px_10px_rgba(180,83,9,0.3)]">
                      III
                    </span>
                  </div>
                  {/* Medal Matrix */}
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold text-amber-300 bg-[#0c0401] px-2.5 py-1 rounded-md border border-amber-800/40">
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
            MONOLITHIC STAGE PLINTH & ILLUMINATED FOOTLIGHT STRIP
            Physically Anchors The Entire Dais Onto The Stage
            ========================================================================= */}
        <div className="max-w-4xl mx-auto -mt-1 relative z-30">
          {/* Beveled Brass Edge Trim */}
          <div className="h-3 rounded-full bg-gradient-to-r from-amber-700/40 via-yellow-400 to-amber-700/40 shadow-[0_0_25px_#F5B842] border-t border-yellow-200" />
          
          {/* Foundation Plinth Base */}
          <div className="py-3 px-6 rounded-b-2xl bg-gradient-to-b from-[#140206] to-[#060002] border-b-2 border-x border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-2xl">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-serif font-black text-amber-200 tracking-wider uppercase">
                Official Championship Podium • 2026 Inter-College Championship
              </span>
            </div>
            <span className="text-[11px] font-mono text-rose-300/80 font-semibold">
              Calculated Real-Time Across 22 Competitions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podium;
