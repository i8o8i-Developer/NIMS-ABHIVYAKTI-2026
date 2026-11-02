import React, { useState } from "react";
import { Search, Trophy, Award, Medal, ChevronRight } from "lucide-react";
import { LeaderboardCollege } from "@/Components/Leaderboard/Podium";

interface LeaderboardTableProps {
  colleges: LeaderboardCollege[];
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ colleges }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredColleges = colleges.filter((col) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return col.college_name.toLowerCase().includes(q) || col.college_code.toLowerCase().includes(q);
  });

  return (
    <div className="w-full space-y-4">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-festival-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search College Or Code..."
            className="w-full bg-[#18050A] border border-festival-gold-500/30 rounded-xl pl-10 pr-4 py-2 text-xs text-festival-cream-100 placeholder:text-festival-cream-300/40 focus:outline-none focus:border-festival-gold-400"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs text-festival-cream-300/70">
          <span>Total Competing: </span>
          <span className="font-bold text-festival-gold-400">{colleges.length} Institutes</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-festival-gold-500/25 bg-[#140408]/90 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#1F070E] text-festival-gold-400 font-bold uppercase tracking-wider text-[11px] border-b border-festival-gold-500/20">
            <tr>
              <th className="py-3.5 px-4 text-center w-16">Rank</th>
              <th className="py-3.5 px-4">Institute & Faculty</th>
              <th className="py-3.5 px-3 text-center">Gold 🥇</th>
              <th className="py-3.5 px-3 text-center">Silver 🥈</th>
              <th className="py-3.5 px-3 text-center">Bronze 🥉</th>
              <th className="py-3.5 px-4 text-center">Events</th>
              <th className="py-3.5 px-5 text-right font-black">Championship Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-festival-cream-200">
            {filteredColleges.map((col) => {
              const isTopThree = col.rank <= 3;

              return (
                <tr
                  key={col.college_id}
                  className={`hover:bg-white/5 transition-colors ${
                    col.rank === 1
                      ? "bg-festival-gold-500/10"
                      : col.rank === 2
                      ? "bg-slate-500/5"
                      : col.rank === 3
                      ? "bg-amber-700/5"
                      : ""
                  }`}
                >
                  {/* Rank Column */}
                  <td className="py-3.5 px-4 text-center font-serif font-black">
                    {col.rank === 1 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-festival-gold-500 text-festival-wine-950 font-black shadow-lg">
                        1
                      </span>
                    ) : col.rank === 2 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-black shadow-md">
                        2
                      </span>
                    ) : col.rank === 3 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-600 text-white font-black shadow-md">
                        3
                      </span>
                    ) : (
                      <span className="text-festival-cream-300/60 font-semibold">{col.rank}</span>
                    )}
                  </td>

                  {/* College Particulars */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black font-serif text-xs shrink-0 border border-white/20 shadow-sm"
                        style={{ backgroundColor: col.avatar_color || "#800020" }}
                      >
                        {col.college_code.slice(0, 4)}
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs sm:text-sm">{col.college_name}</p>
                        <p className="text-[10px] text-festival-gold-400 font-semibold">
                          Code: {col.college_code} • {col.city}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Medals Breakdown */}
                  <td className="py-3.5 px-3 text-center font-bold text-festival-gold-300">
                    {col.gold_medals}
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-300">
                    {col.silver_medals}
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-amber-500">
                    {col.bronze_medals}
                  </td>

                  {/* Events */}
                  <td className="py-3.5 px-4 text-center font-medium text-festival-cream-300/80">
                    {col.events_participated}
                  </td>

                  {/* Points */}
                  <td className="py-3.5 px-5 text-right font-serif font-black text-sm sm:text-base text-festival-gold-400">
                    {col.total_points} Pts
                  </td>
                </tr>
              );
            })}

            {filteredColleges.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-festival-cream-300/60">
                  No Institute Found Matching Your Search Criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
