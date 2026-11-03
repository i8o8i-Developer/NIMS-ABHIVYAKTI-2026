import React, { useState } from "react";
import { Search, Trophy, Medal, Award, Flame } from "lucide-react";

export interface LeaderboardCollege {
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

export const DEFAULT_STANDINGS: LeaderboardCollege[] = [
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
  {
    rank: 4,
    college_id: 5,
    college_name: "NIMS Dental College & Hospital",
    college_code: "NDCH",
    city: "Jaipur",
    avatar_color: "#065F46",
    total_points: 170,
    gold_medals: 1,
    silver_medals: 1,
    bronze_medals: 0,
    events_participated: 2,
  },
  {
    rank: 5,
    college_id: 3,
    college_name: "NIMS Institute Of Management & Commerce",
    college_code: "NIMC",
    city: "Jaipur",
    avatar_color: "#78350F",
    total_points: 150,
    gold_medals: 0,
    silver_medals: 1,
    bronze_medals: 2,
    events_participated: 3,
  },
];

interface LeaderboardTableProps {
  colleges?: LeaderboardCollege[];
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ colleges }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dataList = colleges && colleges.length > 0 ? colleges : DEFAULT_STANDINGS;

  const filteredColleges = dataList.filter((col) => {
    const q = searchTerm.toLowerCase();
    return (
      col.college_name.toLowerCase().includes(q) ||
      col.college_code.toLowerCase().includes(q) ||
      col.city.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full space-y-4 select-none">
      {/* Search Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-[#290514]/95 via-[#1c0422]/95 to-[#0e162e]/95 p-3.5 rounded-2xl border-2 border-amber-400/50 shadow-xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search College Or Code..."
            className="w-full bg-[#1a030f] border-2 border-amber-400/40 rounded-xl pl-10 pr-4 py-2 text-xs text-amber-100 placeholder:text-rose-200/50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-300">
          <span className="font-semibold text-gray-400">Total Competing:</span>
          <span className="font-black text-amber-300 bg-gradient-to-r from-amber-500/25 to-pink-500/25 px-3 py-1 rounded-lg border-2 border-amber-400/60 text-amber-200 font-black shadow-sm">
            {dataList.length} Institutes
          </span>
        </div>
      </div>

      {/* Table Container With Sleek Obsidian Black & Golden Accents */}
      <div className="overflow-x-auto rounded-2xl border-2 border-amber-400/50 bg-[#1a0410]/95 backdrop-blur-2xl shadow-2xl shadow-rose-950/60">
        <table className="w-full text-left text-xs">
          <thead className="bg-gradient-to-r from-[#380618] via-[#26052e] to-[#0c1830] text-amber-200 font-black uppercase tracking-wider text-[11px] border-b-2 border-amber-400/50">
            <tr>
              <th className="py-4 px-4 text-center w-16 text-amber-300 font-black">Rank</th>
              <th className="py-4 px-4 text-amber-200 font-black">Institute & Faculty</th>
              <th className="py-4 px-3 text-center text-amber-300 font-black">Gold 🥇</th>
              <th className="py-4 px-3 text-center text-slate-200 font-black">Silver 🥈</th>
              <th className="py-4 px-3 text-center text-amber-500 font-black">Bronze 🥉</th>
              <th className="py-4 px-4 text-center text-amber-200/90 font-black">Events</th>
              <th className="py-4 px-5 text-right font-black text-amber-300">Championship Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-200">
            {filteredColleges.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-amber-200/60 font-medium">
                  No Institutes Match Your Search Query.
                </td>
              </tr>
            ) : (
              filteredColleges.map((col) => {
                const isRank1 = col.rank === 1;
                const isRank2 = col.rank === 2;
                const isRank3 = col.rank === 3;
                const isTopThree = isRank1 || isRank2 || isRank3;

                return (
                  <tr
                    key={col.college_id}
                    className={`transition-colors duration-200 ${
                      isRank1
                        ? "bg-amber-500/[0.08] hover:bg-amber-500/[0.14]"
                        : isRank2
                        ? "bg-slate-400/[0.06] hover:bg-slate-400/[0.12]"
                        : isRank3
                        ? "bg-amber-800/[0.06] hover:bg-amber-800/[0.12]"
                        : "hover:bg-amber-500/[0.04]"
                    }`}
                  >
                    {/* Rank Medal Badge */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-serif font-black ${
                          isRank1
                            ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black shadow-lg shadow-amber-400/40 ring-1 ring-yellow-300"
                            : isRank2
                            ? "bg-gradient-to-r from-slate-200 to-slate-300 text-black shadow-md shadow-slate-300/40"
                            : isRank3
                            ? "bg-gradient-to-r from-amber-700 to-amber-800 text-white shadow-md shadow-amber-700/40"
                            : "bg-[#140206] text-amber-200 border border-amber-500/30 font-bold"
                        }`}
                      >
                        {col.rank}
                      </span>
                    </td>

                    {/* Institute & Faculty Details */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3.5">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-mono font-black text-[11px] shrink-0 border border-amber-500/40 shadow-sm"
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

                    {/* Medals */}
                    <td className="py-4 px-3 text-center font-bold text-amber-300 font-mono text-sm">
                      {col.gold_medals}
                    </td>
                    <td className="py-4 px-3 text-center font-bold text-slate-200 font-mono text-sm">
                      {col.silver_medals}
                    </td>
                    <td className="py-4 px-3 text-center font-bold text-amber-500 font-mono text-sm">
                      {col.bronze_medals}
                    </td>

                    {/* Events Count */}
                    <td className="py-4 px-4 text-center text-amber-200/90 font-mono font-semibold">
                      {col.events_participated || 0}
                    </td>

                    {/* Championship Points Highlighted */}
                    <td className="py-4 px-5 text-right">
                      <div className="inline-flex items-center justify-end px-3 py-1 rounded-lg bg-[#180307] border border-amber-500/40 shadow-sm">
                        <span className="font-serif font-black text-amber-300 text-base sm:text-lg font-mono drop-shadow-[0_0_12px_rgba(245,184,66,0.35)]">
                          {col.total_points}
                        </span>
                      </div>
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
