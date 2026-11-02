import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Lib/Auth";
import { Api, SetAccessToken } from "@/Lib/Api";
import { ShieldCheck, Lock, Mail, AlertCircle, Sparkles } from "lucide-react";

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await Api.post("/auth/login/", { email, password });
      const { access, refresh, user } = response.data;
      login(access, refresh, user);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.detail || "Invalid Directorate Credentials. Please Verify And Retry."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0204] text-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#160207] border border-amber-500/40 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-[#220409] border border-amber-500/40 mb-4 shadow-lg">
            <img src="/Abhivyakti.png" alt="Abhivyakti Logo" className="h-12 w-auto object-contain mx-auto" />
          </div>
          <h1 className="text-2xl font-serif font-black text-white">Fest Directorate Portal</h1>
          <p className="text-xs text-rose-300/80 mt-1">
            Authorized Personnel, Jury Members & Fest Coordinators Only
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
              Directorate Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400/70" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="directorate@nimsuniversity.org"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1c0308] border border-rose-950 focus:border-amber-500 text-xs text-white placeholder-rose-300/40 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300/90 mb-1.5">
              Secure Staff Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-rose-400/70" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1c0308] border border-rose-950 focus:border-amber-500 text-xs text-white placeholder-rose-300/40 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{loading ? "Authenticating Directorate..." : "Authenticate & Access Deck"}</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-rose-950/80 text-center">
          <p className="text-[11px] text-rose-400/70">
            Seed Credentials: <code className="text-amber-300">admin@nims.ac.in</code> / <code className="text-amber-300">Abhivyakti@2026</code>
          </p>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;

