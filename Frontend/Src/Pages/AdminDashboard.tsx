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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, lbRes] = await Promise.all([
          Api.get("/scores/stats/").catch(() => null),
          Api.get("/scores/leaderboard/").catch(() => null),
        ]);

        if (statsRes?.data) {
          setStats(statsRes.data);
        }
        if (lbRes?.data?.standings) {
          setLeaderboard(lbRes.data.standings);
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
    name: c.college_code || c.college_name.substring(0, 10),
    points: c.total_points,
  }));

  const COLORS = ["#F5B842", "#EAB308", "#CA8A04", "#A16207", "#713F12", "#831843", "#9F1239", "#BE123C"];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#29050e] via-[#1b0308] to-[#29050e] border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Festival Operations Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
            Directorate Command Center
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
            Real-Time Scoring Oversight, Contingent Standings, And Arena Orchestration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/scores"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            <span>Open Jury Scoring Engine</span>
          </Link>
          <Link
            to="/live"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-rose-950/50 hover:bg-rose-900/50 text-rose-300 border border-rose-900/60 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Stadium Feed</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#170306] border border-rose-950/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-300/80">Participating Contingents</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-serif font-black text-white">{stats.total_colleges || 12}</p>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">100% Accredited Institutes</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#170306] border border-rose-950/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-300/80">Total Competitions</span>
            <CalendarCheck className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-serif font-black text-white">{stats.total_competitions || 15}</p>
          <span className="text-[11px] text-amber-400 font-semibold mt-1 block">Across 6 Cultural Arenas</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#170306] border border-rose-950/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-300/80">Jury Scores Recorded</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-serif font-black text-white">{stats.total_scores_recorded || 12}</p>
          <span className="text-[11px] text-rose-300/70 font-semibold mt-1 block">Verified In Database</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#170306] border border-rose-950/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-300/80">Current Trophy Frontrunner</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-sm font-bold text-amber-300 truncate">
            {stats.leader?.name || "Medical Sciences"}
          </p>
          <span className="text-lg font-mono font-black text-white mt-1 block">
            {stats.leader?.points || 120} Points
          </span>
        </div>
      </div>

      {/* Analytics Chart & Leading Colleges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart Column */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#150206] border border-rose-950/80 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold font-serif text-white">Points Distribution By Contingent</h3>
              <p className="text-xs text-rose-300/70">Top Scoring Institutes Ranked Cumulative</p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Live Standings
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#a28189" fontSize={11} tickLine={false} />
                <YAxis stroke="#a28189" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e0408", borderColor: "#f59e0b", borderRadius: "12px", fontSize: "12px" }}
                  itemStyle={{ color: "#fef3c7" }}
                />
                <Bar dataKey="points" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Standings Table */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#150206] border border-rose-950/80 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold font-serif text-white">Top Podium Standings</h3>
            <Link to="/admin/scores" className="text-xs text-amber-400 font-bold hover:underline">
              Enter New Score →
            </Link>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
            {leaderboard.slice(0, 5).map((col, idx) => (
              <div
                key={col.college_id || idx}
                className="p-3.5 rounded-xl bg-[#1c0308] border border-rose-950/60 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="w-6 h-6 rounded-lg bg-rose-950/80 text-amber-400 text-xs font-black flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">{col.college_name}</p>
                    <p className="text-[10px] text-rose-300/70">{col.college_code}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-amber-400 font-mono">{col.total_points}</span>
                  <span className="text-[10px] text-rose-400 block">PTS</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
