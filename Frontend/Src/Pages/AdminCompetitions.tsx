import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import {
  CalendarCheck,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Filter,
  Play,
  Check,
  Trophy,
  Users,
} from "lucide-react";

const CATEGORIES = [
  { value: "ALL", label: "All Categories" },
  { value: "DANCE", label: "Dance" },
  { value: "MUSIC", label: "Music & Band" },
  { value: "THEATRE", label: "Theatre & Drama" },
  { value: "FINE_ARTS", label: "Fine Arts" },
  { value: "LITERARY", label: "Literary" },
  { value: "FASHION", label: "Fashion & Vogue" },
  { value: "DIGITAL_AI", label: "Digital & AI" },
  { value: "SPECIAL", label: "Special Highlight" },
];

export const AdminCompetitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeCompId, setActiveCompId] = useState<number | null>(null);
  const [deleteConfirmComp, setDeleteConfirmComp] = useState<any | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("DANCE");
  const [venue, setVenue] = useState("Rajeshwari Auditorium");
  const [scheduledAt, setScheduledAt] = useState("2026-11-18T10:00");
  const [roundName, setRoundName] = useState("Round 1");
  const [maxParticipants, setMaxParticipants] = useState(1);
  const [status, setStatus] = useState("UPCOMING");
  const [rules, setRules] = useState("");
  const [firstPoints, setFirstPoints] = useState(100);
  const [secondPoints, setSecondPoints] = useState(70);
  const [thirdPoints, setThirdPoints] = useState(40);

  const fetchCompetitions = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/competitions/");
      const data = res.data.results || res.data || [];
      setCompetitions(data);
    } catch {
      showFeedbackMessage("error", "Failed To Load Competitions List.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const showFeedbackMessage = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setActiveCompId(null);
    setTitle("");
    setCode(`EVT-${Math.floor(100 + Math.random() * 900)}`);
    setCategory("DANCE");
    setVenue("Rajeshwari Auditorium");
    setScheduledAt("2026-11-18T10:00");
    setRoundName("Round 1");
    setMaxParticipants(1);
    setStatus("UPCOMING");
    setRules("");
    setFirstPoints(100);
    setSecondPoints(70);
    setThirdPoints(40);
    setShowModal(true);
  };

  const openEditModal = (comp: any) => {
    setIsEditing(true);
    setActiveCompId(comp.id);
    setTitle(comp.title || "");
    setCode(comp.code || "");
    setCategory(comp.category || "DANCE");
    setVenue(comp.venue || "Rajeshwari Auditorium");
    setScheduledAt(comp.scheduled_at ? comp.scheduled_at.substring(0, 16) : "2026-11-18T10:00");
    setRoundName(comp.round_name || "Round 1");
    setMaxParticipants(comp.max_participants_per_college || 1);
    setStatus(comp.status || "UPCOMING");
    setRules(comp.rules || "");
    setFirstPoints(comp.first_place_points || 100);
    setSecondPoints(comp.second_place_points || 70);
    setThirdPoints(comp.third_place_points || 40);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) {
      showFeedbackMessage("error", "Event Title and Code are required.");
      return;
    }

    const payload = {
      title: title.trim(),
      code: code.trim().toUpperCase(),
      category,
      venue: venue.trim(),
      scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null,
      round_name: roundName.trim(),
      max_participants_per_college: Number(maxParticipants) || 1,
      status,
      rules: rules.trim(),
      first_place_points: Number(firstPoints) || 100,
      second_place_points: Number(secondPoints) || 70,
      third_place_points: Number(thirdPoints) || 40,
      participation_points: 10,
    };

    try {
      if (isEditing && activeCompId) {
        await Api.patch(`/competitions/${activeCompId}/`, payload);
        showFeedbackMessage("success", `Updated ${payload.title} Successfully!`);
      } else {
        await Api.post("/competitions/", payload);
        showFeedbackMessage("success", `Created ${payload.title} Successfully!`);
      }
      setShowModal(false);
      fetchCompetitions();
    } catch (err: any) {
      const errDetail = err.response?.data?.detail || err.response?.data?.code?.[0] || "Failed to save competition details.";
      showFeedbackMessage("error", String(errDetail));
    }
  };

  const handleQuickStatusChange = async (comp: any, newStatus: string) => {
    try {
      await Api.patch(`/competitions/${comp.id}/`, { status: newStatus });
      showFeedbackMessage("success", `Event Status Updated to ${newStatus}`);
      fetchCompetitions();
    } catch {
      showFeedbackMessage("error", "Failed to update event status.");
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmComp) return;
    try {
      await Api.delete(`/competitions/${deleteConfirmComp.id}/`);
      showFeedbackMessage("success", `Deleted ${deleteConfirmComp.title} from roster.`);
      setDeleteConfirmComp(null);
      fetchCompetitions();
    } catch {
      showFeedbackMessage("error", "Failed to delete competition.");
    }
  };

  const filteredCompetitions = competitions.filter((comp) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      comp.title?.toLowerCase().includes(q) ||
      comp.code?.toLowerCase().includes(q) ||
      comp.venue?.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === "ALL" || comp.category === selectedCategory;
    const matchesStatus = selectedStatus === "ALL" || comp.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const statusBadge = (s: string) => {
    if (s === "ONGOING") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-400/50 text-[10px] font-black uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Live Arena
        </span>
      );
    }
    if (s === "COMPLETED") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950/70 text-purple-300 border border-purple-400/50 text-[10px] font-black uppercase">
          <Check className="w-3 h-3" />
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950/50 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase">
        <Clock className="w-3 h-3" />
        Upcoming
      </span>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl animate-fade-in text-xs font-bold ${
            feedback.type === "success"
              ? "bg-emerald-950/90 border-emerald-400 text-emerald-200"
              : "bg-rose-950/90 border-rose-500 text-rose-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-4 min-[340px]:p-6 sm:p-8 rounded-2xl min-[340px]:rounded-3xl bg-gradient-to-r from-[#1c030d] via-[#100106] to-[#1c030d] border-2 border-amber-400/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Master Competition Grid</span>
          </div>
          <h1 className="text-xl min-[340px]:text-2xl sm:text-3xl font-serif font-black text-white">
            Competitions Roster & Arena Scheduling
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1 max-w-2xl leading-relaxed">
            Create, schedule, manage scoring rubrics, and control live status for all 22+ official festival competitive events.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="w-full md:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black font-serif font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Add New Competition</span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300/80">Total Events</p>
          <p className="text-2xl sm:text-3xl font-serif font-black text-white mt-1">{competitions.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Live Arenas</p>
          <p className="text-2xl sm:text-3xl font-serif font-black text-emerald-400 mt-1">
            {competitions.filter((c) => c.status === "ONGOING").length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-purple-300">Judged & Completed</p>
          <p className="text-2xl sm:text-3xl font-serif font-black text-purple-300 mt-1">
            {competitions.filter((c) => c.status === "COMPLETED").length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">Scheduled Ahead</p>
          <p className="text-2xl sm:text-3xl font-serif font-black text-amber-300 mt-1">
            {competitions.filter((c) => c.status === "UPCOMING").length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/60" />
          <input
            type="text"
            placeholder="Search by event title, code, or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#140209] border border-amber-500/30 text-xs text-white placeholder-rose-300/40 focus:border-amber-400 focus:outline-none transition-colors shadow-inner"
          />
        </div>

        {/* Category & Status Selectors */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#140209] border border-amber-500/30 text-xs text-amber-200 focus:outline-none focus:border-amber-400 font-bold"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value} className="bg-[#140209] text-white">
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#140209] border border-amber-500/30 text-xs text-amber-200 focus:outline-none focus:border-amber-400 font-bold"
          >
            <option value="ALL" className="bg-[#140209] text-white">All Statuses</option>
            <option value="UPCOMING" className="bg-[#140209] text-white">Upcoming Only</option>
            <option value="ONGOING" className="bg-[#140209] text-white">Live Only</option>
            <option value="COMPLETED" className="bg-[#140209] text-white">Completed Only</option>
          </select>
        </div>
      </div>

      {/* Grid of Competitions */}
      {loading ? (
        <div className="p-12 text-center text-amber-400 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider text-rose-300">Loading Events...</span>
        </div>
      ) : filteredCompetitions.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#120208] border border-amber-500/20 text-center">
          <CalendarCheck className="w-10 h-10 text-amber-400/50 mx-auto mb-2" />
          <p className="text-sm font-bold text-amber-200">No matching events found</p>
          <p className="text-xs text-rose-300/60 mt-1">Try resetting search filters or add a new competition.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCompetitions.map((comp) => (
            <div
              key={comp.id}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#16020b]/95 via-[#0e0106]/98 to-[#060002] border-2 border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 shadow-xl shadow-black/60 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Code, Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-sm">
                    {comp.code}
                  </span>
                  {statusBadge(comp.status)}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
                  {comp.title}
                </h3>

                <div className="mt-3 pt-3 border-t border-amber-500/15 space-y-1.5 text-xs text-rose-200/80">
                  <p className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{comp.venue || "Rajeshwari Auditorium"}</span>
                  </p>
                  <p className="flex items-center gap-1.5 text-amber-300/90 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      {comp.scheduled_at ? new Date(comp.scheduled_at).toLocaleString() : "Date To Be Announced"}
                    </span>
                  </p>
                  <p className="text-[11px] text-rose-300/70">
                    Points: <strong className="text-yellow-400">1st: {comp.first_place_points}</strong> | <strong className="text-slate-300">2nd: {comp.second_place_points}</strong> | <strong className="text-amber-500">3rd: {comp.third_place_points}</strong>
                  </p>
                </div>
              </div>

              {/* Bottom: Quick Status Actions & CRUD */}
              <div className="mt-4 pt-3 border-t border-amber-500/20 flex flex-col gap-2">
                {/* 1-Click Status Toggler */}
                <div className="flex items-center gap-1.5 text-[10px] font-bold">
                  <span className="text-rose-300/60">Set:</span>
                  <button
                    onClick={() => handleQuickStatusChange(comp, "UPCOMING")}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      comp.status === "UPCOMING" ? "bg-amber-500 text-black font-black" : "bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => handleQuickStatusChange(comp, "ONGOING")}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      comp.status === "ONGOING" ? "bg-emerald-500 text-black font-black" : "bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    Live
                  </button>
                  <button
                    onClick={() => handleQuickStatusChange(comp, "COMPLETED")}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      comp.status === "COMPLETED" ? "bg-purple-500 text-white font-black" : "bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    Done
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-amber-400/80 font-bold uppercase tracking-wider">
                    {comp.round_name || "Round 1"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(comp)}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirmComp(comp)}
                      className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl sm:rounded-3xl bg-[#140209] border-2 border-amber-500/40 p-5 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <CalendarCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {isEditing ? "Modify Competition" : "Register Event"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-white">
              {isEditing ? "Edit Competition Details" : "Schedule New Competition"}
            </h2>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Battle of the Bands: Electric Rock"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MUS-01"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs font-mono font-bold text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors font-bold"
                  >
                    {CATEGORIES.filter((c) => c.value !== "ALL").map((c) => (
                      <option key={c.value} value={c.value} className="bg-[#140209] text-white">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Arena Venue
                  </label>
                  <input
                    type="text"
                    placeholder="Rajeshwari Auditorium"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Scheduled Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Round Name
                  </label>
                  <input
                    type="text"
                    placeholder="Round 1 / Finals"
                    value={roundName}
                    onChange={(e) => setRoundName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors font-bold"
                  >
                    <option value="UPCOMING" className="bg-[#140209] text-white">Upcoming</option>
                    <option value="ONGOING" className="bg-[#140209] text-white">Ongoing / Live</option>
                    <option value="COMPLETED" className="bg-[#140209] text-white">Completed & Judged</option>
                  </select>
                </div>
              </div>

              {/* Championship Points Distribution */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Championship Points (1st / 2nd / 3rd)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    value={firstPoints}
                    onChange={(e) => setFirstPoints(Number(e.target.value))}
                    placeholder="100"
                    className="px-3 py-2 rounded-xl bg-[#0a0105] border border-amber-500/30 text-xs text-yellow-300 font-bold focus:outline-none text-center"
                  />
                  <input
                    type="number"
                    value={secondPoints}
                    onChange={(e) => setSecondPoints(Number(e.target.value))}
                    placeholder="70"
                    className="px-3 py-2 rounded-xl bg-[#0a0105] border border-amber-500/30 text-xs text-slate-300 font-bold focus:outline-none text-center"
                  />
                  <input
                    type="number"
                    value={thirdPoints}
                    onChange={(e) => setThirdPoints(Number(e.target.value))}
                    placeholder="40"
                    className="px-3 py-2 rounded-xl bg-[#0a0105] border border-amber-500/30 text-xs text-amber-500 font-bold focus:outline-none text-center"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Rules, Time Limits & Evaluation Criteria
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter specific event rules, judging criteria, and time constraints..."
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

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
                  {isEditing ? "Save Changes" : "Create Competition"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmComp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-[#160209] border-2 border-rose-500/50 p-6 shadow-2xl relative">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-black text-white text-center">
              Remove Event?
            </h3>
            <p className="text-xs text-rose-200/80 text-center mt-2">
              Are you sure you want to delete <strong className="text-white">{deleteConfirmComp.title} ({deleteConfirmComp.code})</strong>? Any jury scorecards for this event will also be deleted.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmComp(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/15 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-lg shadow-rose-900/50"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCompetitions;
