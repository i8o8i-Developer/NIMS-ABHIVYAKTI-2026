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
    college_id: 1,
    college_name: "National Institute Of Medical Sciences & Research",
    college_code: "NIMSR",
    city: "Jaipur",
    avatar_color: "#881337",
    total_points: 240,
    gold_medals: 4,
    silver_medals: 2,
    bronze_medals: 1,
    events_participated: 12,
  },
  {
    rank: 2,
    college_id: 2,
    college_name: "NIMS Institute Of Engineering & Technology",
    college_code: "NIET",
    city: "Jaipur",
    avatar_color: "#1E293B",
    total_points: 195,
    gold_medals: 2,
    silver_medals: 3,
    bronze_medals: 2,
    events_participated: 10,
  },
  {
    rank: 3,
    college_id: 3,
    college_name: "NIMS Institute Of Management & Commerce",
    college_code: "NIMC",
    city: "Jaipur",
    avatar_color: "#78350F",
    total_points: 165,
    gold_medals: 2,
    silver_medals: 1,
    bronze_medals: 3,
    events_participated: 9,
  },
];

export const Podium: React.FC<PodiumProps> = ({ topThree }) => {
  const data = topThree && topThree.length >= 3 ? topThree : DEFAULT_TOP_THREE;

  const first = data[0];
  const second = data[1];
  const third = data[2];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-end justify-center gap-3 sm:gap-6 pt-12">
        {/* Rank 2: Silver 🥈 */}
        {second && (
          <div className="flex-1 flex flex-col items-center">
            <div className="flex flex-col items-center mb-3">
              <div
                className="w-14 sm:w-20 h-14 sm:h-20 rounded-2xl border-2 border-slate-300 shadow-[0_0_25px_rgba(203,213,225,0.4)] flex items-center justify-center text-white font-serif font-black text-lg sm:text-2xl transform -rotate-3 transition-transform hover:rotate-0"
                style={{ backgroundColor: second.avatar_color || "#1e293b" }}
              >
                {second.college_code.slice(0, 4)}
              </div>
              <div className="mt-2.5 text-center">
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-300/15 text-slate-200 border border-slate-300/40 text-[11px] font-bold">
                  <span>#2 Silver 🥈</span>
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-1.5 line-clamp-1 max-w-[130px] sm:max-w-[200px]">
                  {second.college_name}
                </h4>
                <p className="text-sm sm:text-base font-serif font-black text-amber-300 mt-0.5">
                  {second.total_points} Pts
                </p>
              </div>
            </div>
            {/* Podium Base Column */}
            <div className="w-full h-28 sm:h-36 rounded-t-2xl bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800/90 border-t-2 border-x border-slate-400/50 flex flex-col items-center justify-center p-2 shadow-2xl">
              <span className="text-3xl sm:text-4xl font-serif font-black text-slate-300/90">2</span>
              <div className="flex items-center space-x-2 text-[10px] sm:text-xs text-rose-200/80 mt-1 font-semibold">
                <span>🥇 {second.gold_medals}</span>
                <span>🥈 {second.silver_medals}</span>
                <span>🥉 {second.bronze_medals}</span>
              </div>
            </div>
          </div>
        )}

        {/* Rank 1: Gold 🏆 (Elevated Center) */}
        {first && (
          <div className="flex-1 flex flex-col items-center -translate-y-5 sm:-translate-y-8">
            <div className="flex flex-col items-center mb-3 relative">
              <Crown className="w-9 h-9 sm:w-11 sm:h-11 text-amber-400 animate-bounce drop-shadow-[0_0_15px_#F5B842]" />
              <div
                className="w-18 sm:w-24 h-18 sm:h-24 rounded-2xl border-4 border-amber-400 shadow-[0_0_35px_rgba(245,184,66,0.6)] flex items-center justify-center text-white font-serif font-black text-xl sm:text-3xl transform hover:scale-105 transition-transform"
                style={{ backgroundColor: first.avatar_color || "#881337" }}
              >
                {first.college_code.slice(0, 4)}
              </div>
              <div className="mt-2.5 text-center">
                <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-amber-500/25 text-amber-300 border border-amber-400 text-xs font-black shadow-lg shadow-amber-950/50">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>#1 Gold Champion 🏆</span>
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-1.5 line-clamp-1 max-w-[160px] sm:max-w-[240px]">
                  {first.college_name}
                </h4>
                <p className="text-base sm:text-xl font-serif font-black text-amber-300 drop-shadow-[0_2px_12px_rgba(245,184,66,0.45)] mt-0.5">
                  {first.total_points} Pts
                </p>
              </div>
            </div>
            {/* Podium Base Column */}
            <div className="w-full h-40 sm:h-52 rounded-t-2xl bg-gradient-to-t from-[#1b0308] via-[#2a050e] to-[#3a0713] border-t-4 border-x-2 border-amber-400/90 flex flex-col items-center justify-center p-2 shadow-[0_0_45px_rgba(245,184,66,0.25)]">
              <span className="text-4xl sm:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-md">
                1
              </span>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-amber-300 font-bold mt-2">
                <span>🥇 {first.gold_medals}</span>
                <span>🥈 {first.silver_medals}</span>
                <span>🥉 {first.bronze_medals}</span>
              </div>
            </div>
          </div>
        )}

        {/* Rank 3: Bronze 🥉 */}
        {third && (
          <div className="flex-1 flex flex-col items-center">
            <div className="flex flex-col items-center mb-3">
              <div
                className="w-14 sm:w-20 h-14 sm:h-20 rounded-2xl border-2 border-amber-700 shadow-[0_0_25px_rgba(180,83,9,0.4)] flex items-center justify-center text-white font-serif font-black text-lg sm:text-2xl transform rotate-3 transition-transform hover:rotate-0"
                style={{ backgroundColor: third.avatar_color || "#78350f" }}
              >
                {third.college_code.slice(0, 4)}
              </div>
              <div className="mt-2.5 text-center">
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-700/20 text-amber-300 border border-amber-600/40 text-[11px] font-bold">
                  <span>#3 Bronze 🥉</span>
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-1.5 line-clamp-1 max-w-[130px] sm:max-w-[200px]">
                  {third.college_name}
                </h4>
                <p className="text-sm sm:text-base font-serif font-black text-amber-300 mt-0.5">
                  {third.total_points} Pts
                </p>
              </div>
            </div>
            {/* Podium Base Column */}
            <div className="w-full h-22 sm:h-28 rounded-t-2xl bg-gradient-to-t from-amber-950 via-[#1c0802] to-[#2b0e03] border-t-2 border-x border-amber-700/60 flex flex-col items-center justify-center p-2 shadow-2xl">
              <span className="text-3xl sm:text-4xl font-serif font-black text-amber-600/90">3</span>
              <div className="flex items-center space-x-2 text-[10px] sm:text-xs text-rose-200/80 mt-1 font-semibold">
                <span>🥇 {third.gold_medals}</span>
                <span>🥈 {third.silver_medals}</span>
                <span>🥉 {third.bronze_medals}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Podium;
