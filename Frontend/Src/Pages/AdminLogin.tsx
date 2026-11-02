import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/Lib/Auth";
import { Api } from "@/Lib/Api";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import {
  ShieldCheck,
  Lock,
  Mail,
  AlertCircle,
  Sparkles,
  KeyRound,
  ArrowLeft,
  Eye,
  EyeOff,
  Award,
  CheckCircle2,
  Landmark,
} from "lucide-react";

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("admin@nims.ac.in");
  const [password, setPassword] = useState("Abhivyakti@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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

  const applyCredentials = (credEmail: string, credPass: string) => {
    setEmail(credEmail);
    setPassword(credPass);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-[#050002] text-amber-50 flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden select-none antialiased">
      {/* Background Lighting & Floating Ambient Festival Motifs */}
      <FloatingBackgroundElements />

      {/* Overhead Warm Theatrical Spotlight Illuminating Portal */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 sm:w-[36rem] h-96 bg-[radial-gradient(ellipse_at_top,_rgba(245,184,66,0.22)_0%,_rgba(136,19,55,0.12)_45%,_transparent_75%)] blur-2xl pointer-events-none z-0" />

      {/* Top Header Navigation Bar */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-4 relative z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#140206]/90 hover:bg-rose-950/70 border border-amber-500/35 text-amber-300 text-xs font-bold transition-all hover:scale-105 shadow-lg shadow-black/60 group"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>Return To Public Hub</span>
        </Link>

        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#120205] border border-amber-500/30 text-amber-200 text-xs font-semibold shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">NIMS UNIVERSITY •</span>
          <span className="text-amber-300 font-bold uppercase">Abhivyakti Directorate</span>
        </div>
      </header>

      {/* Main Central Portal Card */}
      <main className="w-full max-w-lg my-auto py-6 relative z-10">
        <div className="w-full bg-gradient-to-b from-[#180307]/95 via-[#0e0104]/98 to-[#060002]/98 border-2 border-amber-500/40 rounded-3xl p-7 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl relative overflow-hidden">
          {/* Subtle Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-rose-900/15 rounded-tr-full pointer-events-none" />

          {/* Logo & Portal Header */}
          <div className="text-center mb-7 relative z-10">
            {/* High-Gloss Official Logo Card */}
            <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-white shadow-2xl shadow-rose-950/70 border-2 border-amber-400 mb-4 transform hover:scale-105 transition-transform duration-300">
              <img
                src="/Abhivyakti.png"
                alt="Abhivyakti Cultural Festival Logo"
                className="h-10 sm:h-12 w-auto object-contain mx-auto"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-300 tracking-tight">
              Fest Directorate Portal
            </h1>
            <p className="text-xs text-rose-200/80 mt-1.5 font-medium max-w-sm mx-auto leading-relaxed">
              Authorized Adjudicators, Jury Members & Fest Directorate Personnel
            </p>
          </div>

          {/* 1-Click Quick Credential Selection Badges */}
          <div className="mb-6 p-3.5 rounded-2xl bg-[#140206] border border-amber-500/25 shadow-inner">
            <div className="flex items-center justify-between mb-2.5">
              <span className="flex items-center gap-1.5 text-[11px] font-black text-amber-300 uppercase tracking-wider">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Directorate Role</span>
              </span>
              <span className="text-[10px] text-rose-300/70 font-semibold">1-Click Auto Fill</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Role 1: Super Admin */}
              <button
                type="button"
                onClick={() => applyCredentials("admin@nims.ac.in", "Abhivyakti@2026")}
                className={`p-3 rounded-xl text-left border-2 transition-all duration-200 relative ${
                  email === "admin@nims.ac.in"
                    ? "bg-amber-500/20 border-amber-400 text-amber-100 shadow-md shadow-amber-950/40"
                    : "bg-[#1d0309] border-rose-950/80 text-rose-200/70 hover:text-white hover:border-amber-500/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-xs font-black text-amber-200">Super Admin</span>
                  </div>
                  {email === "admin@nims.ac.in" && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                </div>
                <div className="text-[10px] text-rose-300/80 font-mono truncate">admin@nims.ac.in</div>
                <span className="text-[9px] text-amber-400/90 font-semibold block mt-0.5">Full Directorate</span>
              </button>

              {/* Role 2: Official Jury */}
              <button
                type="button"
                onClick={() => applyCredentials("judge@abhivyakti.nsiif.org", "JudgePassword123!")}
                className={`p-3 rounded-xl text-left border-2 transition-all duration-200 relative ${
                  email === "judge@abhivyakti.nsiif.org"
                    ? "bg-amber-500/20 border-amber-400 text-amber-100 shadow-md shadow-amber-950/40"
                    : "bg-[#1d0309] border-rose-950/80 text-rose-200/70 hover:text-white hover:border-amber-500/30"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="text-xs font-black text-amber-200">Official Jury</span>
                  </div>
                  {email === "judge@abhivyakti.nsiif.org" && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                </div>
                <div className="text-[10px] text-rose-300/80 font-mono truncate">judge@abhivyakti.nsiif.org</div>
                <span className="text-[9px] text-amber-400/90 font-semibold block mt-0.5">Scoring Engine</span>
              </button>
            </div>
          </div>

          {/* Error Alert Message */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/90 border border-rose-700 text-rose-200 text-xs flex items-center gap-3 animate-shake shadow-lg">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              <span className="font-medium">{errorMsg}</span>
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-amber-300/90 mb-1.5">
                Directorate Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/80 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nims.ac.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#140206] border-2 border-amber-500/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-xs font-semibold text-white placeholder-rose-300/40 focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-amber-300/90 mb-1.5">
                Secure Staff Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/80 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#140206] border-2 border-amber-500/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-xs font-semibold text-white placeholder-rose-300/40 focus:outline-none transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-300/70 hover:text-amber-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Action CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black font-serif font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>
                {loading ? "Authenticating Directorate Credentials..." : "Authenticate & Access Deck"}
              </span>
            </button>
          </form>

          {/* Trust Footnote */}
          <div className="mt-7 pt-4 border-t border-rose-950/80 text-center">
            <div className="flex items-center justify-center gap-2 text-[11px] text-rose-300/70 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>256-Bit Encrypted Directorate Session • Real-Time Score Sync</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-5xl mx-auto py-3 text-center text-xs text-rose-300/60 relative z-20">
        <p>
          © 2026 NIMS University Rajasthan • Student Council Fest Directorate • All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default AdminLogin;
