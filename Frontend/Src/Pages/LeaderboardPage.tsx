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
      if (res.data?.standings) {
        setStandings(res.data.standings);
        setPodium(res.data.podium || res.data.standings.slice(0, 3));
      }
      setLastUpdated(new Date().toLocaleTimeString());
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
    const interval = setInterval(fetchStandings, 15000); // 15 second auto-poll
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0204] text-amber-50 relative selection:bg-amber-500 selection:text-black">
      <FloatingBackgroundElements />
      <FestiveTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>Verified Championship Standings</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
              Official Leaderboard
            </h1>
            <p className="text-sm text-rose-200/80 mt-2">
              Cumulative Points Tally From All 15 Cultural Competitions. Ranked In Real Time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchStandings}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
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
        <div className="mt-12 p-6 rounded-2xl bg-[#170306] border border-rose-950/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-rose-300/80">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Championship Points Rule</p>
              <p className="text-rose-200/70">
                1st Place = 40 Points | 2nd Place = 25 Points | 3rd Place = 15 Points. Participation In All Arenas Awards +5 Bonus Points.
              </p>
            </div>
          </div>
          {lastUpdated && (
            <span className="text-[11px] text-amber-400/80 whitespace-nowrap">
              Last Synchronized At: {lastUpdated}
            </span>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default LeaderboardPage;
