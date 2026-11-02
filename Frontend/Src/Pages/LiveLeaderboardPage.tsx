import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import {
  Trophy,
  Maximize2,
  Minimize2,
  Flame,
  Radio,
  Medal,
  Sparkles,
} from "lucide-react";

export const LiveLeaderboardPage: React.FC = () => {
  const [standings, setStandings] = useState<any[]>([]);
  const [podium, setPodium] = useState<any[]>([]);
  const [recentWinners, setRecentWinners] = useState<any[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const fetchData = async () => {
    try {
      const res = await Api.get("/scores/live-feed/");
      if (res.data?.standings) {
        setStandings(res.data.standings);
        setPodium(res.data.podium || res.data.standings.slice(0, 3));
        setRecentWinners(res.data.recent_winners || []);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    const clock = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(clock);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const first = podium[0];
  const second = podium[1];
  const third = podium[2];

  return (
    <div className="min-h-screen bg-[#0a0103] text-amber-50 flex flex-col justify-between overflow-hidden antialiased select-none p-4 sm:p-6 lg:p-8">
      {/* Stadium Top Broadcast Header */}
      <header className="flex items-center justify-between border-b border-rose-950/70 pb-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-2xl bg-white shadow-lg border-2 border-amber-400">
            <img src="/Abhivyakti.png" alt="Abhivyakti Logo" className="h-10 w-auto object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
                NIMS Inter-College Cultural Championship 2026
              </span>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-[10px] font-black uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Feed
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-black text-white">
              Official Championship Standings
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-rose-300/70 font-semibold">Stadium Clock</p>
            <p className="text-lg font-mono font-bold text-amber-300">{currentTime || "Live"}</p>
          </div>
          <button
            onClick={toggleFullscreen}
            className="p-3 rounded-xl bg-rose-950/40 text-amber-400 hover:bg-rose-900/60 border border-rose-900/40 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Stadium Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Broadcast Podium (Cols 1-7) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="mb-6 flex items-center gap-2 text-amber-300">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-lg font-bold tracking-wider uppercase font-serif">
              Current Trophy Contenders
            </h2>
          </div>

          <div className="w-full grid grid-cols-3 gap-3 sm:gap-4 items-end max-w-2xl mx-auto pt-6">
            {/* 2nd Place Silver */}
            {second && (
              <div className="flex flex-col items-center">
                <div className="mb-2 text-center">
                  <span className="text-2xl">🥈</span>
                  <p className="text-xs font-bold text-zinc-300 mt-1 line-clamp-1">{second.college_name}</p>
                  <p className="text-xs text-zinc-400 font-mono">({second.college_code})</p>
                </div>
                <div className="w-full h-40 sm:h-52 rounded-t-2xl bg-gradient-to-t from-zinc-800 to-zinc-700/80 border-t-4 border-zinc-300 p-4 flex flex-col items-center justify-center shadow-xl">
                  <span className="text-3xl font-black text-white font-serif">2</span>
                  <p className="text-xl sm:text-2xl font-black text-zinc-200 mt-1 font-mono">
                    {second.total_points}
                  </p>
                  <span className="text-[10px] text-zinc-300 uppercase tracking-widest font-bold">Points</span>
                </div>
              </div>
            )}

            {/* 1st Place Gold (Elevated Center) */}
            {first && (
              <div className="flex flex-col items-center">
                <div className="mb-2 text-center animate-bounce">
                  <span className="text-4xl">👑</span>
                  <p className="text-sm font-extrabold text-amber-300 mt-1 line-clamp-1">{first.college_name}</p>
                  <p className="text-xs text-amber-400/80 font-mono">({first.college_code})</p>
                </div>
                <div className="w-full h-56 sm:h-72 rounded-t-2xl bg-gradient-to-t from-amber-700 via-yellow-600 to-amber-500 border-t-4 border-yellow-200 p-4 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
                  <span className="text-4xl font-black text-black font-serif">1</span>
                  <p className="text-3xl sm:text-4xl font-black text-black mt-2 font-mono drop-shadow">
                    {first.total_points}
                  </p>
                  <span className="text-xs text-amber-950 uppercase tracking-widest font-extrabold mt-1">
                    Leader Points
                  </span>
                </div>
              </div>
            )}

            {/* 3rd Place Bronze */}
            {third && (
              <div className="flex flex-col items-center">
                <div className="mb-2 text-center">
                  <span className="text-2xl">🥉</span>
                  <p className="text-xs font-bold text-amber-600 mt-1 line-clamp-1">{third.college_name}</p>
                  <p className="text-xs text-amber-700 font-mono">({third.college_code})</p>
                </div>
                <div className="w-full h-32 sm:h-40 rounded-t-2xl bg-gradient-to-t from-amber-950 to-amber-900/80 border-t-4 border-amber-600 p-4 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-3xl font-black text-amber-400 font-serif">3</span>
                  <p className="text-xl sm:text-2xl font-black text-amber-300 mt-1 font-mono">
                    {third.total_points}
                  </p>
                  <span className="text-[10px] text-amber-400/80 uppercase tracking-widest font-bold">Points</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Real-Time Standings Tally (Cols 8-12) */}
        <div className="lg:col-span-5 bg-[#140206] border border-rose-950/90 rounded-3xl p-5 shadow-2xl flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-3 border-b border-rose-950/80 mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-amber-100 uppercase tracking-wider font-serif">
                Full Contingent Tally
              </h3>
            </div>
            <span className="text-xs font-bold text-rose-300/60 font-mono">Rank / Pts</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {standings.map((college, idx) => (
              <div
                key={college.college_id || idx}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  idx < 3
                    ? "bg-[#200409] border-amber-500/40 text-amber-200"
                    : "bg-[#180307] border-rose-950/60 text-white"
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                      idx === 0
                        ? "bg-amber-500 text-black font-extrabold"
                        : idx === 1
                        ? "bg-zinc-300 text-black font-bold"
                        : idx === 2
                        ? "bg-amber-700 text-white font-bold"
                        : "bg-rose-950/80 text-rose-300"
                    }`}
                  >
                    #{idx + 1}
                  </span>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold truncate">{college.college_name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-rose-300/70">
                      <span>🥇 {college.gold_medals || 0}</span>
                      <span>🥈 {college.silver_medals || 0}</span>
                      <span>🥉 {college.bronze_medals || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base font-black text-amber-400 font-mono">
                    {college.total_points}
                  </span>
                  <span className="text-[10px] text-rose-400 block font-semibold">PTS</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Ticker With Recent Winner Announcements */}
      <footer className="mt-6 border-t border-rose-950/70 pt-3 flex items-center gap-3 bg-[#130206] px-4 py-2.5 rounded-2xl border border-rose-950">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-black text-[11px] font-black uppercase shrink-0">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>Latest Results</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap text-xs text-amber-200">
          {recentWinners.length > 0 ? (
            <div className="inline-flex gap-8 animate-marquee">
              {recentWinners.map((w, idx) => (
                <span key={idx} className="inline-flex items-center gap-2">
                  <strong className="text-white">{w.competition}</strong>: 🥇 {w.winner} ({w.college})
                </span>
              ))}
            </div>
          ) : (
            <span>Jury Scores Being Tabulated For Ongoing Arenas In Rajeshwari Auditorium & Management LT Complexes.</span>
          )}
        </div>
      </footer>
    </div>
  );
};
export default LiveLeaderboardPage;

