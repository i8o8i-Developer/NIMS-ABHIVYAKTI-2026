import React, { useState, useEffect } from "react";
import { FestiveTicker } from "@/Components/Ui/FestiveTicker";
import { Navbar } from "@/Components/Ui/Navbar";
import { Footer } from "@/Components/Ui/Footer";
import { FloatingBackgroundElements } from "@/Components/Ui/FloatingBackgroundElements";
import { Api } from "@/Lib/Api";
import {
  Building2,
  Trophy,
  Users,
  Search,
  Sparkles,
  GraduationCap,
} from "lucide-react";

interface CollegeItem {
  id: number;
  name: string;
  code: string;
  dean_or_head: string;
  student_coordinator: string;
  total_points: number;
  gold_medals: number;
  silver_medals: number;
  bronze_medals: number;
  is_active: boolean;
}

interface ContingentTheme {
  cardBg: string;
  border: string;
  hoverBorder: string;
  shadow: string;
  codeChip: string;
  pointsColor: string;
  deanIcon: string;
  coordIcon: string;
  divider: string;
  hoverTitle: string;
}

const CONTINGENT_THEMES: ContingentTheme[] = [
  // 0: Medical - Crimson Red (Battle of Bands / Crimson)
  {
    cardBg: "bg-gradient-to-b from-[#380811]/95 via-[#22040a]/98 to-[#120205]",
    border: "border-red-500/70",
    hoverBorder: "hover:border-red-300",
    shadow: "shadow-[0_8px_30px_rgba(239,68,68,0.25)]",
    codeChip: "bg-red-500/25 border-red-400/60 text-red-200",
    pointsColor: "text-amber-400",
    deanIcon: "text-red-400",
    coordIcon: "text-amber-400",
    divider: "border-red-900/60",
    hoverTitle: "group-hover:text-red-300",
  },
  // 1: Engineering - Electric Cyan & Ocean (Runway / Tech)
  {
    cardBg: "bg-gradient-to-b from-[#082a45]/95 via-[#041a2c]/98 to-[#020e18]",
    border: "border-cyan-400/70",
    hoverBorder: "hover:border-cyan-300",
    shadow: "shadow-[0_8px_30px_rgba(6,182,212,0.25)]",
    codeChip: "bg-cyan-500/25 border-cyan-400/60 text-cyan-200",
    pointsColor: "text-cyan-300",
    deanIcon: "text-cyan-400",
    coordIcon: "text-amber-300",
    divider: "border-cyan-900/60",
    hoverTitle: "group-hover:text-cyan-300",
  },
  // 2: Business - Warm Golden Amber (Harmony / Saffron)
  {
    cardBg: "bg-gradient-to-b from-[#3d2406]/95 via-[#241503]/98 to-[#130a01]",
    border: "border-amber-400/70",
    hoverBorder: "hover:border-amber-300",
    shadow: "shadow-[0_8px_30px_rgba(245,158,11,0.25)]",
    codeChip: "bg-amber-500/25 border-amber-400/60 text-amber-200",
    pointsColor: "text-yellow-300",
    deanIcon: "text-amber-400",
    coordIcon: "text-yellow-300",
    divider: "border-amber-900/60",
    hoverTitle: "group-hover:text-amber-300",
  },
  // 3: Law - Royal Amethyst Purple (Fine Arts / Drama)
  {
    cardBg: "bg-gradient-to-b from-[#2d0947]/95 via-[#1b052c]/98 to-[#0e0217]",
    border: "border-purple-400/70",
    hoverBorder: "hover:border-purple-300",
    shadow: "shadow-[0_8px_30px_rgba(168,85,247,0.25)]",
    codeChip: "bg-purple-500/25 border-purple-400/60 text-purple-200",
    pointsColor: "text-amber-300",
    deanIcon: "text-purple-400",
    coordIcon: "text-fuchsia-300",
    divider: "border-purple-900/60",
    hoverTitle: "group-hover:text-purple-300",
  },
  // 4: Dental - Radiant Hot Pink (Groove-O-Mania Dance)
  {
    cardBg: "bg-gradient-to-b from-[#38091d]/95 via-[#220511]/98 to-[#130209]",
    border: "border-pink-500/70",
    hoverBorder: "hover:border-pink-300",
    shadow: "shadow-[0_8px_30px_rgba(236,72,153,0.25)]",
    codeChip: "bg-pink-500/25 border-pink-400/60 text-pink-200",
    pointsColor: "text-amber-300",
    deanIcon: "text-pink-400",
    coordIcon: "text-amber-300",
    divider: "border-pink-900/60",
    hoverTitle: "group-hover:text-pink-300",
  },
  // 5: Pharmacy - Emerald Green & Mint (Nukkad Natak & Theatre)
  {
    cardBg: "bg-gradient-to-b from-[#06331e]/95 via-[#031f12]/98 to-[#011209]",
    border: "border-emerald-400/70",
    hoverBorder: "hover:border-emerald-300",
    shadow: "shadow-[0_8px_30px_rgba(16,185,129,0.25)]",
    codeChip: "bg-emerald-500/25 border-emerald-400/60 text-emerald-200",
    pointsColor: "text-emerald-300",
    deanIcon: "text-emerald-400",
    coordIcon: "text-lime-300",
    divider: "border-emerald-900/60",
    hoverTitle: "group-hover:text-emerald-300",
  },
  // 6: Nursing - Electric Royal Blue & Indigo
  {
    cardBg: "bg-gradient-to-b from-[#131c52]/95 via-[#0a1033]/98 to-[#05081c]",
    border: "border-blue-400/70",
    hoverBorder: "hover:border-blue-300",
    shadow: "shadow-[0_8px_30px_rgba(59,130,246,0.25)]",
    codeChip: "bg-blue-500/25 border-blue-400/60 text-blue-200",
    pointsColor: "text-amber-300",
    deanIcon: "text-blue-400",
    coordIcon: "text-cyan-300",
    divider: "border-blue-900/60",
    hoverTitle: "group-hover:text-blue-300",
  },
  // 7: Allied Health - Fiery Sunset Orange & Flame
  {
    cardBg: "bg-gradient-to-b from-[#2a0802]/95 via-[#380e04]/95 to-[#1c0401]/95",
    border: "border-orange-500/70",
    hoverBorder: "hover:border-orange-400",
    shadow: "shadow-[0_8px_30px_rgba(249,115,22,0.25)]",
    codeChip: "bg-orange-500/25 border-orange-400/60 text-orange-200",
    pointsColor: "text-amber-300",
    deanIcon: "text-orange-400",
    coordIcon: "text-yellow-300",
    divider: "border-orange-900/60",
    hoverTitle: "group-hover:text-orange-300",
  },
  // 8: Hotel Management - Warm Saffron & Honey Gold
  {
    cardBg: "bg-gradient-to-b from-[#3d2406]/95 via-[#241503]/98 to-[#130a01]",
    border: "border-yellow-400/70",
    hoverBorder: "hover:border-yellow-300",
    shadow: "shadow-[0_8px_30px_rgba(234,179,8,0.25)]",
    codeChip: "bg-yellow-500/25 border-yellow-400/60 text-yellow-200",
    pointsColor: "text-yellow-300",
    deanIcon: "text-yellow-400",
    coordIcon: "text-amber-300",
    divider: "border-yellow-900/60",
    hoverTitle: "group-hover:text-yellow-300",
  },
  // 9: Humanities - Deep Berry & Fuchsia Violet
  {
    cardBg: "bg-gradient-to-b from-[#33051c]/95 via-[#1f0311]/98 to-[#0f0108]",
    border: "border-fuchsia-400/70",
    hoverBorder: "hover:border-fuchsia-300",
    shadow: "shadow-[0_8px_30px_rgba(217,70,239,0.25)]",
    codeChip: "bg-fuchsia-500/25 border-fuchsia-400/60 text-fuchsia-200",
    pointsColor: "text-amber-300",
    deanIcon: "text-fuchsia-400",
    coordIcon: "text-pink-300",
    divider: "border-fuchsia-900/60",
    hoverTitle: "group-hover:text-fuchsia-300",
  },
  // 10: Computing & AI - High-Tech Neon Teal & Cyan
  {
    cardBg: "bg-gradient-to-b from-[#03292b]/95 via-[#02181a]/98 to-[#010e0f]",
    border: "border-teal-400/70",
    hoverBorder: "hover:border-teal-300",
    shadow: "shadow-[0_8px_30px_rgba(20,184,166,0.25)]",
    codeChip: "bg-teal-500/25 border-teal-400/60 text-teal-200",
    pointsColor: "text-teal-300",
    deanIcon: "text-teal-400",
    coordIcon: "text-emerald-300",
    divider: "border-teal-900/60",
    hoverTitle: "group-hover:text-teal-300",
  },
  // 11: Design & Fashion - Regal Orchid Violet
  {
    cardBg: "bg-gradient-to-b from-[#2d0947]/95 via-[#1b052c]/98 to-[#0e0217]",
    border: "border-violet-400/70",
    hoverBorder: "hover:border-violet-300",
    shadow: "shadow-[0_8px_30px_rgba(139,92,246,0.25)]",
    codeChip: "bg-violet-500/25 border-violet-400/60 text-violet-200",
    pointsColor: "text-amber-300",
    deanIcon: "text-violet-400",
    coordIcon: "text-fuchsia-300",
    divider: "border-violet-900/60",
    hoverTitle: "group-hover:text-violet-300",
  },
];

const FALLBACK_COLLEGES: CollegeItem[] = [
  { id: 1, name: "National Institute Of Medical Sciences & Research", code: "NIMS-MED", dean_or_head: "Dr. A. K. Sharma", student_coordinator: "Aman Verma", total_points: 120, gold_medals: 2, silver_medals: 1, bronze_medals: 1, is_active: true },
  { id: 2, name: "NIMS Institute Of Engineering & Technology", code: "NIET", dean_or_head: "Dr. Rajesh Gupta", student_coordinator: "Sneha Patel", total_points: 95, gold_medals: 1, silver_medals: 2, bronze_medals: 0, is_active: true },
  { id: 3, name: "NIMS School Of Business & Management", code: "NSB", dean_or_head: "Prof. Priya Mehta", student_coordinator: "Rohan Singh", total_points: 75, gold_medals: 1, silver_medals: 1, bronze_medals: 1, is_active: true },
  { id: 4, name: "NIMS Institute Of Law & Legal Studies", code: "NILL", dean_or_head: "Dr. Vikram Joshi", student_coordinator: "Ananya Mishra", total_points: 60, gold_medals: 1, silver_medals: 0, bronze_medals: 1, is_active: true },
  { id: 5, name: "NIMS Dental College & Hospital", code: "NDCH", dean_or_head: "Dr. Shalini Roy", student_coordinator: "Kabir Khan", total_points: 50, gold_medals: 0, silver_medals: 2, bronze_medals: 0, is_active: true },
  { id: 6, name: "NIMS Institute Of Pharmacy", code: "NIP", dean_or_head: "Dr. Suresh Nair", student_coordinator: "Kavya Reddy", total_points: 40, gold_medals: 0, silver_medals: 1, bronze_medals: 1, is_active: true },
  { id: 7, name: "NIMS College Of Nursing", code: "NCN", dean_or_head: "Prof. Mary Joseph", student_coordinator: "Pooja Das", total_points: 35, gold_medals: 0, silver_medals: 1, bronze_medals: 1, is_active: true },
  { id: 8, name: "NIMS Institute Of Allied Health Sciences", code: "NIAHS", dean_or_head: "Dr. Manish Mathur", student_coordinator: "Arjun Rao", total_points: 30, gold_medals: 0, silver_medals: 0, bronze_medals: 2, is_active: true },
  { id: 9, name: "NIMS Institute Of Hotel Management", code: "NIHM", dean_or_head: "Chef Rakesh Kumar", student_coordinator: "Divya Chauhan", total_points: 25, gold_medals: 0, silver_medals: 1, bronze_medals: 0, is_active: true },
  { id: 10, name: "NIMS Institute Of Humanities & Social Sciences", code: "NIHSS", dean_or_head: "Dr. Sunita Sen", student_coordinator: "Mohit Jain", total_points: 20, gold_medals: 0, silver_medals: 0, bronze_medals: 1, is_active: true },
  { id: 11, name: "NIMS School Of Computing & AI", code: "NSCAI", dean_or_head: "Dr. Deepak Verma", student_coordinator: "Tanvi Saxena", total_points: 20, gold_medals: 0, silver_medals: 0, bronze_medals: 1, is_active: true },
  { id: 12, name: "NIMS Institute Of Design & Fashion", code: "NIDF", dean_or_head: "Prof. Sonia Kapoor", student_coordinator: "Ishaan Ali", total_points: 15, gold_medals: 0, silver_medals: 0, bronze_medals: 1, is_active: true },
];

export const ContingentsPage: React.FC = () => {
  const [colleges, setColleges] = useState<CollegeItem[]>(FALLBACK_COLLEGES);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await Api.get("/colleges/");
        if (res.data?.results && res.data.results.length > 0) {
          setColleges(res.data.results);
        }
      } catch {
        // Fallback
      }
    };
    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.student_coordinator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#070104] text-amber-50 relative selection:bg-amber-500 selection:text-black antialiased overflow-x-hidden">
      <FloatingBackgroundElements variant="subpage" />
      <FestiveTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Participating Institutes</span>
          </div>
          <h1 className="text-2xl min-[340px]:text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
            Contingents & Colleges
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-2 leading-relaxed px-2">
            12 Premier Colleges And Institutes Of NIMS University Competing With Full Contingents For Championship Supremacy.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 sm:mb-10 relative px-1">
          <Search className="w-4 h-4 text-amber-400 absolute left-4.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Contingents By Name Or Code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#0d0104] border border-rose-950 focus:border-amber-500 text-xs text-white placeholder-rose-300/40 focus:outline-none transition-colors shadow-xl"
          />
        </div>

        {/* Contingents Grid - Colorful Cultural Cards Styled Like Home Page Arenas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredColleges.map((col, idx) => {
            const theme = CONTINGENT_THEMES[idx % CONTINGENT_THEMES.length];
            return (
              <div
                key={col.id}
                className={`p-4 sm:p-6 rounded-2xl ${theme.cardBg} border-2 ${theme.border} ${theme.hoverBorder} hover:scale-[1.02] transition-all duration-300 group ${theme.shadow} flex flex-col justify-between backdrop-blur-xl`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${theme.codeChip}`}>
                      {col.code}
                    </span>
                    <div className={`flex items-center gap-1.5 text-xs font-bold ${theme.pointsColor}`}>
                      <Trophy className="w-4 h-4 shrink-0" />
                      <span>{col.total_points} Pts</span>
                    </div>
                  </div>

                  <h3 className={`text-sm sm:text-base font-bold text-white ${theme.hoverTitle} transition-colors leading-snug`}>
                    {col.name}
                  </h3>

                  <div className={`mt-4 pt-3 border-t ${theme.divider} space-y-2 text-xs text-rose-300/80`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <GraduationCap className={`w-3.5 h-3.5 ${theme.deanIcon} shrink-0`} />
                      <span className="truncate">Dean: <strong className="text-white font-semibold">{col.dean_or_head || "Dean / Director"}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                      <Users className={`w-3.5 h-3.5 ${theme.coordIcon} shrink-0`} />
                      <span className="truncate">Coordinator: <strong className="text-white font-semibold">{col.student_coordinator || "Contingent Head"}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Medals Tally Bar */}
                <div className={`mt-5 pt-3 border-t ${theme.divider} flex items-center justify-between text-xs`}>
                  <span className="text-rose-300/80 font-medium">Medals:</span>
                  <div className="flex items-center gap-2.5 sm:gap-3 font-bold">
                    <span className="text-amber-300">🥇 {col.gold_medals}</span>
                    <span className="text-zinc-200">🥈 {col.silver_medals}</span>
                    <span className="text-amber-500">🥉 {col.bronze_medals}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContingentsPage;
