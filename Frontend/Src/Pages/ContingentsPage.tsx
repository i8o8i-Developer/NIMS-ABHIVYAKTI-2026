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
  Medal,
  Mail,
  Phone,
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
    <div className="min-h-screen bg-[#0e0204] text-amber-50 relative selection:bg-amber-500 selection:text-black">
      <FloatingBackgroundElements />
      <FestiveTicker />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Participating Institutes</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Contingents & Colleges
          </h1>
          <p className="text-sm text-rose-200/80 mt-3 leading-relaxed">
            12 Premier Colleges And Institutes Of NIMS University Competing With Full Contingents For Championship Supremacy.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-rose-400/60" />
          <input
            type="text"
            placeholder="Search Contingents By Name Or Code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#170306] border border-rose-950/80 focus:border-amber-500/60 text-xs text-white placeholder-rose-300/40 focus:outline-none transition-colors shadow-lg"
          />
        </div>

        {/* Contingents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((col) => (
            <div
              key={col.id}
              className="p-6 rounded-2xl bg-[#170306] border border-rose-950/80 hover:border-amber-500/40 hover:bg-[#1e0408] transition-all group shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {col.code}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <Trophy className="w-4 h-4" />
                    <span>{col.total_points} Pts</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {col.name}
                </h3>

                <div className="mt-4 pt-3 border-t border-rose-950/60 space-y-2 text-xs text-rose-300/80">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>Dean: <strong className="text-rose-100">{col.dean_or_head || "Dean / Director"}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Coordinator: <strong className="text-rose-100">{col.student_coordinator || "Contingent Head"}</strong></span>
                  </div>
                </div>
              </div>

              {/* Medals Tally Bar */}
              <div className="mt-6 pt-3 border-t border-rose-950/60 flex items-center justify-between text-xs">
                <span className="text-rose-400/80 font-medium">Medals:</span>
                <div className="flex items-center gap-3 font-bold">
                  <span className="text-amber-300">🥇 {col.gold_medals}</span>
                  <span className="text-zinc-300">🥈 {col.silver_medals}</span>
                  <span className="text-amber-600">🥉 {col.bronze_medals}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default ContingentsPage;

