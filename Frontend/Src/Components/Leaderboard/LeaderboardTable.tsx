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

// Harmonious Jewel-Tone Avatar Palettes Matching The Royal Festival Aesthetic
const getHarmoniousAvatarStyle = (code: string, rank: number) => {
  if (rank === 1) return "bg-gradient-to-br from-[#4a2e05] to-[#241502] text-amber-200 border-amber-400/60";
  if (rank === 2) return "bg-gradient-to-br from-[#24334a] to-[#131d2e] text-slate-200 border-slate-400/50";
  if (rank === 3) return "bg-gradient-to-br from-[#3b1d07] to-[#1c0c03] text-amber-300 border-amber-600/50";
  const palettes = [
    "bg-gradient-to-br from-[#38081a] to-[#1f030e] text-rose-200 border-rose-500/40",
    "bg-gradient-to-br from-[#062c26] to-[#021815] text-emerald-200 border-emerald-500/40",
    "bg-gradient-to-br from-[#2a0e42] to-[#150624] text-purple-200 border-purple-500/40",
    "bg-gradient-to-br from-[#08283d] to-[#031420] text-cyan-200 border-cyan-500/40",
    "bg-gradient-to-br from-[#3d1805] to-[#1f0b02] text-amber-200 border-amber-500/40",
  ];
  const idx = (code.charCodeAt(0) + (code.charCodeAt(1) || 0)) % palettes.length;
  return palettes[idx];
};

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
      {/* Harmonious Search Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-gradient-to-r from-[#1c030d] via-[#140209] to-[#1c030d] p-3.5 rounded-2xl border border-amber-500/35 shadow-2xl shadow-black/60">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search College Or Code..."
            className="w-full bg-[#0d0106] border border-amber-500/30 rounded-xl pl-10 pr-4 py-2 text-xs text-amber-100 placeholder:text-amber-200/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-300">
          <span className="font-semibold text-gray-400">Total Competing:</span>
          <span className="font-bold text-amber-300 bg-amber-500/15 px-3 py-1 rounded-xl border border-amber-400/40 shadow-sm">
            {dataList.length} Institutes
          </span>
        </div>
      </div>

      {/* Table Container In Harmonious Royal Velvet Obsidian */}
      <div className="overflow-x-auto rounded-2xl border border-amber-500/35 bg-gradient-to-b from-[#18030c] via-[#0f0107] to-[#090104] shadow-2xl shadow-black/80">
        <table className="w-full text-left text-xs">
          <thead className="bg-gradient-to-r from-[#220412] via-[#19020d] to-[#220412] text-amber-200/90 font-serif font-black uppercase tracking-wider text-[11px] border-b border-amber-500/30">
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
          <tbody className="divide-y divide-amber-500/10 text-gray-200">
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

                return (
                  <tr
                    key={col.college_id}
                    className={`transition-colors duration-200 ${
                      isRank1
                        ? "bg-amber-500/[0.08] hover:bg-amber-500/[0.12]"
                        : isRank2
                        ? "bg-slate-300/[0.06] hover:bg-slate-300/[0.10]"
                        : isRank3
                        ? "bg-amber-700/[0.06] hover:bg-amber-700/[0.10]"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    {/* Rank Medal Badge */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-serif font-black ${
                          isRank1
                            ? "bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-500/30 border border-yellow-200"
                            : isRank2
                            ? "bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 text-slate-900 shadow-md shadow-slate-300/30 border border-white"
                            : isRank3
                            ? "bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 text-white shadow-md shadow-amber-800/40 border border-amber-400/50"
                            : "bg-white/5 text-amber-200/80 border border-white/10 font-bold"
                        }`}
                      >
                        {col.rank}
                      </span>
                    </td>

                    {/* Institute & Faculty Details */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-[11px] shrink-0 border shadow-sm ${getHarmoniousAvatarStyle(col.college_code, col.rank)}`}
                        >
                          {col.college_code.slice(0, 4)}
                        </div>
                        <div>
                          <p className="font-bold text-amber-100 text-sm leading-snug drop-shadow-sm">
                            {col.college_name}
                          </p>
                          <p className="text-[10px] text-amber-300/80 font-medium">
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
                      <div className="inline-flex items-center justify-end px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-yellow-500/20 to-amber-500/15 border border-amber-400/50 shadow-md shadow-amber-500/10">
                        <span className="font-serif font-black text-amber-200 text-base sm:text-lg font-mono drop-shadow-[0_0_12px_rgba(245,184,66,0.35)]">
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
