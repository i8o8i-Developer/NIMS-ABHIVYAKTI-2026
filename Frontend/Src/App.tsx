import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/Lib/Auth";

// Public Pages
import Home from "@/Pages/Home";
import CompetitionsPage from "@/Pages/CompetitionsPage";
import SchedulePage from "@/Pages/SchedulePage";
import LeaderboardPage from "@/Pages/LeaderboardPage";
import GalleryPage from "@/Pages/GalleryPage";
import ContingentsPage from "@/Pages/ContingentsPage";

// Admin Suite Pages
import AdminLogin from "@/Pages/AdminLogin";
import AdminLayout from "@/Components/Admin/AdminLayout";
import AdminDashboard from "@/Pages/AdminDashboard";
import AdminScores from "@/Pages/AdminScores";
import AdminCompetitions from "@/Pages/AdminCompetitions";
import AdminColleges from "@/Pages/AdminColleges";
import AdminGallery from "@/Pages/AdminGallery";
import AdminSettings from "@/Pages/AdminSettings";
import AdminUsers from "@/Pages/AdminUsers";

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070102] flex items-center justify-center text-amber-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest text-rose-300">
            Verifying Directorate Session...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contingents" element={<ContingentsPage />} />

          {/* Graceful Fallbacks: Rulebook is attached per event, No Live Screen Ever */}
          <Route path="/rulebook" element={<Navigate to="/competitions" replace />} />
          <Route path="/live" element={<Navigate to="/leaderboard" replace />} />

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Deck */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="scores" element={<AdminScores />} />
            <Route path="competitions" element={<AdminCompetitions />} />
            <Route path="colleges" element={<AdminColleges />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;
