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
} from "lucide-react";

export const AdminCompetitions: React.FC = () => {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingComp, setEditingComp] = useState<any | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Dance");
  const [arena, setArena] = useState("Performing Arts");
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("2025-11-21");
  const [startTime, setStartTime] = useState("10:00 AM");
  const [maxParticipants, setMaxParticipants] = useState(1);
  const [status, setStatus] = useState("scheduled");
  const [rules, setRules] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchCompetitions = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/competitions/");
      setCompetitions(res.data.results || res.data || []);
    } catch {
      setErrorMsg("Failed To Load Competitions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const openAddModal = () => {
    setEditingComp(null);
    setTitle("");
    setCategory("Dance");
    setArena("Performing Arts");
    setVenue("");
    setEventDate("2025-11-21");
    setStartTime("10:00 AM");
    setMaxParticipants(1);
    setStatus("scheduled");
    setRules("");
    setShowModal(true);
  };

  const openEditModal = (comp: any) => {
    setEditingComp(comp);
    setTitle(comp.title);
    setCategory(comp.category);
    setArena(comp.arena);
    setVenue(comp.venue);
    setEventDate(comp.event_date);
    setStartTime(comp.start_time);
    setMaxParticipants(comp.max_participants);
    setStatus(comp.status);
    setRules(comp.rules_summary || "");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        category,
        arena,
        venue,
        event_date: eventDate,
        start_time: startTime,
        max_participants: maxParticipants,
        status,
        rules_summary: rules,
      };

      if (editingComp) {
        await Api.put(`/competitions/${editingComp.id}/`, payload);
      } else {
        await Api.post("/competitions/", payload);
      }
      setShowModal(false);
      fetchCompetitions();
    } catch {
      setErrorMsg("Failed To Save Competition Details.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#29050e] via-[#1b0308] to-[#29050e] border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <CalendarCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Festival Master Grid</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
            Competitions & Schedule Deck
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
            Configure Venues, Time Limits, Round Status, And Categorization For All 15 Events.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      {/* Competitions Table */}
      <div className="p-6 rounded-3xl bg-[#160207] border border-rose-950/80 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-rose-950 text-rose-400 uppercase font-bold text-[10px]">
              <th className="py-3 px-3">Title</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Arena</th>
              <th className="py-3 px-3">Venue</th>
              <th className="py-3 px-3">Date & Time</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose-950/60">
            {competitions.map((comp) => (
              <tr key={comp.id} className="hover:bg-rose-950/30 transition-colors">
                <td className="py-3.5 px-3 font-bold text-white max-w-[200px] truncate">
                  {comp.title}
                </td>
                <td className="py-3.5 px-3 text-amber-300 font-semibold">{comp.category}</td>
                <td className="py-3.5 px-3 text-rose-300/80">{comp.arena}</td>
                <td className="py-3.5 px-3 text-rose-200 max-w-[150px] truncate">{comp.venue}</td>
                <td className="py-3.5 px-3 text-white">
                  <span>{comp.event_date}</span>
                  <span className="text-[10px] text-amber-400/80 block">{comp.start_time}</span>
                </td>
                <td className="py-3.5 px-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      comp.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : comp.status === "live"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"
                        : "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {comp.status}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <button
                    onClick={() => openEditModal(comp)}
                    className="p-1.5 rounded-lg text-amber-400 hover:text-white hover:bg-rose-900/50 mr-1"
                    title="Edit"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-[#1b0307] border border-amber-500/40 p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-rose-950/60 text-rose-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-serif font-black text-white mb-4">
              {editingComp ? "Edit Competition Parameters" : "Register New Competition"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Competition Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Arena
                  </label>
                  <input
                    type="text"
                    required
                    value={arena}
                    onChange={(e) => setArena(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Venue
                  </label>
                  <input
                    type="text"
                    required
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="live">Live / In Progress</option>
                  <option value="completed">Completed & Verified</option>
                  <option value="postponed">Postponed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Rules & Guidelines Summary
                </label>
                <textarea
                  rows={3}
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors mt-2"
              >
                {editingComp ? "Update Event Parameters" : "Create Competition"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminCompetitions;
