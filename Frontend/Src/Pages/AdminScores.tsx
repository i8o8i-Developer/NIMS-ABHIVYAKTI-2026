import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import {
  Trophy,
  Award,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit,
  Search,
  Filter,
  Sparkles,
  X,
  ShieldCheck,
  Building2,
  Medal,
  Sliders,
  Check,
  Clock,
} from "lucide-react";

export const AdminScores: React.FC = () => {
  const [scores, setScores] = useState<any[]>([]);
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompFilter, setSelectedCompFilter] = useState<string>("ALL");
  const [selectedRankFilter, setSelectedRankFilter] = useState<string>("ALL");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeScoreId, setActiveScoreId] = useState<number | null>(null);
  const [deleteConfirmScore, setDeleteConfirmScore] = useState<any | null>(null);

  // Form Fields
  const [competitionId, setCompetitionId] = useState<number | "">("");
  const [collegeId, setCollegeId] = useState<number | "">("");
  const [participantName, setParticipantName] = useState<string>("");
  const [rank, setRank] = useState<number>(1);
  const [rawScore, setRawScore] = useState<number>(90);
  const [pointsAwarded, setPointsAwarded] = useState<number>(40);
  const [remarks, setRemarks] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [scoresRes, compsRes, colsRes] = await Promise.all([
        Api.get("/scores/"),
        Api.get("/competitions/"),
        Api.get("/colleges/"),
      ]);

      const scoresData = Array.isArray(scoresRes.data) ? scoresRes.data : Array.isArray(scoresRes.data?.results) ? scoresRes.data.results : [];
      const compsData = compsRes.data.results || compsRes.data || [];
      const colsData = colsRes.data.results || colsRes.data || [];

      setScores(scoresData);
      setCompetitions(compsData);
      setColleges(colsData);
    } catch {
      showFeedbackMessage("error", "Failed To Load Live Scoring Records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showFeedbackMessage = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Auto-calculate points based on selected competition rules and rank
  const handleRankChange = (newRank: number, compId?: number | "") => {
    setRank(newRank);
    const targetCompId = compId !== undefined ? compId : competitionId;
    const comp = competitions.find((c) => c.id === Number(targetCompId));

    if (newRank === 1) {
      setPointsAwarded(comp ? Number(comp.first_place_points || 40) : 40);
    } else if (newRank === 2) {
      setPointsAwarded(comp ? Number(comp.second_place_points || 25) : 25);
    } else if (newRank === 3) {
      setPointsAwarded(comp ? Number(comp.third_place_points || 15) : 15);
    } else {
      setPointsAwarded(comp ? Number(comp.participation_points || 5) : 5);
    }
  };

  const handleCompetitionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cid = e.target.value === "" ? "" : Number(e.target.value);
    setCompetitionId(cid);
    if (cid !== "") {
      handleRankChange(rank, cid);
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setActiveScoreId(null);
    const defaultCompId = competitions.length > 0 ? competitions[0].id : "";
    const defaultColId = colleges.length > 0 ? colleges[0].id : "";
    setCompetitionId(defaultCompId);
    setCollegeId(defaultColId);
    setParticipantName("");
    setRank(1);
    setRawScore(90);
    const comp = competitions.find((c) => c.id === defaultCompId);
    setPointsAwarded(comp ? Number(comp.first_place_points || 40) : 40);
    setRemarks("");
    setIsVerified(true);
    setShowModal(true);
  };

  const openEditModal = (score: any) => {
    setIsEditing(true);
    setActiveScoreId(score.id);
    setCompetitionId(score.competition || "");
    setCollegeId(score.college || "");
    setParticipantName(score.participant_name || "");
    setRank(score.rank !== null && score.rank !== undefined ? Number(score.rank) : 0);
    setRawScore(Number(score.raw_score || 0));
    setPointsAwarded(Number(score.points_awarded || 0));
    setRemarks(score.remarks || "");
    setIsVerified(score.is_verified ?? true);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!competitionId || !collegeId) {
      showFeedbackMessage("error", "Both Competition and College must be selected.");
      return;
    }

    const payload = {
      competition: Number(competitionId),
      college: Number(collegeId),
      rank: rank === 0 ? null : Number(rank),
      raw_score: Number(rawScore),
      points_awarded: Number(pointsAwarded),
      remarks: remarks.trim(),
      is_verified: isVerified,
    };

    try {
      if (isEditing && activeScoreId) {
        await Api.patch(`/scores/${activeScoreId}/`, payload);
        showFeedbackMessage("success", "Scorecard Updated Successfully!");
      } else {
        await Api.post("/scores/", payload);
        showFeedbackMessage("success", "Jury Scorecard Logged Into Central Leaderboard!");
      }
      setShowModal(false);
      fetchData();
    } catch (err: any) {
      const errDetail =
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        "Failed to save jury score.";
      showFeedbackMessage("error", String(errDetail));
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmScore) return;
    try {
      await Api.delete(`/scores/${deleteConfirmScore.id}/`);
      showFeedbackMessage("success", "Scorecard Revoked & Points Recalculated!");
      setDeleteConfirmScore(null);
      fetchData();
    } catch (err: any) {
      showFeedbackMessage("error", "Failed To Delete Scorecard.");
    }
  };

  // Filtered list
  const safeScores = Array.isArray(scores) ? scores : [];
  const filteredScores = safeScores.filter((score) => {
    const matchesSearch =
      (score.competition_title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (score.college_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (score.college_code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (score.remarks || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (score.participant_name || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesComp =
      selectedCompFilter === "ALL" || String(score.competition) === selectedCompFilter;

    const matchesRank =
      selectedRankFilter === "ALL" ||
      (selectedRankFilter === "1" && score.rank === 1) ||
      (selectedRankFilter === "2" && score.rank === 2) ||
      (selectedRankFilter === "3" && score.rank === 3) ||
      (selectedRankFilter === "PARTICIPATION" && (!score.rank || score.rank === 0));

    return matchesSearch && matchesComp && matchesRank;
  });

  // KPI Calculations
  const totalScores = safeScores.length;
  const goldCount = safeScores.filter((s) => s.rank === 1).length;
  const silverCount = safeScores.filter((s) => s.rank === 2).length;
  const bronzeCount = safeScores.filter((s) => s.rank === 3).length;
  const totalPointsDistributed = safeScores.reduce((acc, s) => acc + Number(s.points_awarded || 0), 0);

  const getRankBadge = (r: number | null | undefined) => {
    if (r === 1) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500/25 to-yellow-500/10 text-amber-300 border border-amber-400/50 shadow-sm shadow-amber-500/20">
          <span>🥇</span> 1st Gold Champion
        </span>
      );
    }
    if (r === 2) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-slate-400/25 to-zinc-400/10 text-slate-200 border border-slate-300/50 shadow-sm shadow-slate-400/20">
          <span>🥈</span> 2nd Silver Runner-Up
        </span>
      );
    }
    if (r === 3) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-700/25 to-amber-900/20 text-amber-500 border border-amber-600/50 shadow-sm shadow-amber-700/20">
          <span>🥉</span> 3rd Bronze Runner-Up
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/5 text-rose-200/80 border border-white/10">
        <span>🎖️</span> Participation
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in text-amber-50">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all animate-bounce ${
            feedback.type === "success"
              ? "bg-emerald-950/90 border-emerald-500/60 text-emerald-200 shadow-emerald-900/50"
              : "bg-rose-950/90 border-rose-500/60 text-rose-200 shadow-rose-900/50"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-semibold">{feedback.message}</span>
          <button onClick={() => setFeedback(null)} className="ml-2 text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#17030c] via-[#0d0106] to-[#17030c] border border-amber-500/35 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-1.5">
            <Trophy className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              Championship Central Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wide">
            Jury Scoring & Medals Engine
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1 max-w-2xl">
            Record Official Marks, Award Medals, And Distribute Real-Time Institutional Championship Points.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black font-serif font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Award New Score / Medal</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Total Scorecards
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-white">{totalScores}</span>
            <span className="text-xs font-mono font-bold text-amber-400">Official</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Points Awarded
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-amber-300">
              {totalPointsDistributed}
            </span>
            <span className="text-xs font-mono font-bold text-amber-400">PTS</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Gold Champions
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-yellow-300">{goldCount}</span>
            <span className="text-xs text-yellow-400">🥇 Gold</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Silver & Bronze
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-white">
              {silverCount + bronzeCount}
            </span>
            <span className="text-xs text-slate-300">🥈 {silverCount} 🥉 {bronzeCount}</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400/80 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Competition, College, Lead, or Notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#140209] border border-amber-500/30 text-xs text-white placeholder-rose-300/40 focus:border-amber-400 focus:outline-none transition-colors shadow-inner"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Competition Filter */}
          <select
            value={selectedCompFilter}
            onChange={(e) => setSelectedCompFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#140209] border border-amber-500/30 text-xs text-amber-200 focus:border-amber-400 focus:outline-none transition-colors"
          >
            <option value="ALL">All Competitions ({competitions.length})</option>
            {competitions.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.title}
              </option>
            ))}
          </select>

          {/* Rank Filter */}
          <select
            value={selectedRankFilter}
            onChange={(e) => setSelectedRankFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#140209] border border-amber-500/30 text-xs text-amber-200 focus:border-amber-400 focus:outline-none transition-colors"
          >
            <option value="ALL">All Ranks</option>
            <option value="1">🥇 1st Gold</option>
            <option value="2">🥈 2nd Silver</option>
            <option value="3">🥉 3rd Bronze</option>
            <option value="PARTICIPATION">🎖️ Participation</option>
          </select>

          {(searchTerm || selectedCompFilter !== "ALL" || selectedRankFilter !== "ALL") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCompFilter("ALL");
                setSelectedRankFilter("ALL");
              }}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Scores Table & Cards View */}
      {loading ? (
        <div className="p-12 text-center">
          <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-rose-200/80 font-serif">Synchronizing Jury Scorecards...</p>
        </div>
      ) : filteredScores.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#120208] border border-amber-500/20 text-center">
          <Trophy className="w-10 h-10 text-amber-500/40 mx-auto mb-3" />
          <p className="text-sm font-serif font-bold text-white">No Scorecards Found</p>
          <p className="text-xs text-rose-300/70 mt-1">
            {searchTerm || selectedCompFilter !== "ALL" || selectedRankFilter !== "ALL"
              ? "Try adjusting your filters or search keywords."
              : "Click 'Award New Score / Medal' to record the first jury evaluation."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-hidden rounded-2xl bg-[#120208]/90 border border-amber-500/25 shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-amber-500/20 bg-[#17030c] text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Competition</th>
                  <th className="py-3.5 px-4">College / Contingent</th>
                  <th className="py-3.5 px-4">Standing / Medal</th>
                  <th className="py-3.5 px-4">Raw Marks</th>
                  <th className="py-3.5 px-4">Points</th>
                  <th className="py-3.5 px-4">Remarks</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/10">
                {filteredScores.map((score) => (
                  <tr key={score.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-serif font-black text-white text-xs sm:text-sm">
                        {score.competition_title}
                      </div>
                      <div className="text-[10px] text-rose-300/70">{score.competition_venue}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: score.college_avatar_color || "#F59E0B" }}
                        />
                        <div>
                          <div className="font-bold text-white text-xs">{score.college_name}</div>
                          <div className="text-[10px] text-amber-400 font-mono">
                            {score.college_code} {score.participant_name ? `• ${score.participant_name}` : ""}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">{getRankBadge(score.rank)}</td>

                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {score.raw_score} <span className="text-[10px] text-rose-300/60">/ 100</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-black text-amber-400 text-sm">
                      +{score.points_awarded} <span className="text-[10px] text-amber-500/80">PTS</span>
                    </td>

                    <td className="py-3.5 px-4 text-rose-200/80 max-w-xs truncate text-[11px]">
                      {score.remarks || "—"}
                    </td>

                    <td className="py-3.5 px-4">
                      {score.is_verified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <Check className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(score)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/20 transition-colors"
                          title="Edit Score"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmScore(score)}
                          className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-200 border border-rose-800/40 transition-colors"
                          title="Revoke Score"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet Cards View (Down to 280px) */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredScores.map((score) => (
              <div
                key={score.id}
                className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 shadow-lg space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-black text-white text-sm">
                      {score.competition_title}
                    </h3>
                    <p className="text-[10px] text-rose-300/70">{score.competition_venue}</p>
                  </div>
                  <span className="font-mono font-black text-amber-400 text-sm px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/25">
                    +{score.points_awarded} PTS
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0d0106] border border-amber-500/15 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{score.college_name}</p>
                    <p className="text-[10px] text-amber-400 font-mono">
                      {score.college_code} {score.participant_name ? `• ${score.participant_name}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-rose-300/60 uppercase">Marks</p>
                    <p className="text-xs font-mono font-bold text-white">{score.raw_score}/100</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <div>{getRankBadge(score.rank)}</div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(score)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/20 transition-colors flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirmScore(score)}
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Award / Edit Score Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-[#140209] border-2 border-amber-500/40 p-5 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-rose-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 text-amber-400 mb-1">
              <Trophy className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">
                {isEditing ? "Modify Scorecard" : "Award Score & Medals"}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-black text-white">
              {isEditing ? "Edit Jury Score Record" : "Log New Championship Marks"}
            </h2>
            <p className="text-xs text-rose-200/80 mt-1 mb-5">
              Award podium rankings, assign direct marks, and distribute official championship points.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Competition Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Official Competition *
                </label>
                <select
                  required
                  value={competitionId}
                  onChange={handleCompetitionChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="">Select Competition...</option>
                  {competitions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* College Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Competing College / Institute *
                </label>
                <select
                  required
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                >
                  <option value="">Select College...</option>
                  {colleges.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.name} ({col.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Participant Student (Optional) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Participant Student / Lead Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aryan Sharma (Leave blank if group/team)"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              {/* Rank / Standing Radios */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-2">
                  Podium Ranking & Medal *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRankChange(1)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      rank === 1
                        ? "bg-amber-500/25 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20"
                        : "bg-white/5 border-white/10 text-rose-200/70 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-lg">🥇</div>
                    <div className="text-[11px] font-black uppercase mt-1">1st Gold</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRankChange(2)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      rank === 2
                        ? "bg-slate-400/25 border-slate-300 text-slate-100 shadow-md shadow-slate-400/20"
                        : "bg-white/5 border-white/10 text-rose-200/70 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-lg">🥈</div>
                    <div className="text-[11px] font-black uppercase mt-1">2nd Silver</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRankChange(3)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      rank === 3
                        ? "bg-amber-800/30 border-amber-600 text-amber-400 shadow-md shadow-amber-800/20"
                        : "bg-white/5 border-white/10 text-rose-200/70 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-lg">🥉</div>
                    <div className="text-[11px] font-black uppercase mt-1">3rd Bronze</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRankChange(0)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      rank === 0
                        ? "bg-white/20 border-white/40 text-white shadow-md"
                        : "bg-white/5 border-white/10 text-rose-200/70 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-lg">🎖️</div>
                    <div className="text-[11px] font-black uppercase mt-1">Participant</div>
                  </button>
                </div>
              </div>

              {/* Raw Marks & Points Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Jury Raw Marks (0–100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    required
                    value={rawScore}
                    onChange={(e) => setRawScore(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs font-mono font-bold text-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Championship Points Awarded
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={pointsAwarded}
                    onChange={(e) => setPointsAwarded(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs font-mono font-black text-amber-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Jury Comments / Technical Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Flawless synchronization and rhythm execution in finals."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Verified Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="w-4 h-4 rounded border-amber-500/40 text-amber-500 focus:ring-0 bg-[#0a0105]"
                />
                <span className="text-xs font-bold text-white">
                  Mark as Officially Verified Result (instantly affects live leaderboard)
                </span>
              </label>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-rose-200 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black font-serif font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all"
                >
                  {isEditing ? "Save Modifications" : "Record Scorecard"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Revoke / Delete Confirmation Modal */}
      {deleteConfirmScore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-[#160209] border-2 border-rose-500/50 p-6 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-black text-white">
              Revoke Scorecard?
            </h3>
            <p className="text-xs text-rose-200/80 mt-2">
              Are you sure you want to revoke this scorecard for{" "}
              <strong className="text-white">{deleteConfirmScore.competition_title}</strong> awarded to{" "}
              <strong className="text-white">{deleteConfirmScore.college_name}</strong>?
            </p>
            <p className="text-[11px] text-amber-400 font-mono mt-2 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
              ⚠️ {deleteConfirmScore.points_awarded} championship points will be subtracted from this institute.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmScore(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/15 transition-colors"
              >
                Keep Score
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-lg shadow-rose-900/50"
              >
                Confirm Revoke
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminScores;
