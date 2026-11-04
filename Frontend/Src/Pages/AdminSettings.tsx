import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import {
  Sliders,
  Save,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Sparkles,
  Radio,
  Lock,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Volume2,
  ShieldCheck,
  Building2,
  FileText,
  Star,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ChevronRight,
} from "lucide-react";

export const AdminSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Festival Identity
  const [eventName, setEventName] = useState("NIMS Abhivyakti 2026");
  const [tagline, setTagline] = useState("Celebrating Cultural Majesty & Excellence");
  const [edition, setEdition] = useState("2026");
  const [dateRangeDisplay, setDateRangeDisplay] = useState("18–21 November 2026");
  const [venue, setVenue] = useState(
    "Multiple Campus Arenas: Rajeshwari Auditorium, School Of Law, Manik / NIET & Cricket Ground"
  );

  // Separate Date & Time Selectors for Countdown Kickoff
  const [kickoffDate, setKickoffDate] = useState("2026-11-18");
  const [kickoffTime, setKickoffTime] = useState("09:00");

  // Marquee Announcements
  const [announcements, setAnnouncements] = useState<string[]>([
    "NIMS University Cultural Championship 2026 • 18-21 November 2026",
    "Abhivyakti 2026 Prestigious Championship Rolling Trophy",
    "Day 1: Groove-o-Mania & Harmony Hustle Prelims Live",
    "Day 2: Couture Upcycling & Visual Arts Arena",
    "Day 3: SoloFlix Mono Act & Literature Quiz Finale",
    "Day 4: Grand Finale & Couture Clique at Cricket Ground",
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  // Feature Flags
  const [featureFlags, setFeatureFlags] = useState<{
    live_leaderboard_active: boolean;
    jury_scoring_open: boolean;
    rules_download_active: boolean;
    star_night_banner_active: boolean;
  }>({
    live_leaderboard_active: true,
    jury_scoring_open: true,
    rules_download_active: true,
    star_night_banner_active: true,
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/settings/");
      if (res.data) {
        const d = res.data;
        if (d.event_name) setEventName(d.event_name);
        if (d.tagline) setTagline(d.tagline);
        if (d.edition) setEdition(d.edition);
        if (d.date_range_display) setDateRangeDisplay(d.date_range_display);
        if (d.venue) setVenue(d.venue);
        if (d.start_date) {
          const dt = new Date(d.start_date);
          if (!isNaN(dt.getTime())) {
            const yyyy = dt.getFullYear();
            const mm = String(dt.getMonth() + 1).padStart(2, "0");
            const dd = String(dt.getDate()).padStart(2, "0");
            const hh = String(dt.getHours()).padStart(2, "0");
            const min = String(dt.getMinutes()).padStart(2, "0");
            setKickoffDate(`${yyyy}-${mm}-${dd}`);
            setKickoffTime(`${hh}:${min}`);
          }
        }
        if (Array.isArray(d.marquee_announcements) && d.marquee_announcements.length > 0) {
          setAnnouncements(d.marquee_announcements);
        }
        if (d.feature_flags && typeof d.feature_flags === "object") {
          setFeatureFlags({
            live_leaderboard_active: d.feature_flags.live_leaderboard_active ?? true,
            jury_scoring_open: d.feature_flags.jury_scoring_open ?? true,
            rules_download_active: d.feature_flags.rules_download_active ?? true,
            star_night_banner_active: d.feature_flags.star_night_banner_active ?? true,
          });
        }
      }
    } catch {
      showFeedbackMessage("error", "Failed To Load Festival Parameters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const showFeedbackMessage = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const formatDisplayDateTime = (dStr: string, tStr: string) => {
    try {
      const dt = new Date(`${dStr}T${tStr}:00`);
      if (isNaN(dt.getTime())) return `${dStr} ${tStr}`;
      return dt.toLocaleString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    } catch {
      return `${dStr} ${tStr}`;
    }
  };

  const getRemainingDays = (dStr: string, tStr: string) => {
    try {
      const dt = new Date(`${dStr}T${tStr}:00`);
      const diff = dt.getTime() - Date.now();
      if (diff <= 0) return "Event Kickoff In Progress";
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      return `${days} Days, ${hours} Hours Remaining`;
    } catch {
      return "";
    }
  };

  const handleAddAnnouncement = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newAnnouncement.trim()) return;
    setAnnouncements([...announcements, newAnnouncement.trim()]);
    setNewAnnouncement("");
  };

  const handleRemoveAnnouncement = (index: number) => {
    setAnnouncements(announcements.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const handleStartEdit = (index: number, currentText: string) => {
    setEditingIndex(index);
    setEditingText(currentText);
  };

  const handleSaveEdit = (index: number) => {
    if (!editingText.trim()) return;
    const updated = [...announcements];
    updated[index] = editingText.trim();
    setAnnouncements(updated);
    setEditingIndex(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  const handleMoveAnnouncement = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= announcements.length) return;
    const updated = [...announcements];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setAnnouncements(updated);
  };

  const handleToggleFlag = (key: keyof typeof featureFlags) => {
    setFeatureFlags((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const combinedDateTime = new Date(`${kickoffDate}T${kickoffTime}:00`);
      const payload = {
        event_name: eventName.trim(),
        tagline: tagline.trim(),
        edition: edition.trim(),
        date_range_display: dateRangeDisplay.trim(),
        venue: venue.trim(),
        start_date: isNaN(combinedDateTime.getTime())
          ? "2026-11-18T09:00:00+05:30"
          : combinedDateTime.toISOString(),
        marquee_announcements: announcements,
        feature_flags: featureFlags,
      };

      const res = await Api.patch("/settings/", payload);
      if (res.data?.status === "Success" || res.status === 200) {
        showFeedbackMessage("success", "Festival System Parameters Synchronized In Real Time!");
      } else {
        showFeedbackMessage("success", "Festival Parameters Saved Successfully!");
      }
    } catch (err: any) {
      showFeedbackMessage("error", "Failed To Save Festival Settings. Please Check Directorate Permissions.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-amber-50 max-w-5xl mx-auto pb-12">
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
            <Sliders className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              Platform Master Orchestration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wide">
            System & Festival Parameters
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1 max-w-2xl">
            Live Running Tickers, Countdown Timers, Remote Feature Flags, And Institutional Identity.
          </p>
        </div>

        <button
          onClick={() => handleSave()}
          disabled={saving}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 disabled:opacity-50 text-black font-serif font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          {saving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 stroke-[3]" />
              <span>Save System Parameters</span>
            </>
          )}
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center">
          <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-rose-200/80 font-serif">Loading System Parameters...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Event Identity */}
          <div className="p-5 sm:p-7 rounded-3xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-amber-500/15">
              <Building2 className="w-5 h-5 text-amber-400" />
              <h2 className="font-serif font-black text-lg text-white">
                Festival Identity & Dates
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Official Event Name *
                </label>
                <input
                  type="text"
                  required
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Edition String
                </label>
                <input
                  type="text"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                Official Festival Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Date Range Display *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 18–21 November 2026"
                  value={dateRangeDisplay}
                  onChange={(e) => setDateRangeDisplay(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                />
                <p className="text-[10px] text-rose-300/60 mt-1">
                  Official 4-day festival window (Wednesday 18 to Saturday 21 November 2026).
                </p>
              </div>

              {/* DATE AND TIME SELECTOR (SEPARATE DATE & TIME PICKERS) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90">
                  Countdown Kickoff Date & Time *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Separate Date Selector */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      required
                      value={kickoffDate}
                      onChange={(e) => setKickoffDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs font-mono text-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Separate Time Selector */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <input
                      type="time"
                      required
                      value={kickoffTime}
                      onChange={(e) => setKickoffTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs font-mono text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Formatted Preview Badge & Quick Presets */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="text-[10px] sm:text-[11px] font-mono text-amber-300 flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/25">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{formatDisplayDateTime(kickoffDate, kickoffTime)}</span>
                    <span className="text-rose-300/80">• {getRemainingDays(kickoffDate, kickoffTime)}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1">
                    <button
                      type="button"
                      onClick={() => { setKickoffDate("2026-11-18"); setKickoffTime("09:00"); }}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 text-rose-200 hover:text-amber-300 transition-colors"
                    >
                      18 Nov 9 AM
                    </button>
                    <button
                      type="button"
                      onClick={() => { setKickoffDate("2026-11-18"); setKickoffTime("10:00"); }}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 text-rose-200 hover:text-amber-300 transition-colors"
                    >
                      18 Nov 10 AM
                    </button>
                    <button
                      type="button"
                      onClick={() => { setKickoffDate("2026-11-21"); setKickoffTime("11:00"); }}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 text-rose-200 hover:text-amber-300 transition-colors"
                    >
                      Finale 21 Nov
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                Official Venue Location
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Section 2: Live Marquee Announcements */}
          <div className="p-5 sm:p-7 rounded-3xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/15">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-5 h-5 text-amber-400" />
                <div>
                  <h2 className="font-serif font-black text-lg text-white">
                    Live Marquee Broadcast Ticker
                  </h2>
                  <p className="text-[11px] text-rose-300/70">
                    Continuous rolling ticker messages broadcast across the public festival header.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                {announcements.length} Messages
              </span>
            </div>

            {/* Add New Announcement Form */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Type new headline announcement (e.g. Finals Schedule Released)..."
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAnnouncement();
                  }
                }}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => handleAddAnnouncement()}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Ticker</span>
              </button>
            </div>

            {/* Announcements List with Reorder, Inline Edit & Delete */}
            <div className="space-y-2">
              {announcements.map((msg, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#0a0105] border border-amber-500/20 hover:border-amber-500/40 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                      {index + 1}
                    </span>

                    {editingIndex === index ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleSaveEdit(index);
                            } else if (e.key === "Escape") {
                              handleCancelEdit();
                            }
                          }}
                          autoFocus
                          className="flex-1 px-3 py-1.5 rounded-lg bg-[#140209] border border-amber-400 text-xs text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(index)}
                          className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300"
                          title="Save Changes"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/40 text-rose-300"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-white font-medium truncate flex-1">{msg}</p>
                    )}
                  </div>

                  {editingIndex !== index && (
                    <div className="flex items-center gap-1 shrink-0">
                      {/* Reorder Buttons */}
                      <button
                        type="button"
                        onClick={() => handleMoveAnnouncement(index, "up")}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg text-amber-400/60 hover:text-amber-300 hover:bg-amber-500/10 disabled:opacity-20 transition-colors"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveAnnouncement(index, "down")}
                        disabled={index === announcements.length - 1}
                        className="p-1.5 rounded-lg text-amber-400/60 hover:text-amber-300 hover:bg-amber-500/10 disabled:opacity-20 transition-colors"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleStartEdit(index, msg)}
                        className="p-1.5 rounded-lg text-amber-400 hover:text-amber-200 hover:bg-amber-500/20 transition-colors"
                        title="Edit Announcement"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveAnnouncement(index)}
                        className="p-1.5 rounded-lg text-rose-400 hover:text-rose-200 hover:bg-rose-950/50 transition-colors"
                        title="Remove Ticker"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Feature Flags & Live Remote Controls */}
          <div className="p-5 sm:p-7 rounded-3xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-amber-500/15">
              <Radio className="w-5 h-5 text-amber-400" />
              <div>
                <h2 className="font-serif font-black text-lg text-white">
                  Remote Feature Flags & Killswitches
                </h2>
                <p className="text-[11px] text-rose-300/70">
                  Instantly govern public visibility and engine availability across the portal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Flag 1: Leaderboard */}
              <div
                onClick={() => handleToggleFlag("live_leaderboard_active")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  featureFlags.live_leaderboard_active
                    ? "bg-emerald-950/30 border-emerald-500/40"
                    : "bg-white/5 border-white/10 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        featureFlags.live_leaderboard_active ? "bg-emerald-400 animate-ping" : "bg-zinc-500"
                      }`}
                    />
                    <h3 className="font-bold text-xs text-white">
                      Live Championship Leaderboard
                    </h3>
                  </div>
                  <p className="text-[11px] text-rose-200/70 mt-1">
                    Display real-time college rankings and podium standings on the public portal.
                  </p>
                </div>

                <div
                  className={`w-10 h-6 rounded-full p-1 transition-colors ${
                    featureFlags.live_leaderboard_active ? "bg-emerald-500" : "bg-zinc-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      featureFlags.live_leaderboard_active ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* Flag 2: Jury Scoring */}
              <div
                onClick={() => handleToggleFlag("jury_scoring_open")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  featureFlags.jury_scoring_open
                    ? "bg-amber-950/30 border-amber-500/40"
                    : "bg-white/5 border-white/10 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        featureFlags.jury_scoring_open ? "bg-amber-400" : "bg-zinc-500"
                      }`}
                    />
                    <h3 className="font-bold text-xs text-white">
                      Jury Scoring Engine Active
                    </h3>
                  </div>
                  <p className="text-[11px] text-rose-200/70 mt-1">
                    Allow empanelled judges and directorate admins to log scorecards.
                  </p>
                </div>

                <div
                  className={`w-10 h-6 rounded-full p-1 transition-colors ${
                    featureFlags.jury_scoring_open ? "bg-amber-500" : "bg-zinc-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-black transition-transform ${
                      featureFlags.jury_scoring_open ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* Flag 3: Rulebook Download */}
              <div
                onClick={() => handleToggleFlag("rules_download_active")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  featureFlags.rules_download_active
                    ? "bg-blue-950/30 border-blue-500/40"
                    : "bg-white/5 border-white/10 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        featureFlags.rules_download_active ? "bg-blue-400" : "bg-zinc-500"
                      }`}
                    />
                    <h3 className="font-bold text-xs text-white">
                      Public Rulebook Download PDF
                    </h3>
                  </div>
                  <p className="text-[11px] text-rose-200/70 mt-1">
                    Permit student contingents to access and download the official 2026 rulebook.
                  </p>
                </div>

                <div
                  className={`w-10 h-6 rounded-full p-1 transition-colors ${
                    featureFlags.rules_download_active ? "bg-blue-500" : "bg-zinc-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      featureFlags.rules_download_active ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* Flag 4: Star Night Banner */}
              <div
                onClick={() => handleToggleFlag("star_night_banner_active")}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  featureFlags.star_night_banner_active
                    ? "bg-purple-950/30 border-purple-500/40"
                    : "bg-white/5 border-white/10 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        featureFlags.star_night_banner_active ? "bg-purple-400" : "bg-zinc-500"
                      }`}
                    />
                    <h3 className="font-bold text-xs text-white">
                      Star Celebrity Night Spotlight
                    </h3>
                  </div>
                  <p className="text-[11px] text-rose-200/70 mt-1">
                    Showcase the headline artist and celebrity concert teaser banner on home view.
                  </p>
                </div>

                <div
                  className={`w-10 h-6 rounded-full p-1 transition-colors ${
                    featureFlags.star_night_banner_active ? "bg-purple-500" : "bg-zinc-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      featureFlags.star_night_banner_active ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Save Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 disabled:opacity-50 text-black font-serif font-black text-sm tracking-wide shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synchronizing Parameters...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 stroke-[3]" />
                  <span>Save All Parameters</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminSettings;
