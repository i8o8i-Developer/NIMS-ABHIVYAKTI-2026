import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import { useAuth } from "@/Lib/Auth";
import {
  Users,
  UserPlus,
  ShieldCheck,
  Trash2,
  Edit,
  X,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Lock,
  Mail,
  User,
  Shield,
  Key,
  Check,
} from "lucide-react";

const ROLES = [
  { value: "ALL", label: "All Roles" },
  { value: "super_admin", label: "Super Admin (Directorate Executive)" },
  { value: "coordinator", label: "Cultural Fest Coordinator" },
  { value: "judge", label: "Empanelled Scoring Jury" },
  { value: "operator", label: "Media & Stage Operator" },
  { value: "viewer", label: "Auditor / Observer" },
];

export const AdminUsers: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeUserId, setActiveUserId] = useState<number | null>(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<any | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("judge");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/auth/users/");
      const data = Array.isArray(res.data) ? res.data : Array.isArray(res.data?.results) ? res.data.results : [];
      setUsers(data);
    } catch {
      showFeedbackMessage("error", "Failed To Load Directorate Staff Directory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showFeedbackMessage = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setActiveUserId(null);
    setFullName("");
    setEmail("");
    setRole("judge");
    setPassword("");
    setIsActive(true);
    setShowModal(true);
  };

  const openEditModal = (u: any) => {
    setIsEditing(true);
    setActiveUserId(u.id);
    setFullName(u.full_name || "");
    setEmail(u.email || "");
    setRole(u.role || "judge");
    setPassword("");
    setIsActive(u.is_active ?? true);
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      showFeedbackMessage("error", "Full Name and Email are required.");
      return;
    }

    if (!isEditing && (!password || password.length < 8)) {
      showFeedbackMessage("error", "Password must be at least 8 characters.");
      return;
    }

    try {
      if (isEditing && activeUserId) {
        const payload: any = {
          full_name: fullName.trim(),
          role,
          is_active: isActive,
        };
        if (password && password.length >= 8) {
          payload.password = password;
        }
        await Api.patch(`/auth/users/${activeUserId}/`, payload);
        showFeedbackMessage("success", `Updated ${fullName} Successfully!`);
      } else {
        const payload = {
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          role,
          password,
          is_active: isActive,
        };
        await Api.post("/auth/users/", payload);
        showFeedbackMessage("success", `Enrolled ${fullName} In Directorate RBAC!`);
      }
      setShowModal(false);
      fetchUsers();
    } catch (err: any) {
      const errDetail =
        err.response?.data?.email?.[0] ||
        err.response?.data?.detail ||
        "Failed to save staff credentials.";
      showFeedbackMessage("error", String(errDetail));
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmUser) return;
    if (currentUser?.email === deleteConfirmUser.email) {
      showFeedbackMessage("error", "You cannot delete your own active administrator account.");
      setDeleteConfirmUser(null);
      return;
    }

    try {
      await Api.delete(`/auth/users/${deleteConfirmUser.id}/`);
      showFeedbackMessage("success", `Staff member ${deleteConfirmUser.full_name} removed.`);
      setDeleteConfirmUser(null);
      fetchUsers();
    } catch (err: any) {
      showFeedbackMessage("error", "Failed to revoke staff credentials.");
    }
  };

  const safeUsers = Array.isArray(users) ? users : [];
  const filteredUsers = safeUsers.filter((u) => {
    const matchesSearch =
      (u.full_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "ALL" || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const totalStaff = users.length;
  const superAdminCount = users.filter((u) => u.role === "super_admin").length;
  const judgeCount = users.filter((u) => u.role === "judge").length;
  const coordinatorCount = users.filter((u) => u.role === "coordinator").length;

  const getRoleBadge = (r: string) => {
    const styles: Record<string, { label: string; class: string }> = {
      super_admin: {
        label: "Super Admin",
        class: "bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-sm shadow-amber-500/20",
      },
      coordinator: {
        label: "Coordinator",
        class: "bg-blue-500/20 text-blue-300 border-blue-400/50 shadow-sm shadow-blue-500/20",
      },
      judge: {
        label: "Jury / Judge",
        class: "bg-purple-500/20 text-purple-300 border-purple-400/50 shadow-sm shadow-purple-500/20",
      },
      operator: {
        label: "Stage Operator",
        class: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-sm shadow-emerald-500/20",
      },
      viewer: {
        label: "Observer",
        class: "bg-zinc-500/20 text-zinc-300 border-zinc-400/50",
      },
    };

    const config = styles[r] || { label: r, class: "bg-white/10 text-white border-white/20" };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config.class}`}
      >
        <Shield className="w-3 h-3" />
        <span>{config.label}</span>
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
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
              Access Control & RBAC
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wide">
            Staff & Permissions (RBAC)
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1 max-w-2xl">
            Enforce Role-Based Permissions Across Directorate Executives, Arena Coordinators, And Empanelled Scoring Jury.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black font-serif font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          <UserPlus className="w-4 h-4 stroke-[3]" />
          <span>Enroll New Staff Member</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Total Directorate Staff
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-white">{totalStaff}</span>
            <span className="text-xs font-mono font-bold text-amber-400">Enrolled</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Super Admins
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-amber-300">
              {superAdminCount}
            </span>
            <span className="text-xs font-mono font-bold text-amber-400">Executive</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Empanelled Jury
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-purple-300">
              {judgeCount}
            </span>
            <span className="text-xs text-purple-400">⚖️ Scoring</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-300/80">
            Fest Coordinators
          </p>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-black text-blue-300">
              {coordinatorCount}
            </span>
            <span className="text-xs text-blue-400">Arenas</span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 backdrop-blur-xl shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-amber-400/80 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search staff by full name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#140209] border border-amber-500/30 text-xs text-white placeholder-rose-300/40 focus:border-amber-400 focus:outline-none transition-colors shadow-inner"
          />
        </div>

        {/* Role Filter */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#140209] border border-amber-500/30 text-xs text-amber-200 focus:border-amber-400 focus:outline-none transition-colors"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>

          {(searchTerm || selectedRole !== "ALL") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedRole("ALL");
              }}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-rose-300 text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Users View */}
      {loading ? (
        <div className="p-12 text-center">
          <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-rose-200/80 font-serif">Loading Staff Directory...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#120208] border border-amber-500/20 text-center">
          <Users className="w-10 h-10 text-amber-500/40 mx-auto mb-3" />
          <p className="text-sm font-serif font-bold text-white">No Staff Accounts Found</p>
          <p className="text-xs text-rose-300/70 mt-1">
            {searchTerm || selectedRole !== "ALL"
              ? "Try resetting your search or role filter."
              : "Click 'Enroll New Staff Member' to grant access."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-hidden rounded-2xl bg-[#120208]/90 border border-amber-500/25 shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-amber-500/20 bg-[#17030c] text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Staff Member</th>
                  <th className="py-3.5 px-4">Directorate Email</th>
                  <th className="py-3.5 px-4">Assigned Role</th>
                  <th className="py-3.5 px-4">Account Status</th>
                  <th className="py-3.5 px-4">Enrolled On</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/10">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-xs">
                          {u.full_name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs sm:text-sm">
                            {u.full_name}
                          </div>
                          {currentUser?.email === u.email && (
                            <span className="text-[10px] font-mono text-amber-400">
                              (Your Account)
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-rose-200/90 text-xs">
                      {u.email}
                    </td>

                    <td className="py-3.5 px-4">{getRoleBadge(u.role)}</td>

                    <td className="py-3.5 px-4">
                      {u.is_active ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Active Access</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          <span>Suspended</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-rose-300/70 font-mono text-[11px]">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(u)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-colors"
                          title="Edit Permissions"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmUser(u)}
                          disabled={currentUser?.email === u.email}
                          className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 disabled:opacity-30 text-rose-400 border border-rose-800/40 transition-colors"
                          title="Revoke Account"
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
            {filteredUsers.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-2xl bg-[#120208]/90 border border-amber-500/25 shadow-lg space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                      {u.full_name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h3 className="font-serif font-black text-white text-sm">
                        {u.full_name}
                      </h3>
                      <p className="text-[10px] font-mono text-rose-300/80 truncate max-w-[170px]">
                        {u.email}
                      </p>
                    </div>
                  </div>

                  <div>{getRoleBadge(u.role)}</div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-amber-500/10">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        u.is_active ? "bg-emerald-400" : "bg-rose-500"
                      }`}
                    />
                    <span className="text-[11px] text-rose-200/80">
                      {u.is_active ? "Active" : "Suspended"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(u)}
                      className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/20 transition-colors flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setDeleteConfirmUser(u)}
                      disabled={currentUser?.email === u.email}
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 disabled:opacity-30 text-rose-400 border border-rose-800/40 transition-colors"
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

      {/* Enroll / Edit User Modal */}
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
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-widest">
                {isEditing ? "Modify Staff Access" : "Staff Enrollment"}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-black text-white">
              {isEditing ? "Edit Account Permissions" : "Enroll Directorate User"}
            </h2>
            <p className="text-xs text-rose-200/80 mt-1 mb-5">
              Assign administrative roles, login credentials, and operational access level.
            </p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. Rajesh Gupta"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Directorate Email Address *
                </label>
                <input
                  type="email"
                  required
                  disabled={isEditing}
                  placeholder="staff@nims.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white disabled:opacity-50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Directorate Role & Privilege *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                >
                  {ROLES.filter((r) => r.value !== "ALL").map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  {isEditing ? "Reset Password (Leave blank to keep unchanged)" : "Initial Password (min. 8 chars) *"}
                </label>
                <input
                  type="password"
                  required={!isEditing}
                  placeholder={isEditing ? "••••••••••••" : "Minimum 8 characters"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0a0105] border border-amber-500/30 focus:border-amber-400 text-xs text-white focus:outline-none transition-colors"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-amber-500/40 text-amber-500 focus:ring-0 bg-[#0a0105]"
                />
                <span className="text-xs font-bold text-white">
                  Account is Active (can authenticate and access directorate)
                </span>
              </label>

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
                  {isEditing ? "Save Modifications" : "Enroll Staff Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-[#160209] border-2 border-rose-500/50 p-6 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-black text-white">
              Revoke Staff Access?
            </h3>
            <p className="text-xs text-rose-200/80 mt-2">
              Are you sure you want to revoke directorate access for{" "}
              <strong className="text-white">{deleteConfirmUser.full_name} ({deleteConfirmUser.email})</strong>?
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/15 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-lg shadow-rose-900/50"
              >
                Confirm Revocation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
