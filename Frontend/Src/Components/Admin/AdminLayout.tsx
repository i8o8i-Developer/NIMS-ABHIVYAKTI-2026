import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/Lib/Auth";
import {
  LayoutDashboard,
  Trophy,
  CalendarCheck,
  Building2,
  Image as ImageIcon,
  Sliders,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Radio,
  Clock,
} from "lucide-react";

export const AdminLayout: React.FC = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const navItems = [
    {
      label: "Executive Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      roles: ["super_admin", "coordinator", "judge", "operator"],
    },
    {
      label: "Jury Scoring Engine",
      path: "/admin/scores",
      icon: Trophy,
      roles: ["super_admin", "coordinator", "judge"],
    },
    {
      label: "Competitions Roster",
      path: "/admin/competitions",
      icon: CalendarCheck,
      roles: ["super_admin", "coordinator"],
    },
    {
      label: "Colleges & Contingents",
      path: "/admin/colleges",
      icon: Building2,
      roles: ["super_admin", "coordinator"],
    },
    {
      label: "Festival Gallery",
      path: "/admin/gallery",
      icon: ImageIcon,
      roles: ["super_admin", "coordinator", "operator"],
    },
    {
      label: "System Settings",
      path: "/admin/settings",
      icon: Sliders,
      roles: ["super_admin"],
    },
    {
      label: "Staff & Permissions",
      path: "/admin/users",
      icon: Users,
      roles: ["super_admin"],
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !role || item.roles.includes(role)
  );

  const roleBadgeColors: Record<string, string> = {
    super_admin: "bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-sm shadow-amber-500/20",
    coordinator: "bg-blue-500/20 text-blue-300 border-blue-400/50 shadow-sm shadow-blue-500/20",
    judge: "bg-purple-500/20 text-purple-300 border-purple-400/50 shadow-sm shadow-purple-500/20",
    operator: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-sm shadow-emerald-500/20",
    viewer: "bg-zinc-500/20 text-zinc-300 border-zinc-400/50",
  };

  const roleDisplayNames: Record<string, string> = {
    super_admin: "Super Admin",
    coordinator: "Fest Coordinator",
    judge: "Official Jury",
    operator: "Score Operator",
    viewer: "Guest Viewer",
  };

  return (
    <div className="min-h-screen bg-[#070104] text-amber-50 flex flex-col md:flex-row antialiased selection:bg-amber-500 selection:text-black">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-3 py-2.5 bg-[#0e0207] border-b border-amber-500/30 sticky top-0 z-50">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-white/95 border border-amber-400/60 shadow">
            <img
              src="/Abhivyakti.png"
              alt="Abhivyakti Logo"
              className="h-6 w-auto object-contain"
            />
          </div>
          <span className="font-serif font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
            Directorate Deck
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-xl bg-[#1c020d] border border-amber-500/30 text-amber-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Reimagined Executive Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-72 max-w-[85vw] bg-gradient-to-b from-[#0e0207] via-[#090104] to-[#060002] border-r border-amber-500/25 flex flex-col justify-between transition-transform duration-200 ease-in-out shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="p-4 sm:p-5 border-b border-amber-500/20 bg-gradient-to-r from-[#17030c] to-[#0e0207]">
            <Link to="/" target="_blank" className="flex items-center gap-3 group">
              <div className="p-2 rounded-2xl bg-white shadow-lg border-2 border-amber-400/80 group-hover:scale-105 transition-transform">
                <img
                  src="/Abhivyakti.png"
                  alt="Abhivyakti Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif font-black text-base sm:text-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400">
                  Abhivyakti 2026
                </h1>
                <p className="text-[11px] text-amber-300/80 font-bold uppercase tracking-wider">
                  Festival Directorate
                </p>
              </div>
            </Link>

            {/* Current User Chip */}
            {user && (
              <div className="mt-3.5 p-2.5 rounded-xl bg-[#140209] border border-amber-500/25 flex items-center justify-between gap-2 shadow-inner">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-amber-100 truncate">
                    {user.full_name || "Fest Administrator"}
                  </p>
                  <p className="text-[10px] text-rose-300/70 font-mono truncate">
                    {user.email}
                  </p>
                </div>
                <span
                  className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-wider shrink-0 ${
                    roleBadgeColors[user.role] ||
                    "bg-zinc-800 text-zinc-300 border-zinc-700"
                  }`}
                >
                  {roleDisplayNames[user.role] || user.role}
                </span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-2.5 sm:px-3 py-3 space-y-1 custom-scrollbar">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/25 via-pink-600/20 to-purple-600/20 text-amber-200 border border-amber-400/50 shadow-lg shadow-amber-950/40"
                      : "text-rose-200/75 hover:text-amber-100 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-amber-300" : "text-amber-400/60"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-amber-300 shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-3 border-t border-amber-500/20 bg-[#0a0105] space-y-1.5">
            <Link
              to="/#leaderboard"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Leaderboard</span>
              </div>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </Link>

            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-rose-200/80 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Public Portal Hub</span>
              </div>
              <ExternalLink className="w-3 h-3 text-rose-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 transition-all shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Of Directorate</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-6 lg:px-8 py-3.5 bg-[#0e0207]/90 backdrop-blur-xl border-b border-amber-500/25 sticky top-0 z-30 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                Directorate Control Deck
              </p>
              <p className="text-xs sm:text-sm font-serif font-black text-white">
                National Institute Of Medical Sciences & University, Rajasthan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Real-time Clock */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#17030c] border border-amber-500/20 text-amber-300 text-xs font-mono font-bold">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentTime}</span>
            </div>

            {/* Real-time Status Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-400/50 shadow-sm shadow-emerald-900/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-300">
                Live Scoring Active
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <div className="p-3 min-[340px]:p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
