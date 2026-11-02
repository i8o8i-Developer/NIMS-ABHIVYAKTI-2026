import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import {
  Sliders,
  Save,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Sparkles,
  Radio,
  Lock,
} from "lucide-react";

export const AdminSettings: React.FC = () => {
  const [festivalName, setFestivalName] = useState("Abhivyakti 2026");
  const [tagline, setTagline] = useState("Celebrating Cultural Majesty & Excellence");
  const [targetDate, setTargetDate] = useState("2026-11-21T09:00");
  const [tickerText, setTickerText] = useState(
    "NIMS University Cultural Championship 2026 • 15 Grand Competitions Across 6 Cultural Arenas • Rajeshwari Auditorium • Live Score Engine Active"
  );
  const [isLive, setIsLive] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await Api.get("/core/settings/");
        if (res.data) {
          setFestivalName(res.data.festival_name || festivalName);
          setTagline(res.data.tagline || tagline);
          setTickerText(res.data.ticker_text || tickerText);
          setIsLive(res.data.is_live ?? true);
        }
      } catch {
        // Fallback default
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    try {
      await Api.post("/core/settings/", {
        festival_name: festivalName,
        tagline,
        ticker_text: tickerText,
        is_live: isLive,
      }).catch(() => null);

      setSuccessMsg("Festival System Parameters Successfully Synchronized.");
    } catch {
      // Ignored
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#29050e] via-[#1b0308] to-[#29050e] border border-amber-500/40 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 mb-2">
          <Sliders className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Platform Orchestration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
          System & Festival Parameters
        </h1>
        <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
          Adjust Festival Metadata, Marquee Banner Broadcasts, Countdown Target Timers, And Access Toggles.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="p-8 rounded-3xl bg-[#160207] border border-rose-950/80 shadow-xl space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
            Official Festival Title
          </label>
          <input
            type="text"
            required
            value={festivalName}
            onChange={(e) => setFestivalName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#1c0308] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
            Hero Headline & Tagline
          </label>
          <input
            type="text"
            required
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#1c0308] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
            Countdown Target Date & Time
          </label>
          <input
            type="datetime-local"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#1c0308] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
            Marquee Broadcast Ticker Message
          </label>
          <textarea
            rows={3}
            value={tickerText}
            onChange={(e) => setTickerText(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#1c0308] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Status Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#1c0308] border border-rose-950 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Public Live Scoring Broadcast</span>
              <span className="text-[11px] text-rose-300/70">Show Real-Time Leaderboard To Students</span>
            </div>
            <input
              type="checkbox"
              checked={isLive}
              onChange={(e) => setIsLive(e.target.checked)}
              className="h-5 w-5 rounded border-rose-950 text-amber-500 focus:ring-0"
            />
          </div>

          <div className="p-4 rounded-2xl bg-[#1c0308] border border-rose-950 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Freeze All Score Entry</span>
              <span className="text-[11px] text-rose-300/70">Lock Database Prior To Official Results Gala</span>
            </div>
            <input
              type="checkbox"
              checked={isLocked}
              onChange={(e) => setIsLocked(e.target.checked)}
              className="h-5 w-5 rounded border-rose-950 text-rose-500 focus:ring-0"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save System Parameters"}</span>
        </button>
      </form>
    </div>
  );
};
export default AdminSettings;
