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
          <Search className="w-4 h-4 text-amber-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search College Or Code..."
            className="w-full bg-[#0d0104] border-2 border-white/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-gray-400 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/40 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs text-rose-200">
          <span className="font-medium text-white/90">Total Competing:</span>
          <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-lg border border-white/20 shadow-sm">
            {colleges.length} Institutes
          </span>
        </div>
      </div>

      {/* Table Container With Deep Blackish Tone & White Contrast */}
      <div className="overflow-x-auto rounded-2xl border-2 border-white/15 bg-[#0a0103]/95 backdrop-blur-2xl shadow-2xl shadow-black/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#140206] text-white font-black uppercase tracking-wider text-[11px] border-b-2 border-white/20">
            <tr>
              <th className="py-4 px-4 text-center w-16 text-white font-black">Rank</th>
              <th className="py-4 px-4 text-white font-black">Institute & Faculty</th>
              <th className="py-4 px-3 text-center text-amber-300 font-bold">Gold 🥇</th>
              <th className="py-4 px-3 text-center text-slate-200 font-bold">Silver 🥈</th>
              <th className="py-4 px-3 text-center text-amber-500 font-bold">Bronze 🥉</th>
              <th className="py-4 px-4 text-center text-white/80 font-bold">Events</th>
              <th className="py-4 px-5 text-right font-black text-white">Championship Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-rose-100">
            {filteredColleges.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-300 font-medium">
                  No Institutes Match Your Search Query.
                </td>
              </tr>
            ) : (
              filteredColleges.map((col) => {
                const isTopThree = col.rank <= 3;

                return (
                  <tr
                    key={col.college_id}
                    className={`hover:bg-white/[0.04] transition-colors ${
                      isTopThree ? "bg-amber-500/[0.06]" : ""
                    }`}
                  >
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-serif font-black ${
                          col.rank === 1
                            ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow-md shadow-amber-400/40"
                            : col.rank === 2
                            ? "bg-slate-200 text-black shadow-md shadow-slate-300/40"
                            : col.rank === 3
                            ? "bg-amber-700 text-white shadow-md shadow-amber-700/40"
                            : "bg-white/10 text-white border border-white/20 font-bold"
                        }`}
                      >
                        {col.rank}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3.5">
                        <div
                          className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-white font-mono font-bold text-[10px] shrink-0 border border-white/30 shadow-sm"
                          style={{ backgroundColor: col.avatar_color || "#334155" }}
                        >
                          {col.college_code.slice(0, 4)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm leading-snug drop-shadow-sm">
                            {col.college_name}
                          </p>
                          <p className="text-[10px] text-amber-300/90 font-medium">
                            {col.city} • Code: {col.college_code}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-3 text-center font-bold text-amber-300 font-mono text-sm">
                      {col.gold_medals}
                    </td>
                    <td className="py-4 px-3 text-center font-bold text-slate-200 font-mono text-sm">
                      {col.silver_medals}
                    </td>
                    <td className="py-4 px-3 text-center font-bold text-amber-500 font-mono text-sm">
                      {col.bronze_medals}
                    </td>
                    <td className="py-4 px-4 text-center text-white/90 font-mono font-semibold">
                      {col.events_participated || 0}
                    </td>
                    <td className="py-4 px-5 text-right font-serif font-black text-white text-base sm:text-lg font-mono drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                      {col.total_points}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LeaderboardTable;
