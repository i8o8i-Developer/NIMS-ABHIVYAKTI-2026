import React from "react";
import { MapPin, Instagram, ExternalLink, Calendar, Sparkles, Trophy, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#18030c] via-[#0d0106] to-[#040002] text-white pt-14 pb-8 border-t border-amber-500/30 relative z-30 overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[88rem] 2xl:max-w-[94rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-10 border-b border-white/10">
          {/* Column 1: Event & NIMS Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-2xl shadow-md border border-slate-200/80 inline-flex items-center justify-center shrink-0">
                <img
                  src="/NIMS-LOGO.png"
                  alt="NIMS University Rajasthan"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="min-w-0">
                <span className="font-headline text-lg sm:text-xl font-black tracking-tight text-white block leading-tight truncate">
                  Abhivyakti 2026
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-400 block mt-0.5 truncate">
                  Inter-College Cultural Championship
                </span>
              </div>
            </div>

            <p className="text-xs text-rose-100/80 leading-relaxed font-normal">
              "Celebrating Cultural Majesty & Excellence." The Flagship Annual Inter-College Cultural Championship Organised By NIMS University Rajasthan And The Student Council.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-[11px] font-bold border border-amber-500/30 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                <span>100% Student Led</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold border border-white/15">
                <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                <span>22 Official Arenas</span>
              </span>
            </div>
          </div>

          {/* Column 2: Central Venue & Instagram Handle */}
          <div className="space-y-4">
            <h4 className="font-headline text-xs font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Festival Venue & Dates</span>
            </h4>

            <div className="space-y-3 text-xs text-rose-100/80">
              <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-2xl border border-white/10">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-semibold text-white">Rajeshwari Auditorium & Campus Grounds</p>
                  <p className="text-[11px] text-rose-200/70">NIMS University Rajasthan, Jaipur – 303121</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-rose-200/90 bg-white/5 px-3 py-2.5 rounded-xl border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Dates: <strong>18–21 November 2026</strong></span>
              </div>

              <a
                href="https://www.instagram.com/studentcouncilnims/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-amber-950/30 border border-pink-500/30 hover:border-pink-500/60 text-slate-200 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span className="font-medium text-xs truncate">@studentcouncilnims</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0 ml-2" />
              </a>
            </div>
          </div>

          {/* Column 3: Student Council / Institutional Partner */}
          <div className="space-y-4">
            <h4 className="font-headline text-xs font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Host Directorate</span>
            </h4>

            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 inline-flex items-center justify-center shrink-0">
                <img
                  src="/STUDENT-COUNCIL-LOGO.png"
                  alt="NIMS Student Council"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold uppercase text-white truncate">NIMS Student Council</p>
                <p className="text-[10px] text-amber-300 font-medium truncate">Official Fest Directorate 2026</p>
              </div>
            </div>

            <p className="text-xs text-rose-100/70 leading-relaxed font-normal">
              Organized And Steered By The NIMS Student Council Under The Aegis Of The Directorate Of Student Welfare & Cultural Affairs, NIMS University Rajasthan.
            </p>
          </div>
        </div>

        {/* Bottom Rights Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-200/60 gap-3 text-center sm:text-left">
          <p>© 2026 NIMS University Rajasthan, Jaipur. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-rose-200/60 text-xs">
            <span>Official Cultural Championship</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">NIMS Student Council</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
