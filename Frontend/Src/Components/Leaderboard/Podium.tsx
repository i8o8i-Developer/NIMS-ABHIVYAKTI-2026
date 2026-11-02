import React from "react";
import { Trophy, Crown, Sparkles, Award } from "lucide-react";

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
  topThree: LeaderboardCollege[];
}

export const Podium: React.FC<PodiumProps> = ({ topThree }) => {
  if (!topThree || topThree.length === 0) return null;

  const first = topThree[0];
  const second = topThree[1];
  const third = topThree[2];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-end justify-center gap-3 sm:gap-6 pt-12">
        
        {/* Rank 2: Silver 🥈 */}
        {second && (
          <div className="flex-1 flex flex-col items-center">
            <div className="flex flex-col items-center mb-3">
              <div
                className="w-14 sm:w-18 h-14 sm:h-18 rounded-2xl border-2 border-slate-300 shadow-[0_0_20px_rgba(203,213,225,0.4)] flex items-center justify-center text-white font-serif font-black text-lg sm:text-xl transform -rotate-3"
                style={{ backgroundColor: second.avatar_color || "#334155" }}
              >
                {second.college_code.slice(0, 4)}
              </div>
              <div className="mt-2 text-center">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300/40 text-[10px] font-bold">
                  <span>#2 Silver 🥈</span>
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-1 line-clamp-1 max-w-[130px] sm:max-w-[180px]">
                  {second.college_name}
                </h4>
                <p className="text-sm sm:text-base font-serif font-black text-festival-gold-400">
                  {second.total_points} Pts
                </p>
              </div>
            </div>
            {/* Podium Base Column */}
            <div className="w-full h-28 sm:h-36 rounded-t-2xl bg-gradient-to-t from-slate-900 to-slate-800/90 border-t-2 border-x border-slate-400/40 flex flex-col items-center justify-center p-2 shadow-2xl">
              <span className="text-3xl sm:text-4xl font-serif font-black text-slate-300/80">2</span>
              <div className="flex items-center space-x-2 text-[10px] sm:text-xs text-festival-cream-300/80 mt-1">
                <span>🥇 {second.gold_medals}</span>
                <span>🥈 {second.silver_medals}</span>
                <span>🥉 {second.bronze_medals}</span>
              </div>
            </div>
          </div>
        )}

        {/* Rank 1: Gold 🏆 (Elevated Center) */}
        {first && (
          <div className="flex-1 flex flex-col items-center -translate-y-4 sm:-translate-y-6">
            <div className="flex flex-col items-center mb-3 relative">
              <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-festival-gold-400 animate-bounce drop-shadow-[0_0_12px_#F5B842]" />
              <div
                className="w-18 sm:w-24 h-18 sm:h-24 rounded-2xl border-3 border-festival-gold-400 shadow-[0_0_30px_rgba(245,184,66,0.6)] flex items-center justify-center text-white font-serif font-black text-xl sm:text-2xl"
                style={{ backgroundColor: first.avatar_color || "#800020" }}
              >
                {first.college_code.slice(0, 4)}
              </div>
              <div className="mt-2 text-center">
                <span className="inline-flex items-center space-x-1 px-3 py-0.5 rounded-full bg-festival-gold-500/25 text-festival-gold-300 border border-festival-gold-400 text-xs font-black shadow-lg">
                  <Sparkles className="w-3 h-3 text-festival-gold-400" />
                  <span>#1 Gold Champion 🏆</span>
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mt-1 line-clamp-1 max-w-[160px] sm:max-w-[220px]">
                  {first.college_name}
                </h4>
                <p className="text-base sm:text-xl font-serif font-black text-festival-gold-300 drop-shadow-[0_2px_10px_rgba(245,184,66,0.4)]">
                  {first.total_points} Pts
                </p>
              </div>
            </div>
            {/* Podium Base Column */}
            <div className="w-full h-40 sm:h-52 rounded-t-2xl bg-gradient-to-t from-festival-wine-900 via-festival-crimson-800 to-festival-crimson-700 border-t-3 border-x-2 border-festival-gold-400/80 flex flex-col items-center justify-center p-2 shadow-[0_0_40px_rgba(245,184,66,0.25)]">
              <span className="text-4xl sm:text-5xl font-serif font-black text-festival-gold-400">1</span>
              <div className="flex items-center space-x-2.5 text-xs sm:text-sm text-festival-gold-300 font-bold mt-2">
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
                className="w-14 sm:w-18 h-14 sm:h-18 rounded-2xl border-2 border-amber-700 shadow-[0_0_20px_rgba(180,83,9,0.4)] flex items-center justify-center text-white font-serif font-black text-lg sm:text-xl transform rotate-3"
                style={{ backgroundColor: third.avatar_color || "#78350F" }}
              >
                {third.college_code.slice(0, 4)}
              </div>
              <div className="mt-2 text-center">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-700/25 text-amber-300 border border-amber-600/40 text-[10px] font-bold">
                  <span>#3 Bronze 🥉</span>
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-1 line-clamp-1 max-w-[130px] sm:max-w-[180px]">
                  {third.college_name}
                </h4>
                <p className="text-sm sm:text-base font-serif font-black text-festival-gold-400">
                  {third.total_points} Pts
                </p>
              </div>
            </div>
            {/* Podium Base Column */}
            <div className="w-full h-22 sm:h-28 rounded-t-2xl bg-gradient-to-t from-amber-950 to-amber-900/90 border-t-2 border-x border-amber-700/50 flex flex-col items-center justify-center p-2 shadow-2xl">
              <span className="text-3xl sm:text-4xl font-serif font-black text-amber-500/80">3</span>
              <div className="flex items-center space-x-2 text-[10px] sm:text-xs text-festival-cream-300/80 mt-1">
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

