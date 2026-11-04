import React from "react";
import {
  MapPin,
  Instagram,
  ExternalLink,
  Calendar,
  Sparkles,
  Trophy,
  Heart,
  ShieldCheck,
  Landmark,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050002] text-white pt-8 sm:pt-10 pb-10 relative z-30 overflow-hidden select-none">
      {/* Decorative Warm Ambient Glow Spots */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-rose-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* =========================================================================
          TOP ORNAMENTAL BANNER: ABHIVYAKTI 2026 FESTIVAL DIRECTORATE CREST
          Universal 280px Responsiveness With Dynamic Text & Diya Scaling
          ========================================================================= */}
      <div className="relative w-full pb-7 sm:pb-10 overflow-hidden z-20 px-2 sm:px-4">
        <div className="max-w-[88rem] 2xl:max-w-[94rem] mx-auto relative flex items-center justify-center">
          {/* Left Tapering Glowing Gold Line */}
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-amber-500/70 via-yellow-400 to-amber-300 shadow-[0_0_14px_rgba(245,184,66,0.8)]" />

          {/* Left Decorative Diamond Studs */}
          <div className="hidden sm:flex items-center gap-2.5 mx-3 lg:mx-4">
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-[0_0_8px_#F5B842]" />
            <span className="w-2.5 h-2.5 rotate-45 bg-rose-500 shadow-[0_0_10px_#F43F5E]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-[0_0_8px_#F5B842]" />
          </div>

          {/* Center Royal Directorate Pill With Flickering Brass Diyas */}
          <div className="relative px-3 min-[340px]:px-4 sm:px-8 py-1.5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#220412] via-[#2f061a] to-[#220412] border border-amber-400/80 shadow-[0_0_35px_rgba(245,184,66,0.4)] flex items-center gap-2 sm:gap-3.5 shrink-0 max-w-full">
            {/* Diya Left */}
            <div className="animate-live-flicker shrink-0">
              <svg width="20" height="15" viewBox="0 0 44 34" fill="none" className="drop-shadow-[0_0_8px_rgba(245,184,66,0.9)] sm:w-6 sm:h-4.5">
                <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
                <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FEF08A" />
                <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
                <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#D97706" />
              </svg>
            </div>

            <span className="font-serif font-black text-[9.5px] min-[340px]:text-[10.5px] min-[400px]:text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-300 drop-shadow-sm text-center">
              ✦ ABHIVYAKTI 2026 FESTIVAL DIRECTORATE ✦
            </span>

            {/* Diya Right */}
            <div className="animate-live-flicker shrink-0" style={{ animationDelay: "1.3s" }}>
              <svg width="20" height="15" viewBox="0 0 44 34" fill="none" className="drop-shadow-[0_0_8px_rgba(245,184,66,0.9)] sm:w-6 sm:h-4.5">
                <path d="M22 2C22 2 27 9 27 14C27 17.5 24.5 20 22 20C19.5 20 17 17.5 17 14C17 9 22 2 22 2Z" fill="#FACC15" />
                <path d="M22 6C22 6 25 10.5 25 14C25 16 23.5 17.5 22 17.5C20.5 17.5 19 16 19 14C19 10.5 22 6 22 6Z" fill="#FEF08A" />
                <path d="M4 17C7 26 15 31 22 31C29 31 37 26 40 17C33 21 27 22 22 22C17 22 11 21 4 17Z" fill="#881337" />
                <path d="M8 18C13 22 17 23 22 23C27 23 31 22 36 18C33 24 28 28 22 28C16 28 11 24 8 18Z" fill="#D97706" />
              </svg>
            </div>
          </div>

          {/* Right Decorative Diamond Studs */}
          <div className="hidden sm:flex items-center gap-2.5 mx-3 lg:mx-4">
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-[0_0_8px_#F5B842]" />
            <span className="w-2.5 h-2.5 rotate-45 bg-rose-500 shadow-[0_0_10px_#F43F5E]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-[0_0_8px_#F5B842]" />
          </div>

          {/* Right Tapering Glowing Gold Line */}
          <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-amber-500/70 via-yellow-400 to-amber-300 shadow-[0_0_14px_rgba(245,184,66,0.8)]" />
        </div>
      </div>

      <div className="max-w-[88rem] 2xl:max-w-[94rem] mx-auto px-3 min-[340px]:px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Three Deep Dark Themed Royal Panels (Matching Image 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 pb-10 border-b border-amber-500/15">
          {/* =========================================================
              PANEL 1: EVENT IDENTITY & NIMS CULTURAL LEGACY
              Fully Responsive Text - Zero Truncation / No Ellipsis
              ========================================================= */}
          <div className="p-4 min-[340px]:p-5 sm:p-7 rounded-2xl bg-[#0e0207]/90 border border-rose-500/30 hover:border-rose-400/50 shadow-2xl shadow-black/80 transition-all flex flex-col justify-between space-y-4 sm:space-y-5">
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <div className="bg-white p-1.5 min-[340px]:p-2 sm:p-2.5 rounded-xl shadow-md border border-slate-200/90 inline-flex items-center justify-center shrink-0">
                  <img
                    src="/NIMS-LOGO.png"
                    alt="NIMS University Rajasthan"
                    className="h-8 min-[340px]:h-8.5 sm:h-10 w-auto object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-serif text-base min-[360px]:text-lg sm:text-xl font-black tracking-tight text-white block leading-tight whitespace-normal">
                    Abhivyakti 2026
                  </span>
                  <span className="text-[9px] min-[340px]:text-[10px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest text-amber-400 block mt-0.5 whitespace-normal">
                    Inter-College Championship
                  </span>
                </div>
              </div>

              <p className="text-xs text-rose-100/80 leading-relaxed font-normal">
                "Celebrating Cultural Majesty & Excellence." The Flagship Annual Inter-College Cultural Championship Organized By NIMS University Rajasthan And Steered By The Student Council.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-rose-500/20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-[10.5px] min-[340px]:text-[11px] font-bold border border-amber-500/35 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                <span>100% Student Led</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-gray-200 text-[10.5px] min-[340px]:text-[11px] font-bold border border-white/15">
                <Trophy className="w-3 h-3 text-amber-400 shrink-0" />
                <span>22 Official Arenas</span>
              </span>
            </div>
          </div>

          {/* =========================================================
              PANEL 2: FESTIVAL VENUE & DATES (Consistently Maintained)
              ========================================================= */}
          <div className="p-4 min-[340px]:p-5 sm:p-7 rounded-2xl bg-[#0e0701]/90 border border-amber-500/30 hover:border-amber-400/50 shadow-2xl shadow-black/80 transition-all flex flex-col justify-between space-y-4 sm:space-y-5">
            <div className="space-y-3.5 sm:space-y-4">
              <h4 className="font-serif text-xs font-black uppercase tracking-widest text-amber-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Festival Venue & Dates</span>
              </h4>

              <div className="space-y-2.5 sm:space-y-3 text-xs text-amber-100/90">
                <div className="flex items-start gap-2.5 sm:gap-3 bg-black/60 p-3 sm:p-3.5 rounded-xl border border-amber-500/20">
                  <Landmark className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white text-xs whitespace-normal">Rajeshwari Auditorium & Campus Grounds</p>
                    <p className="text-[10.5px] sm:text-[11px] text-amber-200/70 mt-0.5 whitespace-normal">NIMS University Rajasthan, Jaipur – 303121</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-amber-200 bg-black/60 px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-xl border border-amber-500/20">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="whitespace-normal">
                    Championship Dates: <strong className="text-white font-bold">18–21 November 2026</strong>
                  </span>
                </div>
              </div>
            </div>

            <a
              href="https://www.instagram.com/studentcouncilnims/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-[#200412]/80 to-[#14020a]/80 border border-pink-500/30 hover:border-pink-400 text-slate-100 hover:text-white transition-all group shadow-sm"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="font-bold text-xs truncate">@studentcouncilnims</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0 ml-2" />
            </a>
          </div>

          {/* =========================================================
              PANEL 3: HOST DIRECTORATE & STUDENT WELFARE
              Fully Responsive Text - Zero Truncation / No Ellipsis
              ========================================================= */}
          <div className="p-4 min-[340px]:p-5 sm:p-7 rounded-2xl bg-[#08010d]/90 border border-purple-500/30 hover:border-purple-400/50 shadow-2xl shadow-black/80 transition-all flex flex-col justify-between space-y-4 sm:space-y-5">
            <div className="space-y-3.5 sm:space-y-4">
              <h4 className="font-serif text-xs font-black uppercase tracking-widest text-amber-300 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Host Directorate</span>
              </h4>

              <div className="flex items-center gap-2.5 sm:gap-3.5">
                <div className="bg-white p-1.5 min-[340px]:p-2 sm:p-2.5 rounded-xl shadow-md border border-slate-200 inline-flex items-center justify-center shrink-0">
                  <img
                    src="/STUDENT-COUNCIL-LOGO.png"
                    alt="NIMS Student Council"
                    className="h-8 min-[340px]:h-8.5 sm:h-10 w-auto object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-xs sm:text-sm font-bold uppercase text-white whitespace-normal">NIMS Student Council</p>
                  <p className="text-[9.5px] min-[340px]:text-[10px] text-amber-300 font-semibold whitespace-normal">Official Fest Directorate 2026</p>
                </div>
              </div>

              <p className="text-xs text-purple-100/80 leading-relaxed font-normal">
                Organized And Steered By The NIMS Student Council Under The Aegis Of The Directorate Of Student Welfare & Cultural Affairs, NIMS University Rajasthan.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-purple-500/20 text-[10.5px] min-[340px]:text-[11px] text-purple-200/90 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Official Institutional Sanction</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM RIGHTS NOTICE & VENUE RECOGNITION STRIP
            ========================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-200/60 gap-4 text-center sm:text-left">
          <p>© 2026 NIMS University Rajasthan, Jaipur. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-rose-200/60 text-xs">
            <span>Official Cultural Championship</span>
            <span className="text-amber-400/80">•</span>
            <span className="text-amber-300 font-semibold">NIMS Student Council</span>
            <span className="text-amber-400/80">•</span>
            <span>Rajeshwari Auditorium</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;