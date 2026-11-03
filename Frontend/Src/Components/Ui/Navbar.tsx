import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, Calendar, Image, Users, Menu, X, Sparkles, Award } from "lucide-react";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Overview", path: "/", icon: Home },
    { name: "Competitions", path: "/competitions", icon: Trophy },
    { name: "Schedule", path: "/schedule", icon: Calendar },
    { name: "Gallery", path: "/gallery", icon: Image },
    { name: "Contingents", path: "/contingents", icon: Users },
    { name: "Leaderboard", path: "/leaderboard", icon: Trophy, hasDot: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#080103]/95 border-b border-amber-500/30 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
        {/* Left: Dual Institutional Crests (NIMS University + Student Council) */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3.5 shrink-0 group">
          {/* NIMS University Crest */}
          <div className="h-11 sm:h-12 bg-white/95 px-2.5 sm:px-3 py-1.5 rounded-xl border border-amber-500/40 shadow-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <img
              src="/NIMS-LOGO.png"
              alt="NIMS University Rajasthan"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>

          {/* Student Council Emblem (Visible on Mobile & Tablet & Desktop) */}
          <div className="h-11 sm:h-12 bg-gradient-to-r from-[#180307] to-[#24050e] px-2 sm:px-3 py-1 rounded-xl border border-amber-400/60 shadow-lg flex items-center gap-2 transition-transform group-hover:scale-105">
            <img
              src="/STUDENT-COUNCIL-LOGO.png"
              alt="NIMS Student Council"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white p-0.5 object-contain shrink-0 shadow-sm"
            />
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-xs font-serif font-black text-amber-300 tracking-wider uppercase leading-none whitespace-nowrap">
                Student Council
              </span>
              <span className="text-[8px] sm:text-[10px] font-bold text-rose-200/90 leading-tight whitespace-nowrap">
                Fest Directorate
              </span>
            </div>
          </div>
        </Link>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center space-x-1.5 bg-[#120205]/90 px-3 py-1.5 rounded-full border border-amber-500/25 shadow-inner">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-rose-900 to-rose-950 text-amber-200 shadow-md border border-amber-500/40"
                    : "text-rose-200/80 hover:text-amber-300 hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : "text-amber-500/70"}`} />
                <span>{item.name}</span>
                {item.hasDot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop: Elevated Student Council Directorate Seal */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border-2 border-amber-400/70 shadow-lg shadow-amber-950/40 backdrop-blur-md hover:border-amber-300 transition-all">
            <div className="w-9 h-9 rounded-full bg-white p-1 border border-amber-400 shadow flex items-center justify-center shrink-0">
              <img
                src="/STUDENT-COUNCIL-LOGO.png"
                alt="NIMS Student Council"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left pr-1">
              <div className="flex items-center gap-1">
                <span className="text-xs font-serif font-black text-amber-200 tracking-wide uppercase">Student Council</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
              <span className="text-[10px] font-bold text-amber-400/90 tracking-wider uppercase">Host Directorate</span>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-[#140206] border border-amber-500/40 text-amber-400 shadow-md"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0103]/98 border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-2">
          {/* Mobile Directorate Badge Header */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-[#1c0409] to-[#2a050f] border border-amber-500/40 mb-3 shadow-md">
            <img
              src="/STUDENT-COUNCIL-LOGO.png"
              alt="Student Council"
              className="w-10 h-10 rounded-full bg-white p-0.5 object-contain shrink-0 border border-amber-400/50"
            />
            <div>
              <p className="text-xs font-serif font-black text-amber-300 uppercase">NIMS Student Council</p>
              <p className="text-[11px] text-rose-200 font-medium">Official Fest Directorate • Abhivyakti 2026</p>
            </div>
          </div>

          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-rose-950 text-amber-300 border border-amber-500/40"
                    : "text-rose-200/90 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.name}</span>
                </div>
                {item.hasDot && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
