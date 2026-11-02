import React, { useState, useEffect } from "react";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { Footer } from "@/Components/Ui/Footer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import { Podium, DEFAULT_TOP_THREE } from "@/Components/Leaderboard/Podium";
import { LeaderboardTable, DEFAULT_STANDINGS } from "@/Components/Leaderboard/LeaderboardTable";
import { Api } from "@/Lib/Api";
import {
  Trophy,
  RefreshCw,
  Medal,
  Sparkles,
  Flame,
  Music,
  ShieldCheck,
} from "lucide-react";

export const LeaderboardPage: React.FC = () => {
  const [standings, setStandings] = useState<any[]>(DEFAULT_STANDINGS);
  const [podium, setPodium] = useState<any[]>(DEFAULT_TOP_THREE);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchStandings = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/scores/leaderboard/");
      const list = res.data?.leaderboard || res.data?.standings || DEFAULT_STANDINGS;
      const top3 = res.data?.podium || (list && list.length >= 3 ? list.slice(0, 3) : DEFAULT_TOP_THREE);
      setStandings(list);
      setPodium(top3);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch {
      // Retain fallback data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
    const interval = setInterval(fetchStandings, 15000); // 15-second auto-poll
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0204] text-amber-50 relative selection:bg-amber-500 selection:text-black overflow-x-hidden">
      <FloatingBackgroundElements />
      <FestiveTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="absolute top-16 right-12 opacity-35 pointer-events-none animate-live-sway">
          <Music className="w-5 h-5 text-amber-300 drop-shadow-[0_0_10px_rgba(245,184,66,0.5)]" />
        </div>
        <div className="absolute top-28 right-20 opacity-35 pointer-events-none animate-live-flicker">
          <Flame className="w-4 h-4 text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
        </div>
        <div className="absolute top-20 left-12 opacity-35 pointer-events-none animate-live-drift-diag">
          <Trophy className="w-5 h-5 text-amber-300 drop-shadow-[0_0_8px_rgba(245,184,66,0.5)]" />
        </div>

        {/* Header with Warm Festival Gold Theme */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#140206] border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg shadow-amber-950/20">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Verified Championship Standings</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif font-black text-amber-100 drop-shadow-[0_4px_25px_rgba(245,184,66,0.3)]">
              Official Leaderboard
            </h1>
            <p className="text-sm sm:text-base text-rose-200/90 mt-2 font-medium">
              Cumulative Points Tally From All 22 Official Cultural Competitions. Ranked In Real Time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchStandings}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black text-xs font-black transition-all flex items-center gap-2 shadow-xl shadow-amber-500/25 hover:scale-105 uppercase tracking-wider"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Standings</span>
            </button>
          </div>
        </div>

        {/* Top 3 Championship Podium */}
        {podium.length >= 3 && (
          <div className="mb-14 relative z-10">
            <Podium topThree={podium} />
          </div>
        )}

        {/* Detailed Points Table */}
        <div className="mt-8 relative z-10">
          <LeaderboardTable colleges={standings} />
        </div>

        {/* Scoring Methodology Note */}
        <div className="mt-12 p-6 rounded-2xl bg-[#140206] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-rose-200 shadow-2xl relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/35">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Championship Points Rule</p>
              <p className="text-gray-300 text-xs">
                1st Place: 40 Points • 2nd Place: 25 Points • 3rd Place: 15 Points. Participation In All Arenas Awards +5 Bonus Points.
              </p>
            </div>
          </div>
          {lastUpdated && (
            <p className="text-gray-300 font-mono text-xs">Last Synchronized At {lastUpdated}</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LeaderboardPage;
