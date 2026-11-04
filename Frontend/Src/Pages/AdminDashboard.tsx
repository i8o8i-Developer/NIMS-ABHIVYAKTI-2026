import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Api } from "@/Lib/Api";
import {
  Trophy,
  CalendarCheck,
  Building2,
  Users,
  Flame,
  ArrowUpRight,
  Sparkles,
  Award,
  Radio,
  CheckCircle2,
  Clock,
  Plus,
  Sliders,
  Image as ImageIcon,
  Medal,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>({
    total_colleges: 12,
    total_competitions: 15,
    completed_competitions: 4,
    total_scores_recorded: 12,
    leader: { name: "National Institute Of Medical Sciences & Research", points: 120 },
  });
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [recentScores, setRecentScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, lbRes, scoresRes] = await Promise.all([
          Api.get("/scores/stats/").catch(() => null),
          Api.get("/scores/leaderboard/").catch(() => null),
          Api.get("/scores/").catch(() => null),
        ]);

        if (statsRes?.data) {
          setStats(statsRes.data);
        }
        if (lbRes?.data?.standings) {
          setLeaderboard(lbRes.data.standings);
        }
        if (scoresRes?.data) {
          const sData = scoresRes.data.results || scoresRes.data || [];
          setRecentScores(sData.slice(0, 5));
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const chartData = leaderboard.slice(0, 8).map((c) => ({
    name: c.college_code || c.college_name.substring(0, 8),
    points: c.total_points,
  }));

  const COLORS = [
    "#F59E0B",
    "#FBBF24",
    "#FACC15",
    "#EAB308",
    "#CA8A04",
    "#A16207",
    "#D97706",
    "#B45309",
  ];

  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-amber-50">
      {/* Top Directorate Hero Banner */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#17030c] via-[#0d0106] to-[#17030c] border border-amber-500/35 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              Championship Operations Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wide">
            Directorate Command Center
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1 max-w-2xl leading-relaxed">
            Real-Time Scoring Oversight, Institutional Championship Standings, And Arena Orchestration.
          </p>
        </div>

        {/* Quick Launchers */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <Link
            to="/admin/scores"
            className="flex-1 md:flex-none px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black font-serif font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Trophy className="w-4 h-4 stroke-[2.5]" />
            <span>Award Score</span>
          </Link>

          <Link
            to="/#leaderboard"
            target="_blank"
            className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-rose-200 hover:text-white border border-white/10 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>Public Standings</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Contingents */}
        <Link
          to="/admin/colleges"
          className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#120208]/90 border border-amber-500/25 hover:border-amber-400/50 backdrop-blur-xl shadow-lg transition-all group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between text-rose-300/80">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Institutes Competing
            </span>
            <Building2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-serif font-black text-white">
              {stats.total_colleges || 12}
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-0.5">
              <span>Manage</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[10px] text-rose-300/60 mt-1 truncate">
            Leader: {stats.leader?.name ? stats.leader.name.split(" ")[0] : "NIET"} ({stats.leader?.points || 0} pts)
          </p>
        </Link>

        {/* Competitions */}
        <Link
          to="/admin/competitions"
          className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#120208]/90 border border-amber-500/25 hover:border-amber-400/50 backdrop-blur-xl shadow-lg transition-all group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between text-rose-300/80">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Competitions
            </span>
            <CalendarCheck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-serif font-black text-white">
              {stats.total_competitions || 15}
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-400">
              {stats.completed_competitions || 0} Done
            </span>
          </div>
          <p className="text-[10px] text-rose-300/60 mt-1">
            Across 8 Major Cultural Arenas
          </p>
        </Link>

        {/* Scores & Medals */}
        <Link
          to="/admin/scores"
          className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#120208]/90 border border-amber-500/25 hover:border-amber-400/50 backdrop-blur-xl shadow-lg transition-all group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between text-rose-300/80">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Scorecards Logged
            </span>
            <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-serif font-black text-amber-300">
              {stats.total_scores_recorded || recentScores.length || 1}
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-400">Verified</span>
          </div>
          <p className="text-[10px] text-rose-300/60 mt-1">
            Official Marks & Points Engine
          </p>
        </Link>

        {/* Media & Gallery */}
        <Link
          to="/admin/gallery"
          className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#120208]/90 border border-amber-500/25 hover:border-amber-400/50 backdrop-blur-xl shadow-lg transition-all group hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between text-rose-300/80">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Media Archive
            </span>
            <ImageIcon className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-serif font-black text-white">
              6+
            </span>
            <span className="text-[10px] font-mono font-bold text-purple-400">HD Snaps</span>
          </div>
          <p className="text-[10px] text-rose-300/60 mt-1">
            Star Night & Stage Captures
          </p>
        </Link>
      </div>

      {/* Podium Standings Showcase (Top 3 Colleges) */}
      {topThree.length > 0 && (
        <div className="p-5 sm:p-7 rounded-3xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h2 className="font-serif font-black text-lg text-white">
                Live Championship Podium Leaders
              </h2>
            </div>
            <Link
              to="/admin/colleges"
              className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View Full Standings</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* #1 Gold */}
            {topThree[0] && (
              <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-500/20 via-[#140209] to-[#0a0105] border-2 border-amber-400/60 shadow-xl shadow-amber-500/10 flex flex-col justify-between relative order-1 sm:order-2">
                <div className="flex items-start justify-between">
                  <span className="text-2xl">🥇</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    #1 Gold Leader
                  </span>
                </div>
                <div className="my-3">
                  <h3 className="font-serif font-black text-white text-base">
                    {topThree[0].college_name}
                  </h3>
                  <p className="text-xs font-mono font-bold text-amber-400 mt-0.5">
                    {topThree[0].college_code}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-amber-500/20">
                  <div className="text-[11px] text-rose-200/80">
                    🥇 {topThree[0].gold_medals || 0} 🥈 {topThree[0].silver_medals || 0} 🥉 {topThree[0].bronze_medals || 0}
                  </div>
                  <span className="text-base font-mono font-black text-amber-300">
                    {topThree[0].total_points} PTS
                  </span>
                </div>
              </div>
            )}

            {/* #2 Silver */}
            {topThree[1] && (
              <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-400/15 via-[#140209] to-[#0a0105] border border-slate-300/40 shadow-lg flex flex-col justify-between order-2 sm:order-1">
                <div className="flex items-start justify-between">
                  <span className="text-2xl">🥈</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-400/20 text-slate-200 border border-slate-300/40">
                    #2 Silver Runner-Up
                  </span>
                </div>
                <div className="my-3">
                  <h3 className="font-serif font-black text-white text-base">
                    {topThree[1].college_name}
                  </h3>
                  <p className="text-xs font-mono font-bold text-slate-300 mt-0.5">
                    {topThree[1].college_code}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-400/20">
                  <div className="text-[11px] text-rose-200/80">
                    🥇 {topThree[1].gold_medals || 0} 🥈 {topThree[1].silver_medals || 0} 🥉 {topThree[1].bronze_medals || 0}
                  </div>
                  <span className="text-base font-mono font-black text-slate-200">
                    {topThree[1].total_points} PTS
                  </span>
                </div>
              </div>
            )}

            {/* #3 Bronze */}
            {topThree[2] && (
              <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-800/20 via-[#140209] to-[#0a0105] border border-amber-600/40 shadow-lg flex flex-col justify-between order-3">
                <div className="flex items-start justify-between">
                  <span className="text-2xl">🥉</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-700/20 text-amber-400 border border-amber-600/40">
                    #3 Bronze Runner-Up
                  </span>
                </div>
                <div className="my-3">
                  <h3 className="font-serif font-black text-white text-base">
                    {topThree[2].college_name}
                  </h3>
                  <p className="text-xs font-mono font-bold text-amber-500 mt-0.5">
                    {topThree[2].college_code}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-amber-600/20">
                  <div className="text-[11px] text-rose-200/80">
                    🥇 {topThree[2].gold_medals || 0} 🥈 {topThree[2].silver_medals || 0} 🥉 {topThree[2].bronze_medals || 0}
                  </div>
                  <span className="text-base font-mono font-black text-amber-400">
                    {topThree[2].total_points} PTS
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chart & Recent Scores Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaderboard Chart (2 Cols) */}
        <div className="lg:col-span-2 p-5 sm:p-7 rounded-3xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-serif font-black text-lg text-white">
                Institutional Standings Matrix
              </h2>
              <p className="text-xs text-rose-200/80 mt-0.5">
                Top 8 competing institutes by cumulative championship points.
              </p>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis
                  dataKey="name"
                  stroke="#F59E0B"
                  fontSize={10}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#F59E0B" fontSize={10} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(245, 158, 11, 0.08)" }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="p-3 rounded-xl bg-[#17030c] border border-amber-500/40 shadow-2xl text-xs">
                          <p className="font-serif font-bold text-white">{payload[0].payload.name}</p>
                          <p className="font-mono font-black text-amber-400 mt-1">
                            {payload[0].value} Championship Points
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="points" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Scores Stream (1 Col) */}
        <div className="p-5 sm:p-7 rounded-3xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/15">
              <h2 className="font-serif font-black text-lg text-white">
                Live Score Stream
              </h2>
              <Link
                to="/admin/scores"
                className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Scoring Deck</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-amber-500/10 mt-3">
              {recentScores.length === 0 ? (
                <div className="py-8 text-center text-xs text-rose-300/60 font-serif">
                  No scorecards logged yet.
                </div>
              ) : (
                recentScores.map((s) => (
                  <div key={s.id} className="py-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">
                        {s.competition_title}
                      </p>
                      <p className="text-[10px] text-rose-300/70 truncate">
                        {s.college_code} {s.participant_name ? `• ${s.participant_name}` : ""}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-black text-amber-400">
                        +{s.points_awarded} PTS
                      </span>
                      <div className="text-[10px] text-rose-300/60">
                        {s.rank === 1 ? "🥇 Gold" : s.rank === 2 ? "🥈 Silver" : s.rank === 3 ? "🥉 Bronze" : "🎖️ Part."}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            to="/admin/scores"
            className="w-full mt-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-rose-200 hover:text-white border border-white/10 text-xs font-bold transition-colors text-center block"
          >
            Record New Jury Scorecard
          </Link>
        </div>
      </div>

      {/* CRUD Quick Operations Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Link
          to="/admin/colleges"
          className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/20 hover:border-amber-400/50 p-4 transition-all flex items-center gap-3.5 group"
        >
          <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-black text-white text-xs sm:text-sm">
              Colleges Registry
            </h4>
            <p className="text-[10px] text-rose-300/70">
              Add, edit, or remove contingents
            </p>
          </div>
        </Link>

        <Link
          to="/admin/competitions"
          className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/20 hover:border-amber-400/50 p-4 transition-all flex items-center gap-3.5 group"
        >
          <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-transform">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-black text-white text-xs sm:text-sm">
              Competitions Roster
            </h4>
            <p className="text-[10px] text-rose-300/70">
              Manage schedules, rules & arenas
            </p>
          </div>
        </Link>

        <Link
          to="/admin/settings"
          className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/20 hover:border-amber-400/50 p-4 transition-all flex items-center gap-3.5 group"
        >
          <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-black text-white text-xs sm:text-sm">
              System Parameters
            </h4>
            <p className="text-[10px] text-rose-300/70">
              Marquee tickers & remote flags
            </p>
          </div>
        </Link>

        <Link
          to="/admin/users"
          className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/20 hover:border-amber-400/50 p-4 transition-all flex items-center gap-3.5 group"
        >
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-black text-white text-xs sm:text-sm">
              Staff & Permissions
            </h4>
            <p className="text-[10px] text-rose-300/70">
              RBAC roles & access control
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
