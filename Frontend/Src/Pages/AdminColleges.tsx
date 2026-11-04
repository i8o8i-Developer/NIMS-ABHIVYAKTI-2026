import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import {
  Building2,
  Trophy,
  Users,
  Edit,
  Trash2,
  Plus,
  Search,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Flame,
} from "lucide-react";

export const AdminColleges: React.FC = () => {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeCollegeId, setActiveCollegeId] = useState<number | null>(null);
  const [deleteConfirmCollege, setDeleteConfirmCollege] = useState<any | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [city, setCity] = useState("Jaipur");
  const [state, setState] = useState("Rajasthan");
  const [contactPerson, setContactPerson] = useState("");
  const [studentCoordinator, setStudentCoordinator] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [avatarColor, setAvatarColor] = useState("#F59E0B");

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/colleges/");
      const data = Array.isArray(res.data) ? res.data : Array.isArray(res.data?.results) ? res.data.results : [];
      // Sort by total_points descending by default
      const sorted = [...data].sort((a: any, b: any) => (b.total_points || 0) - (a.total_points || 0));
      setColleges(sorted);
    } catch {
      showFeedbackMessage("error", "Failed To Load College Contingents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const showFeedbackMessage = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setActiveCollegeId(null);
    setName("");
    setCode("");
    setCity("Jaipur");
    setState("Rajasthan");
    setContactPerson("");
    setStudentCoordinator("");
    setContactEmail("");
    setContactPhone("");
    setAvatarColor("#F59E0B");
    setShowModal(true);
  };

  const openEditModal = (col: any) => {
    setIsEditing(true);
    setActiveCollegeId(col.id);
    setName(col.name || "");
    setCode(col.code || "");
    setCity(col.city || "Jaipur");
    setState(col.state || "Rajasthan");
    setContactPerson(col.contact_person || "");
    setStudentCoordinator(col.student_coordinator || "");
    setContactEmail(col.contact_email || "");
    setContactPhone(col.contact_phone || "");
    setAvatarColor(col.avatar_color || "#F59E0B");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      showFeedbackMessage("error", "Institute Name and Code are required.");
      return;
    }

    const payload = {
      name: name.trim(),
      code: code.trim().toUpperCase(),
      city: city.trim(),
      state: state.trim(),
      contact_person: contactPerson.trim(),
      student_coordinator: studentCoordinator.trim(),
      contact_email: contactEmail.trim(),
      contact_phone: contactPhone.trim(),
      avatar_color: avatarColor,
      is_active: true,
    };

    try {
      if (isEditing && activeCollegeId) {
        await Api.patch(`/colleges/${activeCollegeId}/`, payload);
        showFeedbackMessage("success", `Updated ${payload.name} Successfully!`);
      } else {
        await Api.post("/colleges/", payload);
        showFeedbackMessage("success", `Added ${payload.name} To Championship!`);
      }
      setShowModal(false);
      fetchColleges();
    } catch (err: any) {
      const errDetail = err.response?.data?.detail || err.response?.data?.code?.[0] || "Failed to save college details.";
      showFeedbackMessage("error", String(errDetail));
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmCollege) return;
    try {
      await Api.delete(`/colleges/${deleteConfirmCollege.id}/`);
      showFeedbackMessage("success", `Removed ${deleteConfirmCollege.name} from records.`);
      setDeleteConfirmCollege(null);
      fetchColleges();
    } catch {
      showFeedbackMessage("error", "Failed to delete college.");
    }
  };

  const safeColleges = Array.isArray(colleges) ? colleges : [];
  const filteredColleges = safeColleges.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.name?.toLowerCase().includes(q) ||
      c.code?.toLowerCase().includes(q) ||
      c.contact_person?.toLowerCase().includes(q) ||
      c.student_coordinator?.toLowerCase().includes(q)
    );
  });

  const totalPointsDistributed = safeColleges.reduce((sum, c) => sum + (c.total_points || 0), 0);
  const totalMedals = safeColleges.reduce(
    (acc, c) => ({
      gold: acc.gold + (c.gold_medals || 0),
      silver: acc.silver + (c.silver_medals || 0),
      bronze: acc.bronze + (c.bronze_medals || 0),
    }),
    { gold: 0, silver: 0, bronze: 0 }
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Toast Feedback Notification */}
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

      {/* Header Banner With Luxury Dark Obsidian & Amber Palette */}
      <div className="p-4 min-[340px]:p-6 sm:p-8 rounded-2xl min-[340px]:rounded-3xl bg-gradient-to-r from-[#1c030d] via-[#100106] to-[#1c030d] border-2 border-amber-400/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Institutional Registry</span>
          </div>
          <h1 className="text-xl min-[340px]:text-2xl sm:text-3xl font-serif font-black text-white">
            Colleges & Contingents Management
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1 max-w-2xl leading-relaxed">
            Real-time management of participating institutes, student coordinators, dean assignments, points, and championship medal tallies.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="w-full md:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black font-serif font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>Add New College</span>
        </button>
      </div>

      {/* Executive Quick Stats Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300/80">Total Institutes</p>
          <p className="text-2xl sm:text-3xl font-serif font-black text-white mt-1">{colleges.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300/80">Points Awarded</p>
          <p className="text-2xl sm:text-3xl font-serif font-black text-amber-300 mt-1 font-mono">{totalPointsDistributed}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300/80">Total Medals Won</p>
          <div className="flex items-center gap-2 mt-1 text-sm font-bold font-mono">
            <span className="text-yellow-400">🥇 {totalMedals.gold}</span>
            <span className="text-slate-300">🥈 {totalMedals.silver}</span>
            <span className="text-amber-600">🥉 {totalMedals.bronze}</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300/80">Current Leader</p>
          <p className="text-xs sm:text-sm font-bold text-amber-200 mt-1 truncate">
            {colleges[0]?.name ? `${colleges[0].code} (${colleges[0].total_points} Pts)` : "No Scores Yet"}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:max-w-md relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/60" />
          <input
            type="text"
            placeholder="Search institutes by name, code, dean, lead..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#140209] border border-amber-500/30 text-xs text-white placeholder-rose-300/40 focus:border-amber-400 focus:outline-none transition-colors shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-300/60 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs font-semibold text-rose-300/70">
          Showing <span className="text-amber-300 font-bold">{filteredColleges.length}</span> of {colleges.length} Colleges
        </div>
      </div>

      {/* Grid of Colleges */}
      {loading ? (
        <div className="p-12 text-center text-amber-400 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider text-rose-300">Loading Contingents...</span>
        </div>
      ) : filteredColleges.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#120208] border border-amber-500/20 text-center">
          <Building2 className="w-10 h-10 text-amber-400/50 mx-auto mb-2" />
          <p className="text-sm font-bold text-amber-200">No matching colleges found</p>
          <p className="text-xs text-rose-300/60 mt-1">Try adjusting your search query or add a new college.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredColleges.map((col, index) => {
            const isTopThree = index < 3;
            return (
              <div
                key={col.id}
                className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#16020b]/95 via-[#0e0106]/98 to-[#060002] border-2 border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 shadow-xl shadow-black/60 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Card Top: Code Chip & Points Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/50 shadow-sm">
                        {col.code}
                      </span>
                      {isTopThree && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-yellow-300 border border-yellow-400/40">
                          <Trophy className="w-3 h-3 text-yellow-400" />
                          <span>#{index + 1}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-mono">
                      {col.total_points || 0} Pts
                    </span>
                  </div>

                  {/* College Name */}
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
                    {col.name}
                  </h3>

                  {/* Location & Details */}
                  <div className="mt-3 pt-3 border-t border-amber-500/15 space-y-1.5 text-xs text-rose-200/80">
                    <p className="flex items-center gap-1.5 truncate">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Dean: </span>
                      <strong className="text-white font-semibold truncate">
                        {col.contact_person || "Not Assigned"}
                      </strong>
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <Users className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Lead: </span>
                      <strong className="text-white font-semibold truncate">
                        {col.student_coordinator || "Not Assigned"}
                      </strong>
                    </p>
                    {(col.city || col.state) && (
                      <p className="flex items-center gap-1.5 text-[11px] text-amber-400/70">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{col.city || "Jaipur"}, {col.state || "Rajasthan"}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Bottom: Medals & CRUD Actions */}
                <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold">
                    <span title="Gold Medals" className="text-yellow-400">🥇 {col.gold_medals || 0}</span>
                    <span title="Silver Medals" className="text-slate-300">🥈 {col.silver_medals || 0}</span>
                    <span title="Bronze Medals" className="text-amber-600">🥉 {col.bronze_medals || 0}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => openEditModal(col)}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="Edit College Information"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirmCollege(col)}
                      className="p-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs transition-colors"
                      title="Delete College"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit College Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-[#140209] border-2 border-amber-500/40 p-5 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Building2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {isEditing ? "Modify Contingent" : "Institutional Registry"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-white">
              {isEditing ? "Edit College Details" : "Register New College"}
            </h2>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Full Institute / College Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NIMS Institute of Engineering & Technology"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Code / Abbr *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NIET"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs font-mono font-bold text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Dean / Director / Principal
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rajesh Gupta"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Student Contingent Lead
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sneha Patel"
                    value={studentCoordinator}
                    onChange={(e) => setStudentCoordinator(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="coordinator@nims.ac.in"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>
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
                  {isEditing ? "Save Changes" : "Register College"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmCollege && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-[#160209] border-2 border-rose-500/50 p-6 shadow-2xl relative">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-black text-white text-center">
              Remove Contingent?
            </h3>
            <p className="text-xs text-rose-200/80 text-center mt-2">
              Are you sure you want to delete <strong className="text-white">{deleteConfirmCollege.name} ({deleteConfirmCollege.code})</strong>? This action will remove all recorded scores and medals associated with this institute.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmCollege(null)}
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

export default AdminColleges;
