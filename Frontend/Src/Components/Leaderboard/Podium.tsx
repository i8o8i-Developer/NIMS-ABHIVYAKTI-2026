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
    college_code: "NIMS",
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
      {/* Three Connected Physical Podium Steps */}
      <div className="relative pt-6 sm:pt-10">
        {/* Ambient Warm Golden Vignette Behind Central Pedestal */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-64 bg-[radial-gradient(ellipse_at_center,_rgba(245,184,66,0.12)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

        {/* 3 Pedestal Columns Grid */}
        <div className="grid grid-cols-3 items-end gap-2 sm:gap-6 max-w-4xl mx-auto relative z-10">
          {/* =========================================================
              2ND PLACE: STERLING SILVER PEDESTAL (Left Tier)
              Spacious Square Box (No Text Overflow), Full Title Visible
              ========================================================= */}
          {second && (
            <div className="flex flex-col items-center">
              {/* Header: Square Box, Badge, Full College Name & Points */}
              <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center px-1">
                {/* Silver Rounded Square Box With Guaranteed In-Bounds Padding */}
                <div className="w-24 sm:w-28 h-18 sm:h-22 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1b2b48] via-[#101c30] to-[#070e1c] border-2 sm:border-3 border-cyan-300 shadow-[0_0_30px_rgba(56,189,248,0.45)] flex items-center justify-center px-3 transform hover:scale-105 transition-all duration-300 group">
                  <span className="font-serif font-black text-base sm:text-xl text-cyan-100 tracking-normal drop-shadow-[0_2px_10px_rgba(56,189,248,0.5)] whitespace-nowrap">
                    {second.college_code.slice(0, 4)}
                  </span>
                </div>

                {/* Silver Medal Badge Tag */}
                <div className="mt-2.5 sm:mt-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/25 border border-cyan-400 text-cyan-200 text-[11px] sm:text-xs font-black shadow-[0_0_15px_rgba(56,189,248,0.35)] whitespace-nowrap">
                    #2 Silver 🥈
                  </span>
                </div>

                {/* Full College Name - Clean Multi-Line, No Overflow, Zero Collision */}
                <div className="mt-2.5 sm:mt-3 w-full max-w-[220px] sm:max-w-[260px] min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center">
                  <h4 className="text-xs sm:text-sm font-serif font-black text-white leading-snug tracking-tight text-center px-2">
                    {second.college_name}
                  </h4>
                </div>

                {/* Scoreboard Points Pill */}
                <div className="mt-1.5 sm:mt-2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-gradient-to-r from-[#1a2d4d] to-[#0c182b] border border-cyan-400/60 shadow-md">
                  <span className="text-xs sm:text-sm font-mono font-black text-cyan-200 tracking-wide">
                    {second.total_points} PTS
                  </span>
                </div>
              </div>

              {/* Physical Silver Step Riser */}
              <div className="w-full">
                {/* Brushed Silver Landing Platform Top */}
                <div className="h-3.5 sm:h-4 rounded-t-xl bg-gradient-to-r from-sky-400 via-white to-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.6)] border-t border-white" />
                {/* Riser Face */}
                <div className="h-34 sm:h-46 bg-gradient-to-b from-[#182a47] via-[#0f1d33] to-[#08101d] border-x-2 border-b-2 border-cyan-400/60 p-3 sm:p-4 flex flex-col items-center justify-between shadow-xl relative overflow-hidden">
                  <div className="w-full text-center">
                    <span className="font-serif font-black text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-sky-300 drop-shadow-[0_4px_20px_rgba(56,189,248,0.6)]">
                      II
                    </span>
                  </div>
                  {/* Medal Matrix */}
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-cyan-100 bg-[#0d1829] px-2.5 py-1 rounded-xl border border-cyan-400/50 shadow-inner">
                    <span>🥇 {second.gold_medals}</span>
                    <span>🥈 {second.silver_medals}</span>
                    <span>🥉 {second.bronze_medals}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              1ST PLACE: CHAMPIONS GOLD PEDESTAL (Center Tier)
              Crown, Wide Gold Box (Text 100% In-Bounds), Full Name
              ========================================================= */}
          {first && (
            <div className="flex flex-col items-center -translate-y-4 sm:-translate-y-6 z-20">
              {/* Header: Crown, Square Box, Badge, Full College Name & Points */}
              <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center px-1">
                {/* Majestic Golden Crown */}
                <div className="mb-2 relative">
                  <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400 drop-shadow-[0_0_18px_rgba(245,184,66,0.85)] animate-pulse" />
                </div>

                {/* Champions Gold Rounded Square Box With Wide Width & Zero Overflow */}
                <div className="w-28 sm:w-32 h-20 sm:h-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#452003] via-[#271202] to-[#120701] border-2 sm:border-3 border-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center justify-center px-4 transform hover:scale-105 transition-all duration-300 group">
                  <span className="font-serif font-black text-xl sm:text-2xl text-amber-200 tracking-normal drop-shadow-[0_2px_12px_rgba(245,184,66,0.5)] whitespace-nowrap">
                    {first.college_code.slice(0, 4)}
                  </span>
                </div>

                {/* 1st Gold Champion Badge Tag */}
                <div className="mt-2.5 sm:mt-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-yellow-500/20 border border-amber-400/60 text-amber-200 text-xs font-black shadow-[0_0_15px_rgba(245,184,66,0.3)] whitespace-nowrap">
                    #1 Gold Champion 🏆
                  </span>
                </div>

                {/* Full College Name - Clean Multi-Line, No Overflow, Zero Collision */}
                <div className="mt-2.5 sm:mt-3 w-full max-w-[240px] sm:max-w-[280px] min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center">
                  <h4 className="text-xs sm:text-sm font-serif font-black text-amber-100 leading-snug tracking-tight text-center px-2 drop-shadow-[0_2px_8px_rgba(245,184,66,0.3)]">
                    {first.college_name}
                  </h4>
                </div>

                {/* Scoreboard Points Pill */}
                <div className="mt-1.5 sm:mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#3d2004] to-[#241302] border-2 border-amber-400 shadow-md">
                  <span className="text-sm sm:text-base font-mono font-black text-amber-300 tracking-wide">
                    {first.total_points} PTS
                  </span>
                </div>
              </div>

              {/* Physical Gold Step Riser (Grand Height) */}
              <div className="w-full">
                {/* Polished Gold Landing Platform Top */}
                <div className="h-4 sm:h-5 rounded-t-xl bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 shadow-[0_0_24px_rgba(245,184,66,0.5)] border-t border-amber-300" />
                {/* Riser Face */}
                <div className="h-48 sm:h-64 bg-gradient-to-b from-[#472605] via-[#2d1803] to-[#170c01] border-x-2 border-b-2 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.5)] p-3 sm:p-5 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden">
                  <div className="w-full text-center">
                    <span className="font-serif font-black text-5xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_4px_24px_rgba(245,184,66,0.65)]">
                      I
                    </span>
                  </div>
                  {/* Medal Matrix */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-200 bg-[#2b1602] px-3 py-1.5 rounded-xl border border-amber-400/60 shadow-inner">
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
              Spacious Bronze Square Box, Full Text In-Bounds
              ========================================================= */}
          {third && (
            <div className="flex flex-col items-center">
              {/* Header: Square Box, Badge, Full College Name & Points */}
              <div className="flex flex-col items-center mb-3 sm:mb-4 w-full text-center px-1">
                {/* Bronze Rounded Square Box With Guaranteed In-Bounds Padding */}
                <div className="w-24 sm:w-28 h-18 sm:h-22 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#3b1706] via-[#240e03] to-[#120601] border-2 sm:border-3 border-orange-400 shadow-[0_0_35px_rgba(249,115,22,0.45)] flex items-center justify-center px-3 transform hover:scale-105 transition-all duration-300 group">
                  <span className="font-serif font-black text-base sm:text-xl text-amber-300 tracking-normal drop-shadow-[0_2px_10px_rgba(180,83,9,0.4)] whitespace-nowrap">
                    {third.college_code.slice(0, 4)}
                  </span>
                </div>

                {/* Bronze Medal Badge Tag */}
                <div className="mt-2.5 sm:mt-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/25 border border-orange-400 text-orange-200 text-[11px] sm:text-xs font-black shadow-[0_0_15px_rgba(249,115,22,0.35)] whitespace-nowrap">
                    #3 Bronze 🥉
                  </span>
                </div>

                {/* Full College Name - Clean Multi-Line, No Overflow, Zero Collision */}
                <div className="mt-2.5 sm:mt-3 w-full max-w-[220px] sm:max-w-[260px] min-h-[3rem] sm:min-h-[3.5rem] flex items-center justify-center">
                  <h4 className="text-xs sm:text-sm font-serif font-black text-white leading-snug tracking-tight text-center px-2">
                    {third.college_name}
                  </h4>
                </div>

                {/* Scoreboard Points Pill */}
                <div className="mt-1.5 sm:mt-2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-gradient-to-r from-[#2e1306] to-[#1c0a03] border border-orange-500/60 shadow-md">
                  <span className="text-xs sm:text-sm font-mono font-black text-orange-200 tracking-wide">
                    {third.total_points} PTS
                  </span>
                </div>
              </div>

              {/* Physical Bronze Step Riser */}
              <div className="w-full">
                {/* Antique Bronze Landing Platform Top */}
                <div className="h-3.5 sm:h-4 rounded-t-xl bg-gradient-to-r from-amber-700 via-orange-400 to-amber-700 shadow-[0_0_24px_rgba(249,115,22,0.5)] border-t border-orange-300" />
                {/* Riser Face */}
                <div className="h-30 sm:h-40 bg-gradient-to-b from-[#3d1808] via-[#260f05] to-[#140702] border-x-2 border-b-2 border-orange-500/60 shadow-[0_0_30px_rgba(249,115,22,0.3)] p-3 sm:p-4 flex flex-col items-center justify-between shadow-xl relative overflow-hidden">
                  <div className="w-full text-center">
                    <span className="font-serif font-black text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-orange-300 to-amber-600 drop-shadow-[0_4px_20px_rgba(249,115,22,0.6)]">
                      III
                    </span>
                  </div>
                  {/* Medal Matrix */}
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-orange-200 bg-[#1f0d04] px-2.5 py-1 rounded-xl border border-orange-500/50 shadow-inner">
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
            MONOLITHIC STAGE PLINTH BASE
            Architectural Stage Anchor With Golden Perimeter Rim & Clean Real-Time Metrics
            ========================================================================= */}
        <div className="max-w-4xl mx-auto -mt-0.5 relative z-30">
          {/* Golden Stage Perimeter Glow Rim */}
          <div className="h-2 rounded-full bg-gradient-to-r from-amber-600/20 via-amber-400 to-amber-600/20 shadow-[0_0_20px_rgba(245,184,66,0.5)]" />

          {/* Foundation Plinth Base Deck */}
          <div className="mt-1 py-4 px-6 rounded-b-2xl bg-gradient-to-b from-[#240612] via-[#1a041f] to-[#0c0214] border-b-2 border-x-2 border-amber-400/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-2xl">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-serif font-black text-amber-200 tracking-wider uppercase">
                Official Championship Podium • 2026 Inter-College Championship
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono">
              Scores Calculated In Real-Time Across All 22 Official Competitions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podium;
