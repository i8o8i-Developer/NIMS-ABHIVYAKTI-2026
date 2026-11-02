import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Trophy, Calendar, Image, Users, BookOpen, Shield, Menu, X, Radio } from "lucide-react";

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
    { name: "Rulebook", path: "/rulebook", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-festival-wine-950/90 border-b border-[#F5B842]/20 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: NIMS University Crest Badge */}
        <Link to="/" className="flex items-center space-x-3 shrink-0 group">
          <div className="h-13 bg-white/95 px-3 py-1.5 rounded-xl border border-festival-gold-500/40 shadow-lg flex items-center justify-center transition-transform group-hover:scale-102">
            <img
              src="/Assets/NIMS-LOGO.png"
              alt="NIMS University Rajasthan"
              className="h-10 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center space-x-1.5 bg-[#1A060C]/90 px-3 py-1.5 rounded-full border border-festival-gold-500/25 shadow-inner">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-festival-crimson-600 to-festival-crimson-700 text-white shadow-md border border-festival-gold-400/50"
                    : "text-festival-cream-200 hover:text-festival-gold-400 hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-festival-gold-300" : "text-festival-gold-500/70"}`} />
                <span>{item.name}</span>
                {item.hasDot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-festival-gold-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Student Council Directorate & Stadium Screen */}
        <div className="hidden md:flex items-center space-x-4 shrink-0">
          <Link
            to="/live"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-festival-gold-500/10 hover:bg-festival-gold-500/20 text-festival-gold-400 border border-festival-gold-500/30 text-xs font-bold transition-all"
            title="Open 16:9 Stadium Broadcast Screen"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>Live Screen</span>
          </Link>

          <div className="flex items-center space-x-2.5 bg-black/40 px-3 py-1 rounded-full border border-white/10">
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-wider text-festival-gold-400 uppercase">Student Council</p>
              <p className="text-[9px] text-festival-cream-300">Fest Directorate</p>
            </div>
            <img
              src="/Assets/STUDENT-COUNCIL-LOGO.png"
              alt="Student Council NIMS"
              className="w-8 h-8 rounded-full border border-festival-gold-400/40 object-contain bg-white/90 p-0.5"
            />
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-festival-wine-900 border border-festival-gold-500/30 text-festival-gold-400"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-festival-wine-900/98 border-b border-festival-gold-500/30 px-4 pt-3 pb-6 space-y-2">
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
                    ? "bg-festival-crimson-600 text-white border border-festival-gold-400/50"
                    : "text-festival-cream-100 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-festival-gold-400" />
                  <span>{item.name}</span>
                </div>
                {item.hasDot && (
                  <span className="w-2 h-2 rounded-full bg-festival-gold-400 animate-ping" />
                )}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <Link
              to="/live"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-xs font-bold text-festival-gold-400"
            >
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>16:9 Stadium Broadcast Screen</span>
            </Link>
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-festival-cream-300 hover:text-festival-gold-400"
            >
              Staff Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

