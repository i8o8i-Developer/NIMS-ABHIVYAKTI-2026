import React, { useState, useEffect } from "react";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { Footer } from "@/Components/Ui/Footer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import { Podium, DEFAULT_TOP_THREE } from "@/Components/Leaderboard/Podium";
import { LeaderboardTable } from "@/Components/Leaderboard/LeaderboardTable";
import { Api } from "@/Lib/Api";
import {
  Trophy,
  RefreshCw,
  ExternalLink,
  Medal,
  Sparkles,
  Flame,
  ShieldCheck,
} from "lucide-react";

export const LeaderboardPage: React.FC = () => {
  const [standings, setStandings] = useState<any[]>(DEFAULT_TOP_THREE);
  const [podium, setPodium] = useState<any[]>(DEFAULT_TOP_THREE);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchStandings = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/scores/leaderboard/");
      const list = res.data?.leaderboard || res.data?.standings || DEFAULT_TOP_THREE;
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
    <div className="min-h-screen bg-[#070103] text-amber-50 relative selection:bg-amber-500 selection:text-black">
      <FloatingBackgroundElements />
      <FestiveTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header with Brilliant White Contrast */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 text-white text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-md shadow-lg shadow-white/5">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Verified Championship Standings</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif font-black text-white drop-shadow-[0_4px_25px_rgba(255,255,255,0.45)]">
              Official Leaderboard
            </h1>
            <p className="text-sm sm:text-base text-gray-200 mt-2 font-medium">
              Cumulative Points Tally From All 15 Cultural Competitions. Ranked In Real Time.
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
          <div className="mb-14">
            <Podium topThree={podium} />
          </div>
        )}

        {/* Detailed Points Table */}
        <div className="mt-8">
          <LeaderboardTable colleges={standings} />
        </div>

        {/* Scoring Methodology Note */}
        <div className="mt-12 p-6 rounded-2xl bg-[#140206] border-2 border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-200 shadow-2xl">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Championship Points Rule</p>
              <p className="text-gray-300 text-xs mt-0.5">
                1st Place = 40 Points | 2nd Place = 25 Points | 3rd Place = 15 Points. Participation In All Arenas Awards +5 Bonus Points.
              </p>
            </div>
          </div>
          {lastUpdated && (
            <span className="text-xs font-mono font-bold text-amber-300/90 whitespace-nowrap bg-black/40 px-3 py-1.5 rounded-lg border border-amber-500/30">
              Last Synchronized: {lastUpdated}
            </span>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default LeaderboardPage;
