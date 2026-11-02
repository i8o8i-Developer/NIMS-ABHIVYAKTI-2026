import React, { useState, useEffect } from "react";
import { Api } from "@/Lib/Api";
import {
  Users,
  UserPlus,
  ShieldCheck,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("judge");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/users/");
      setUsers(res.data.results || res.data || []);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await Api.post("/users/", {
        email,
        full_name: fullName,
        role,
        password,
      });
      setSuccessMsg("Staff Member Enrolled In Directorate RBAC.");
      setShowModal(false);
      fetchUsers();
    } catch (err: any) {
      setErrorMsg("Failed To Create Directorate User.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#29050e] via-[#1b0308] to-[#29050e] border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Access Control Deck</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-white">
            Staff & Jury Permissions (RBAC)
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1">
            Enforce Role-Based Access Control Across Super Admins, Fest Coordinators, And Empanelled Jury.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md shadow-amber-500/20 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Enroll New Staff Member</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="p-6 rounded-3xl bg-[#160207] border border-rose-950/80 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-rose-950 text-rose-400 uppercase font-bold text-[10px]">
              <th className="py-3 px-3">Full Name</th>
              <th className="py-3 px-3">Email Address</th>
              <th className="py-3 px-3">Assigned Role</th>
              <th className="py-3 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose-950/60">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-rose-950/30 transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">{u.full_name}</td>
                <td className="py-3.5 px-3 text-rose-300 font-mono">{u.email}</td>
                <td className="py-3.5 px-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {u.role}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-emerald-400 font-semibold">Active</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enroll Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#1b0307] border border-amber-500/40 p-6 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-rose-950/60 text-rose-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-serif font-black text-white mb-4">Enroll Directorate Staff</h2>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Prof. S. R. Verma"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jury@nimsuniversity.org"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Directorate Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="super_admin">Super Admin (Full Root Control)</option>
                  <option value="coordinator">Fest Coordinator</option>
                  <option value="judge">Official Jury Member</option>
                  <option value="operator">Score Operator</option>
                  <option value="viewer">Read-Only Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1">
                  Temporary Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#140206] border border-rose-950 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors mt-2"
              >
                Enroll In Directorate
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminUsers;

