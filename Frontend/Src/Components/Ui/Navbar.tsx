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
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-gradient-to-r from-[#280410]/95 via-[#1b0526]/95 to-[#0b1d2e]/95 border-b-2 border-amber-400/50 shadow-[0_4px_30px_rgba(245,158,11,0.25)] transition-all">
      <div className="max-w-7xl mx-auto px-2 min-[340px]:px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
        {/* Left: NIMS University Crest */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3.5 shrink-0 group">
          <div className="h-10 min-[340px]:h-11 sm:h-12 bg-white/95 px-2 min-[340px]:px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border-2 border-amber-400/60 shadow-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <img
              src="/NIMS-LOGO.png"
              alt="NIMS University Rajasthan"
              className="h-7 min-[340px]:h-8 sm:h-9 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Center: Desktop Navigation Bar With Multi-Color Pills */}
        <nav className="hidden lg:flex items-center space-x-1.5 bg-[#250414]/90 px-3.5 py-1.5 rounded-full border-2 border-amber-400/40 shadow-inner">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-black tracking-wide transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white shadow-lg shadow-pink-500/35 border border-yellow-300 scale-105"
                    : "text-amber-100 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-yellow-200" : "text-amber-400"}`} />
                <span>{item.name}</span>
                {item.hasDot && (
                  <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop: Elevated Student Council Directorate Seal */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/25 via-pink-500/25 to-purple-500/25 border-2 border-amber-300 shadow-xl shadow-amber-950/50 backdrop-blur-md hover:scale-105 transition-all">
            <div className="w-9 h-9 rounded-full bg-white p-1 border-2 border-amber-400 shadow flex items-center justify-center shrink-0">
              <img
                src="/STUDENT-COUNCIL-LOGO.png"
                alt="NIMS Student Council"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left pr-1">
              <div className="flex items-center gap-1">
                <span className="text-xs font-serif font-black text-amber-200 tracking-wide uppercase">Student Council</span>
                <Sparkles className="w-3 h-3 text-yellow-300" />
              </div>
              <span className="text-[10px] font-black text-amber-300 tracking-wider uppercase">Host Directorate</span>
            </div>
          </div>
        </div>

        {/* Right Mobile: Student Council Emblem Badge + Hamburger Button */}
        <div className="lg:hidden flex items-center gap-1.5 min-[340px]:gap-2">
          {/* Mobile Student Council Emblem Badge (Full Text Written) */}
          <div className="h-10 min-[340px]:h-11 px-2 min-[340px]:px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#380616] via-[#2a052e] to-[#121e3d] border-2 border-amber-400/80 shadow-md flex items-center gap-1.5">
            <img
              src="/STUDENT-COUNCIL-LOGO.png"
              alt="NIMS Student Council"
              className="h-6 w-6 min-[340px]:h-7 min-[340px]:w-7 rounded-full bg-white p-0.5 object-contain shrink-0 border border-amber-300"
            />
            <span className="text-[9px] min-[340px]:text-[10px] font-serif font-black text-amber-300 uppercase leading-none whitespace-nowrap pr-0.5">
              Student Council
            </span>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 min-[340px]:p-2.5 rounded-xl bg-gradient-to-r from-rose-900 to-amber-700 border-2 border-amber-400 text-yellow-300 shadow-md"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 min-[340px]:w-6 min-[340px]:h-6" /> : <Menu className="w-5 h-5 min-[340px]:w-6 min-[340px]:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-[#240410] via-[#1a0526] to-[#0a1827] border-b-2 border-amber-400/50 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-black transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white border border-yellow-300 shadow-md"
                    : "text-amber-100 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-amber-300" />
                  <span>{item.name}</span>
                </div>
                {item.hasDot && (
                  <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
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
