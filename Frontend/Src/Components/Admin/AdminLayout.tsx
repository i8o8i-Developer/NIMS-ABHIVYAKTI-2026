import React, { useState } from "react";
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
  Flame,
} from "lucide-react";

export const AdminLayout: React.FC = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const navItems = [
    { label: "Executive Dashboard", path: "/admin/dashboard", icon: LayoutDashboard, roles: ["super_admin", "coordinator", "judge", "operator"] },
    { label: "Jury Scoring Engine", path: "/admin/scores", icon: Trophy, roles: ["super_admin", "coordinator", "judge"] },
    { label: "Competitions Roster", path: "/admin/competitions", icon: CalendarCheck, roles: ["super_admin", "coordinator"] },
    { label: "Colleges & Contingents", path: "/admin/colleges", icon: Building2, roles: ["super_admin", "coordinator"] },
    { label: "Festival Gallery", path: "/admin/gallery", icon: ImageIcon, roles: ["super_admin", "coordinator", "operator"] },
    { label: "System Settings", path: "/admin/settings", icon: Sliders, roles: ["super_admin"] },
    { label: "Staff & Permissions", path: "/admin/users", icon: Users, roles: ["super_admin"] },
  ];

  const filteredNavItems = navItems.filter((item) => !role || item.roles.includes(role));

  const roleBadgeColors: Record<string, string> = {
    super_admin: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    coordinator: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    judge: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    operator: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    viewer: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
  };

  const roleDisplayNames: Record<string, string> = {
    super_admin: "Super Admin",
    coordinator: "Fest Coordinator",
    judge: "Official Jury",
    operator: "Score Operator",
    viewer: "Guest Viewer",
  };

  return (
    <div className="min-h-screen bg-[#0e0204] text-amber-50 flex flex-col md:flex-row antialiased">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#180307] border-b border-rose-950/60 sticky top-0 z-50">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <img src="/Abhivyakti.png" alt="Abhivyakti Logo" className="h-8 w-auto object-contain" />
          <span className="font-serif font-bold text-lg text-amber-400">Admin Portal</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-rose-950/40 text-amber-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-72 bg-[#140206] border-r border-rose-950/70 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Header */}
          <div className="p-5 border-b border-rose-950/60">
            <Link to="/" target="_blank" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-[#220409] border border-amber-500/30 group-hover:border-amber-400/60 transition-colors">
                <img src="/Abhivyakti.png" alt="Abhivyakti Logo" className="h-9 w-auto object-contain" />
              </div>
              <div>
                <h1 className="font-serif font-black text-lg tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300">
                  Abhivyakti 2026
                </h1>
                <p className="text-xs text-rose-300/70 font-medium">Festival Directorate</p>
              </div>
            </Link>

            {/* Current User Pill */}
            {user && (
              <div className="mt-4 p-3 rounded-xl bg-[#1c0409] border border-rose-900/40 flex items-center justify-between">
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-amber-100 truncate">{user.full_name}</p>
                  <p className="text-[11px] text-rose-300/60 truncate">{user.email}</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                    roleBadgeColors[user.role] || "bg-zinc-800 text-zinc-300 border-zinc-700"
                  }`}
                >
                  {roleDisplayNames[user.role] || user.role}
                </span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/25 to-rose-900/30 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-950/20"
                      : "text-rose-200/80 hover:text-amber-200 hover:bg-rose-950/40 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-rose-400/80"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-amber-400" />}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-rose-950/60 space-y-2">
            <Link
              to="/live"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-amber-300/90 bg-amber-950/30 border border-amber-500/30 hover:bg-amber-900/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Open Stadium Live View</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </Link>

            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-rose-200/80 bg-rose-950/20 border border-rose-900/30 hover:bg-rose-950/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-rose-400" />
                <span>View Public Portal</span>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-rose-950/30 hover:bg-rose-900/50 border border-rose-900/50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Of Directorate</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-[#140206]/80 backdrop-blur-md border-b border-rose-950/50 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-xs uppercase tracking-wider text-rose-400/80 font-bold">Directorate Control Deck</p>
              <p className="text-sm font-semibold text-amber-100">National Institute Of Medical Sciences & University</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-300">Live Scoring Active</span>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AdminLayout;

