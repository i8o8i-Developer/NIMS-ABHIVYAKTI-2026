import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import {
  Building2,
  Trophy,
  Users,
  Edit,
  GraduationCap,
  Sparkles,
  X,
  Search,
} from "lucide-react";

export const AdminColleges: React.FC = () => {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCol, setEditingCol] = useState<any | null>(null);
  const [dean, setDean] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchColleges = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/colleges/");
      setColleges(res.data.results || res.data || []);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const openEdit = (col: any) => {
    setEditingCol(col);
    setDean(col.dean_or_head || "");
    setCoordinator(col.student_coordinator || "");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCol) return;
    try {
      await Api.patch(`/colleges/${editingCol.id}/`, {
        dean_or_head: dean,
        student_coordinator: coordinator,
      });
      setEditingCol(null);
      fetchColleges();
    } catch {
      alert("Failed To Save Contingent Details.");
    }
  };

  const filteredColleges = colleges.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#29050e] via-[#1b0308] to-[#29050e] border border-amber-500/40 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400 mb-2">
          <Building2 className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Contingents Registry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
          Colleges & Contingents Management
        </h1>
        <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
          Review Institute Standings, Assign Student Contingent Leads, And Inspect Medal Tallies.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400/60" />
        <input
          type="text"
          placeholder="Search Institutes By Name Or Code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#160207] border border-rose-950 text-xs text-white placeholder-rose-300/40 focus:border-amber-500 focus:outline-none transition-colors"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((col) => (
          <div
            key={col.id}
            className="p-5 rounded-2xl bg-[#160207] border border-rose-950/80 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {col.code}
                </span>
                <span className="text-xs font-bold text-amber-400 font-mono">
                  {col.total_points} Points
                </span>
              </div>

              <h3 className="text-sm font-bold text-white leading-snug">{col.name}</h3>

              <div className="mt-4 pt-3 border-t border-rose-950/60 space-y-1.5 text-xs text-rose-300/80">
                <p>Dean: <strong className="text-rose-100">{col.dean_or_head || "Not Assigned"}</strong></p>
                <p>Lead: <strong className="text-rose-100">{col.student_coordinator || "Not Assigned"}</strong></p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-950/60 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold">
                <span>🥇 {col.gold_medals || 0}</span>
                <span>🥈 {col.silver_medals || 0}</span>
                <span>🥉 {col.bronze_medals || 0}</span>
              </div>
              <button
                onClick={() => openEdit(col)}
                className="px-3 py-1 rounded-lg bg-[#220409] text-amber-300 hover:text-white border border-amber-500/30 text-xs font-bold flex items-center gap-1"
              >
                <Edit className="w-3 h-3" />
                <span>Edit Leads</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingCol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#1b0307] border border-amber-500/40 p-6 shadow-2xl relative">
            <button
              onClick={() => setEditingCol(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-rose-950/60 text-rose-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-serif font-black text-white mb-2">Edit Contingent Contacts</h2>
            <p className="text-xs text-amber-400 font-bold mb-4">{editingCol.name}</p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Dean / Director / Principal
                </label>
                <input
                  type="text"
                  value={dean}
                  onChange={(e) => setDean(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Student Contingent Lead
                </label>
                <input
                  type="text"
                  value={coordinator}
                  onChange={(e) => setCoordinator(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors mt-2"
              >
                Save Contingent Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminColleges;
