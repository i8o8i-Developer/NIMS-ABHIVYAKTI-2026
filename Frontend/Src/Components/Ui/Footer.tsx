import React from "react";
import { MapPin, Instagram, ExternalLink, Calendar, Sparkles, Trophy, Heart, ShieldCheck, Landmark } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#120208] via-[#0b0105] to-[#040002] text-white pt-8 pb-10 relative z-30 overflow-hidden">
      {/* Decorative Warm Ambient Glow Spots */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[88rem] 2xl:max-w-[94rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Three Elevated Royal Festival Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pb-10 border-b border-amber-500/20">
          {/* Panel 1: Event & NIMS Cultural Identity */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#240413]/90 via-[#15020c]/95 to-[#080104] border-2 border-rose-500/40 hover:border-rose-400/60 shadow-2xl shadow-rose-950/40 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2.5 rounded-2xl shadow-md border border-slate-200/90 inline-flex items-center justify-center shrink-0">
                  <img
                    src="/NIMS-LOGO.png"
                    alt="NIMS University Rajasthan"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <span className="font-serif text-lg sm:text-xl font-black tracking-tight text-white block leading-tight truncate">
                    Abhivyakti 2026
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-400 block mt-0.5 truncate">
                    Inter-College Championship
                  </span>
                </div>
              </div>

              <p className="text-xs text-rose-100/85 leading-relaxed font-normal">
                "Celebrating Cultural Majesty & Excellence." The flagship annual inter-college cultural championship organized by NIMS University Rajasthan and steered by the Student Council.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-rose-500/20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-[11px] font-bold border border-amber-500/35 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                <span>100% Student Led</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold border border-white/20">
                <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                <span>22 Official Arenas</span>
              </span>
            </div>
          </div>

          {/* Panel 2: Central Festival Venue & Social Connect */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#261703]/90 via-[#160d02]/95 to-[#080501] border-2 border-amber-400/40 hover:border-amber-300/60 shadow-2xl shadow-amber-950/40 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <h4 className="font-serif text-xs font-black uppercase tracking-widest text-amber-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Festival Venue & Dates</span>
              </h4>

              <div className="space-y-3 text-xs text-amber-100/90">
                <div className="flex items-start gap-3 bg-black/40 p-3.5 rounded-xl border border-amber-500/25">
                  <Landmark className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-bold text-white">Rajeshwari Auditorium & Campus Grounds</p>
                    <p className="text-[11px] text-amber-200/70 mt-0.5">NIMS University Rajasthan, Jaipur – 303121</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-amber-200 bg-black/40 px-3.5 py-3 rounded-xl border border-amber-500/25">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Championship Dates: <strong className="text-white">18–21 November 2026</strong></span>
                </div>
              </div>
            </div>

            <a
              href="https://www.instagram.com/studentcouncilnims/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-pink-950/50 via-purple-950/40 to-amber-950/40 border-2 border-pink-500/40 hover:border-pink-400 text-slate-100 hover:text-white transition-all group shadow-md"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="font-bold text-xs truncate">@studentcouncilnims</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-white shrink-0 ml-2" />
            </a>
          </div>

          {/* Panel 3: Host Directorate & Student Welfare */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#180424]/90 via-[#0e0216]/95 to-[#06010a] border-2 border-purple-400/40 hover:border-purple-300/60 shadow-2xl shadow-purple-950/40 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <h4 className="font-serif text-xs font-black uppercase tracking-widest text-amber-300 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Host Directorate</span>
              </h4>

              <div className="flex items-center gap-3">
                <div className="bg-white p-2.5 rounded-2xl shadow-md border border-slate-200 inline-flex items-center justify-center shrink-0">
                  <img
                    src="/STUDENT-COUNCIL-LOGO.png"
                    alt="NIMS Student Council"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-xs font-bold uppercase text-white truncate">NIMS Student Council</p>
                  <p className="text-[10px] text-amber-300 font-semibold truncate">Official Fest Directorate 2026</p>
                </div>
              </div>

              <p className="text-xs text-rose-100/80 leading-relaxed font-normal">
                Organized and steered by the NIMS Student Council under the aegis of the Directorate of Student Welfare & Cultural Affairs, NIMS University Rajasthan.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-purple-500/20 text-[11px] text-purple-200/90 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Official Institutional Sanction</span>
            </div>
          </div>
        </div>

        {/* Bottom Rights Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-200/70 gap-4 text-center sm:text-left">
          <p>© 2026 NIMS University Rajasthan, Jaipur. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-rose-200/70 text-xs">
            <span>Official Cultural Championship</span>
            <span className="text-amber-400">•</span>
            <span className="text-amber-300 font-semibold">NIMS Student Council</span>
            <span className="text-amber-400">•</span>
            <span>Rajeshwari Auditorium</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
