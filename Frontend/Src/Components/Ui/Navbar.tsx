import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, Calendar, Image, Users, Shield, Menu, X, Sparkles } from "lucide-react";

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
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#080103]/95 border-b border-amber-500/20 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: NIMS University Crest Badge */}
        <Link to="/" className="flex items-center space-x-3 shrink-0 group">
          <div className="h-12 bg-white/95 px-3 py-1.5 rounded-xl border border-amber-500/40 shadow-lg flex items-center justify-center transition-transform group-hover:scale-105">
            <img
              src="/NIMS-LOGO.png"
              alt="NIMS University Rajasthan"
              className="h-9 w-auto object-contain"
            />
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

        {/* Right: Student Council Directorate Badge */}
        <div className="hidden md:flex items-center space-x-3 shrink-0">
          <div className="flex items-center space-x-2.5 bg-[#120205] px-3.5 py-1.5 rounded-full border border-amber-500/30 shadow-md">
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-wider text-amber-300 uppercase">Student Council</p>
              <p className="text-[9px] text-rose-300/80 font-medium">Fest Directorate</p>
            </div>
            <img
              src="/STUDENT-COUNCIL-LOGO.png"
              alt="Student Council NIMS"
              className="w-8 h-8 rounded-full border border-amber-400/40 object-contain bg-white/95 p-0.5"
            />
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-[#140206] border border-amber-500/30 text-amber-400"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0103]/98 border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-2">
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

          <div className="pt-3 border-t border-rose-950 flex items-center justify-between">
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-rose-300 hover:text-amber-400 font-semibold"
            >
              Directorate Staff Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
