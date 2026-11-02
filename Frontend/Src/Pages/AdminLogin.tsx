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
  FileCheck,
  Scale,
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
    <div className="min-h-screen bg-[#0a0103] text-amber-50 flex flex-col justify-between p-4 sm:p-6 lg:p-10 relative overflow-hidden select-none antialiased">
      {/* Background Lighting & Festival Motifs */}
      <FloatingBackgroundElements />

      {/* Top Header Bar */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between relative z-20 pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#140206]/90 hover:bg-rose-950/70 border border-amber-500/35 text-amber-300 text-xs font-bold transition-all hover:scale-105 shadow-lg shadow-black/60 group"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>Return To Public Festival Hub</span>
        </Link>

        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#120205] border border-amber-500/30 text-amber-200 text-xs font-semibold shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">NIMS University •</span>
          <span className="text-amber-300 font-bold">Directorate Portal</span>
        </div>
      </header>

      {/* Main Command Hub Card */}
      <main className="w-full max-w-6xl mx-auto my-auto relative z-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#180307]/95 via-[#0e0104]/98 to-[#060002]/98 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden">
          {/* =========================================================
              LEFT COLUMN: FESTIVAL DIRECTORATE AUTHORITY & HERO SEAL
              ========================================================= */}
          <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-br from-[#26050e]/80 via-[#180307]/90 to-[#0c0104] border-b lg:border-b-0 lg:border-r border-amber-500/30 flex flex-col justify-between relative">
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-amber-500/10 rounded-br-full pointer-events-none" />

            <div>
              {/* Dual Branding Badges */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-white shadow-xl border border-amber-400/80">
                  <img
                    src="/Abhivyakti.png"
                    alt="Abhivyakti Festival Logo"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="p-2 rounded-2xl bg-white/95 shadow-xl border border-rose-900/40">
                  <img
                    src="/NIMS-LOGO.png"
                    alt="NIMS University Crest"
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Title & Authority Narrative */}
              <span className="text-xs font-bold tracking-widest text-amber-400">
                Central Administrative Suite
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-white mt-1 leading-tight">
                Fest Directorate & Jury Portal
              </h1>
              <p className="text-xs sm:text-sm text-rose-200/80 mt-3 leading-relaxed">
                Centralized Scoring Engine, Jury Verification Terminal, And Institutional Contingent Management For The 2026 Inter-College Championship.
              </p>

              {/* Verified Directorate Modules */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#140206] border border-amber-500/20">
                  <Scale className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-amber-200">Real-Time Jury Engine</p>
                    <p className="text-[11px] text-rose-300/70">Cryptographic Score Entry & Instant Standings</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#140206] border border-rose-500/20">
                  <FileCheck className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-amber-200">22 Official Competitions</p>
                    <p className="text-[11px] text-rose-300/70">4-Pillar Scoring Rubrics & Participant Verification</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#140206] border border-amber-500/20">
                  <Landmark className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-amber-200">30+ Competing Institutes</p>
                    <p className="text-[11px] text-rose-300/70">Rolling Trophy Point Accumulation Matrices</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Security Notice */}
            <div className="mt-8 pt-4 border-t border-rose-950/80">
              <div className="flex items-center gap-2 text-[11px] text-rose-300/70 font-semibold">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Restricted Access • Empaneled Juries & Directorate Only</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: AUTHENTICATION FORM & CREDENTIALS
              ========================================================= */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Form Header */}
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-serif font-black text-amber-100">
                  Sign In To Directorate Deck
                </h2>
                <p className="text-xs text-rose-200/80 mt-1">
                  Enter Your Assigned Festival Directorate Or Jury Credentials Below.
                </p>
              </div>

              {/* 1-Click Role Selection */}
              <div className="mb-6 p-3.5 rounded-2xl bg-[#120205] border border-amber-500/25">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="flex items-center gap-1.5 text-[11px] font-black text-amber-300 tracking-wider">
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    <span>Select Directorate Terminal</span>
                  </span>
                  <span className="text-[10px] text-rose-300/80 font-semibold">1-Click Auto Fill</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Super Admin Option */}
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

                  {/* Official Jury Option */}
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

              {/* Error Banner */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/90 border border-rose-700 text-rose-200 text-xs flex items-center gap-3 animate-shake shadow-lg">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                  <span className="font-medium">{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-black tracking-wider text-amber-300/90 mb-1.5">
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
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#140206] border-2 border-amber-500/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-xs font-semibold text-white placeholder-rose-300/40 focus:outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black tracking-wider text-amber-300/90 mb-1.5">
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
                      className="w-full pl-10 pr-11 py-3.5 rounded-xl bg-[#140206] border-2 border-amber-500/30 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 text-xs font-semibold text-white placeholder-rose-300/40 focus:outline-none transition-all shadow-inner"
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 mt-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-black font-serif font-black text-sm tracking-wide transition-all shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4 text-black" />
                  <span>
                    {loading ? "Authenticating Directorate Credentials..." : "Authenticate & Access Deck"}
                  </span>
                </button>
              </form>
            </div>

            {/* Security Trust Footnote */}
            <div className="mt-8 pt-4 border-t border-rose-950/80 text-center">
              <div className="flex items-center justify-center gap-2 text-[11px] text-rose-300/70 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>256-Bit TLS End-To-End Encrypted Directorate Session</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-7xl mx-auto py-2 text-center text-xs text-rose-300/60 relative z-20">
        <p>
          © 2026 NIMS University Rajasthan • Student Council Fest Directorate • All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default AdminLogin;
