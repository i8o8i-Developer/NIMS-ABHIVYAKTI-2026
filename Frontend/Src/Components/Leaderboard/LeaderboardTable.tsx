import React, { useState } from "react";
import { Search, Trophy } from "lucide-react";

interface LeaderboardCollege {
  college_id: number;
  college_name: string;
  college_code: string;
  city: string;
  avatar_color: string;
  gold_medals: number;
  silver_medals: number;
  bronze_medals: number;
  events_participated: number;
  total_points: number;
  rank: number;
}

interface LeaderboardTableProps {
  colleges: LeaderboardCollege[];
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ colleges }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredColleges = colleges.filter((col) => {
    const q = searchTerm.toLowerCase();
    return (
      col.college_name.toLowerCase().includes(q) ||
      col.college_code.toLowerCase().includes(q) ||
      col.city.toLowerCase().includes(q)
    );
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
            className="w-full bg-[#0d0104] border border-amber-500/30 rounded-xl pl-10 pr-4 py-2 text-xs text-amber-100 placeholder:text-amber-200/40 focus:outline-none focus:border-amber-400 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs text-rose-200">
          <span className="font-medium text-amber-200/80">Total Competing:</span>
          <span className="font-bold text-amber-300 bg-[#140206] px-3 py-1 rounded-lg border border-amber-500/30 shadow-sm">
            {colleges.length} Institutes
          </span>
        </div>
      </div>

      {/* Table Container With Deep Blackish Tone & Golden Accents */}
      <div className="overflow-x-auto rounded-2xl border border-amber-500/30 bg-[#0a0103]/95 backdrop-blur-2xl shadow-2xl shadow-black/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#140206] text-amber-200 font-black uppercase tracking-wider text-[11px] border-b border-amber-500/30">
            <tr>
              <th className="py-4 px-4 text-center w-16 text-amber-300 font-black">Rank</th>
              <th className="py-4 px-4 text-amber-200 font-black">Institute & Faculty</th>
              <th className="py-4 px-3 text-center text-amber-300 font-bold">Gold 🥇</th>
              <th className="py-4 px-3 text-center text-slate-200 font-bold">Silver 🥈</th>
              <th className="py-4 px-3 text-center text-amber-500 font-bold">Bronze 🥉</th>
              <th className="py-4 px-4 text-center text-amber-200/80 font-bold">Events</th>
              <th className="py-4 px-5 text-right font-black text-amber-300">Championship Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-500/10 text-rose-100">
            {filteredColleges.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-amber-200/60 font-medium">
                  No Institutes Match Your Search Query.
                </td>
              </tr>
            ) : (
              filteredColleges.map((col) => {
                const isTopThree = col.rank <= 3;

                return (
                  <tr
                    key={col.college_id}
                    className={`hover:bg-amber-500/[0.04] transition-colors ${
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
                            : "bg-[#140206] text-amber-200 border border-amber-500/30 font-bold"
                        }`}
                      >
                        {col.rank}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3.5">
                        <div
                          className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-amber-100 font-mono font-bold text-[10px] shrink-0 border border-amber-500/30 shadow-sm"
                          style={{ backgroundColor: col.avatar_color || "#334155" }}
                        >
                          {col.college_code.slice(0, 4)}
                        </div>
                        <div>
                          <p className="font-bold text-amber-100 text-sm leading-snug drop-shadow-sm">
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
                    <td className="py-4 px-4 text-center text-amber-200/90 font-mono font-semibold">
                      {col.events_participated || 0}
                    </td>
                    <td className="py-4 px-5 text-right font-serif font-black text-amber-300 text-base sm:text-lg font-mono drop-shadow-[0_0_12px_rgba(245,184,66,0.3)]">
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
