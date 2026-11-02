import React from "react";
import { Trophy, Crown, Sparkles, Award, Medal } from "lucide-react";

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
    <div className="w-full max-w-5xl mx-auto px-4 py-8 select-none">
      {/* Top 3 Championship Pedestals */}
      <div className="flex items-end justify-center gap-2 sm:gap-6 pt-10 sm:pt-14 relative z-10">
        {/* =========================================================
            Rank 2: Silver Runner-Up 🥈 (Left Pedestal)
            ========================================================= */}
        {second && (
          <div className="flex-1 flex flex-col items-center max-w-[280px]">
            {/* Header: Avatar, Badge, College Name & Points */}
            <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center">
              <div
                className="w-16 sm:w-22 h-16 sm:h-22 rounded-2xl border-2 border-slate-300 shadow-[0_0_30px_rgba(203,213,225,0.45)] flex items-center justify-center text-white font-serif font-black text-xl sm:text-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 bg-gradient-to-br from-slate-800 to-slate-950"
                style={{ borderColor: "#CBD5E1" }}
              >
                <span className="tracking-wider">{second.college_code.slice(0, 4)}</span>
              </div>

              <div className="mt-3 flex flex-col items-center w-full px-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-400/15 text-slate-200 border border-slate-300/50 text-[11px] font-bold shadow-md">
                  <span>#2 Silver 🥈</span>
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-2 leading-snug line-clamp-2 min-h-[2.4rem] flex items-center justify-center">
                  {second.college_name}
                </h4>
                <div className="mt-1 px-3 py-0.5 rounded-lg bg-slate-900/80 border border-slate-400/40">
                  <span className="text-sm sm:text-base font-serif font-black text-slate-200">
                    {second.total_points} PTS
                  </span>
                </div>
              </div>
            </div>

            {/* Silver Pedestal Column */}
            <div className="w-full h-32 sm:h-44 rounded-t-2xl bg-gradient-to-t from-[#060b13] via-[#0f172a] to-[#1e293b] border-t-4 border-x-2 border-slate-300/70 flex flex-col items-center justify-center p-3 shadow-[0_0_35px_rgba(203,213,225,0.2)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <span className="text-4xl sm:text-6xl font-serif font-black text-slate-200/90 drop-shadow-[0_2px_12px_rgba(203,213,225,0.4)]">
                2
              </span>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300 font-bold mt-2 bg-slate-950/70 px-2.5 py-1 rounded-full border border-slate-500/30">
                <span>🥇 {second.gold_medals}</span>
                <span>🥈 {second.silver_medals}</span>
                <span>🥉 {second.bronze_medals}</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            Rank 1: Gold Champion 🏆 (Elevated Center Pedestal)
            ========================================================= */}
        {first && (
          <div className="flex-1 flex flex-col items-center max-w-[320px] -translate-y-6 sm:-translate-y-10 z-20">
            {/* Crown + Avatar + Badge + College Name + Points */}
            <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center relative">
              <div className="relative mb-1">
                <Crown className="w-10 h-10 sm:w-13 sm:h-13 text-amber-300 animate-bounce drop-shadow-[0_0_20px_#F5B842]" />
                <Sparkles className="w-4 h-4 text-yellow-200 absolute -top-1 -right-2 animate-pulse" />
              </div>

              <div
                className="w-20 sm:w-28 h-20 sm:h-28 rounded-2xl border-4 border-amber-400 shadow-[0_0_45px_rgba(245,184,66,0.65)] flex items-center justify-center text-white font-serif font-black text-2xl sm:text-3xl transform hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-[#400814] via-[#200308] to-[#100103]"
                style={{ borderColor: "#F5B842" }}
              >
                <span className="tracking-wider drop-shadow-[0_2px_10px_rgba(245,184,66,0.5)]">
                  {first.college_code.slice(0, 4)}
                </span>
              </div>

              <div className="mt-3 flex flex-col items-center w-full px-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/30 via-yellow-400/25 to-amber-500/30 text-amber-300 border border-amber-400 text-xs font-black shadow-lg shadow-amber-950/60">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>#1 Gold Champion 🏆</span>
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-2 leading-snug line-clamp-2 min-h-[2.4rem] flex items-center justify-center">
                  {first.college_name}
                </h4>
                <div className="mt-1 px-4 py-1 rounded-lg bg-gradient-to-r from-amber-950 via-[#26050e] to-amber-950 border border-amber-400/60 shadow-lg shadow-amber-950/50">
                  <span className="text-base sm:text-xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-400 drop-shadow-[0_2px_12px_rgba(245,184,66,0.6)]">
                    {first.total_points} PTS
                  </span>
                </div>
              </div>
            </div>

            {/* Gold Pedestal Column (Taller & Grand) */}
            <div className="w-full h-44 sm:h-60 rounded-t-2xl bg-gradient-to-t from-[#1b0308] via-[#310611] to-[#4c091a] border-t-4 border-x-2 border-amber-400 flex flex-col items-center justify-center p-3 shadow-[0_0_55px_rgba(245,184,66,0.35)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-400/20 via-transparent to-transparent pointer-events-none" />
              <span className="text-5xl sm:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_4px_18px_rgba(245,184,66,0.7)]">
                1
              </span>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-amber-300 font-extrabold mt-2.5 bg-[#140206] px-3 py-1 rounded-full border border-amber-500/40 shadow-inner">
                <span>🥇 {first.gold_medals}</span>
                <span>🥈 {first.silver_medals}</span>
                <span>🥉 {first.bronze_medals}</span>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            Rank 3: Bronze 3rd Place 🥉 (Right Pedestal)
            ========================================================= */}
        {third && (
          <div className="flex-1 flex flex-col items-center max-w-[280px]">
            {/* Header: Avatar, Badge, College Name & Points */}
            <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center">
              <div
                className="w-16 sm:w-22 h-16 sm:h-22 rounded-2xl border-2 border-amber-700 shadow-[0_0_30px_rgba(180,83,9,0.45)] flex items-center justify-center text-white font-serif font-black text-xl sm:text-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300 bg-gradient-to-br from-[#2e1208] to-[#120502]"
                style={{ borderColor: "#B45309" }}
              >
                <span className="tracking-wider">{third.college_code.slice(0, 4)}</span>
              </div>

              <div className="mt-3 flex flex-col items-center w-full px-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800/20 text-amber-300 border border-amber-600/50 text-[11px] font-bold shadow-md">
                  <span>#3 Bronze 🥉</span>
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-2 leading-snug line-clamp-2 min-h-[2.4rem] flex items-center justify-center">
                  {third.college_name}
                </h4>
                <div className="mt-1 px-3 py-0.5 rounded-lg bg-amber-950/80 border border-amber-700/50">
                  <span className="text-sm sm:text-base font-serif font-black text-amber-300">
                    {third.total_points} PTS
                  </span>
                </div>
              </div>
            </div>

            {/* Bronze Pedestal Column */}
            <div className="w-full h-26 sm:h-36 rounded-t-2xl bg-gradient-to-t from-[#120502] via-[#240a04] to-[#3a1307] border-t-4 border-x-2 border-amber-700/80 flex flex-col items-center justify-center p-3 shadow-[0_0_35px_rgba(180,83,9,0.2)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-600/10 to-transparent pointer-events-none" />
              <span className="text-4xl sm:text-6xl font-serif font-black text-amber-600/90 drop-shadow-[0_2px_12px_rgba(180,83,9,0.4)]">
                3
              </span>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-amber-200/90 font-bold mt-2 bg-[#0c0301] px-2.5 py-1 rounded-full border border-amber-700/40">
                <span>🥇 {third.gold_medals}</span>
                <span>🥈 {third.silver_medals}</span>
                <span>🥉 {third.bronze_medals}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================
          Theatrical Championship Stage Deck & Perimeter Rim
          Ties All Three Pedestals Into An Olympic-Grade Stage Base
          ========================================================= */}
      <div className="relative -mt-1 w-full">
        {/* Golden Stage Perimeter Rim */}
        <div className="h-2 rounded-full bg-gradient-to-r from-amber-600/20 via-amber-400 to-amber-600/20 shadow-[0_0_20px_#F5B842]" />
        
        {/* Stage Platform Base Deck */}
        <div className="mt-1 py-4 px-6 rounded-b-3xl bg-gradient-to-b from-[#160307] via-[#0d0104] to-[#050002] border-b-2 border-x border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-2xl">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-serif font-black text-amber-200 tracking-wider uppercase">
              Official Championship Podium • Top 3 Faculty Standings
            </span>
          </div>
          <span className="text-[11px] text-rose-200/80 font-medium">
            Scores Calculated In Real-Time Across All 22 Official Competitions
          </span>
        </div>
      </div>
    </div>
  );
};

export default Podium;
