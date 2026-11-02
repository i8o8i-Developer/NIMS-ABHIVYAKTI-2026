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
    <div className="w-full space-y-4 select-none">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search College Or Code..."
            className="w-full bg-[#0d0104] border border-amber-500/30 rounded-xl pl-10 pr-4 py-2 text-xs text-amber-50 placeholder:text-rose-300/40 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs text-rose-300/80">
          <span>Total Competing: </span>
          <span className="font-bold text-amber-400">{colleges.length} Institutes</span>
        </div>
      </div>

      {/* Table Container With Deep Blackish Tone */}
      <div className="overflow-x-auto rounded-2xl border border-amber-500/25 bg-[#0a0103]/95 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#120205] text-amber-400 font-bold uppercase tracking-wider text-[11px] border-b border-amber-500/20">
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
          <tbody className="divide-y divide-rose-950/60 text-rose-100">
            {filteredColleges.map((col) => {
              const isTopThree = col.rank <= 3;

              return (
                <tr
                  key={col.college_id}
                  className={`hover:bg-rose-950/30 transition-colors ${
                    isTopThree ? "bg-amber-500/[0.04]" : ""
                  }`}
                >
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-serif font-black ${
                        col.rank === 1
                          ? "bg-amber-500 text-black shadow-md shadow-amber-500/30"
                          : col.rank === 2
                          ? "bg-slate-300 text-black shadow-md shadow-slate-300/30"
                          : col.rank === 3
                          ? "bg-amber-700 text-white shadow-md shadow-amber-700/30"
                          : "bg-rose-950/80 text-rose-300"
                      }`}
                    >
                      {col.rank}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-mono font-bold text-[10px] shrink-0 border border-amber-500/30"
                        style={{ backgroundColor: col.avatar_color || "#334155" }}
                      >
                        {col.college_code.slice(0, 4)}
                      </div>
                      <div>
                        <p className="font-bold text-white leading-snug">{col.college_name}</p>
                        <p className="text-[10px] text-rose-300/70">{col.city} • Code: {col.college_code}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-center font-bold text-amber-300 font-mono">
                    {col.gold_medals}
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-slate-300 font-mono">
                    {col.silver_medals}
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-amber-500 font-mono">
                    {col.bronze_medals}
                  </td>
                  <td className="py-3.5 px-4 text-center text-rose-300/80 font-mono">
                    {col.events_participated || 0}
                  </td>
                  <td className="py-3.5 px-5 text-right font-serif font-black text-amber-400 text-base font-mono">
                    {col.total_points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LeaderboardTable;
