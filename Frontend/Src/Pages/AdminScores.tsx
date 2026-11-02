import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import {
  Trophy,
  Award,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  RefreshCw,
  Search,
} from "lucide-react";

export const AdminScores: React.FC = () => {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Form State
  const [selectedComp, setSelectedComp] = useState<number | "">("");
  const [selectedCollege, setSelectedCollege] = useState<number | "">("");
  const [rankAwarded, setRankAwarded] = useState<number>(1);
  const [rawScore, setRawScore] = useState<number>(95);
  const [notes, setNotes] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [compRes, colRes, scoreRes] = await Promise.all([
        Api.get("/competitions/"),
        Api.get("/colleges/"),
        Api.get("/scores/"),
      ]);

      setCompetitions(compRes.data.results || compRes.data || []);
      setColleges(colRes.data.results || colRes.data || []);
      setScores(scoreRes.data.results || scoreRes.data || []);
    } catch (err: any) {
      setErrorMsg("Failed To Fetch Scoring Engine Records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculatePoints = (rank: number) => {
    if (rank === 1) return 40;
    if (rank === 2) return 25;
    if (rank === 3) return 15;
    return 5; // Participation
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComp || !selectedCollege) {
      setErrorMsg("Please Select Both A Competition And A College.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    const points = calculatePoints(rankAwarded);

    try {
      await Api.post("/scores/", {
        competition: selectedComp,
        college: selectedCollege,
        rank_awarded: rankAwarded,
        raw_score: rawScore,
        points_awarded: points,
        jury_notes: notes,
        is_verified: isVerified,
      });

      setSuccessMsg("Jury Score Card Successfully Recorded In Central Database.");
      setNotes("");
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Failed To Record Jury Score. Check Duplicates.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (scoreId: number) => {
    if (!window.confirm("Are You Sure You Want To Delete This Score Record?")) return;
    try {
      await Api.delete(`/scores/${scoreId}/`);
      fetchData();
    } catch {
      setErrorMsg("Failed To Delete Score Record.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#29050e] via-[#1b0308] to-[#29050e] border border-amber-500/40 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 mb-2">
          <Trophy className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Official Jury Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
          Jury Score Recording Deck
        </h1>
        <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
          Input Validated Jury Marks, Award Ranks, And Automatically Dispatch Points To The University Leaderboard.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Scoring Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Score Submission Form (Cols 1-5) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#160207] border border-rose-950/80 shadow-xl">
          <h2 className="text-base font-bold font-serif text-white mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Record New Jury Scorecard</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Competition Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
                Target Competition
              </label>
              <select
                value={selectedComp}
                onChange={(e) => setSelectedComp(Number(e.target.value) || "")}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0308] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="">-- Choose Competition --</option>
                {competitions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.category})
                  </option>
                ))}
              </select>
            </div>

            {/* College Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
                Contingent College
              </label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(Number(e.target.value) || "")}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0308] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
              >
                <option value="">-- Choose College --</option>
                {colleges.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name} ({col.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Rank Awarded */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
                Jury Standing / Rank
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { rank: 1, label: "1st (40 Pts)", icon: "🥇" },
                  { rank: 2, label: "2nd (25 Pts)", icon: "🥈" },
                  { rank: 3, label: "3rd (15 Pts)", icon: "🥉" },
                  { rank: 4, label: "Part (5 Pts)", icon: "🎖️" },
                ].map((item) => (
                  <button
                    key={item.rank}
                    type="button"
                    onClick={() => setRankAwarded(item.rank)}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-bold border transition-all ${
                      rankAwarded === item.rank
                        ? "bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/20"
                        : "bg-[#1c0308] text-rose-200 border-rose-950 hover:border-amber-500/40"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="block text-[10px] mt-0.5">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Raw Score */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
                Raw Jury Score (0 - 100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={rawScore}
                onChange={(e) => setRawScore(parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c0308] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
                Jury Notes & Feedback
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Exemplary Rhythm, Synchronization, And Theme Execution..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#1c0308] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Verification Check */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isVerified"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                className="rounded border-rose-950 text-amber-500 focus:ring-0"
              />
              <label htmlFor="isVerified" className="text-xs text-rose-200 font-medium">
                Sign Off As Verified Official Score
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Award className="w-4 h-4" />
              <span>{submitting ? "Committing Score..." : "Commit Score To Leaderboard"}</span>
            </button>
          </form>
        </div>

        {/* Existing Scores Table (Cols 6-12) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#160207] border border-rose-950/80 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold font-serif text-white">Recorded Scores Ledger</h2>
              <p className="text-xs text-rose-300/70">Historical Jury Log</p>
            </div>
            <button
              onClick={fetchData}
              className="p-2 rounded-xl bg-[#1c0308] border border-rose-950 text-amber-400 hover:text-white"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-rose-950 text-rose-400 uppercase font-bold text-[10px]">
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Competition</th>
                  <th className="py-2.5 px-3">College</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Points</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-950/60">
                {scores.map((score) => (
                  <tr key={score.id} className="hover:bg-rose-950/30 transition-colors">
                    <td className="py-3 px-3">
                      <span className="font-extrabold text-amber-300">
                        {score.rank_awarded === 1
                          ? "🥇 1st"
                          : score.rank_awarded === 2
                          ? "🥈 2nd"
                          : score.rank_awarded === 3
                          ? "🥉 3rd"
                          : "🎖️"}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-white">
                      {score.competition_title || `Event #${score.competition}`}
                    </td>
                    <td className="py-3 px-3 text-rose-200">
                      {score.college_name || `College #${score.college}`}
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-200">{score.raw_score} / 100</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                      +{score.points_awarded}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleDelete(score.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-900/50"
                        title="Delete Score"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminScores;
