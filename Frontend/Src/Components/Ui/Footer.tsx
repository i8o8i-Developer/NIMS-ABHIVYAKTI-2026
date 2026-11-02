import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, Heart, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#040002] border-t border-amber-500/20 pt-14 pb-8 text-rose-200/80 relative z-30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-rose-950/80">
          {/* Col 1: Festival Identity */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="bg-white/95 p-1.5 rounded-lg border border-amber-500/30">
                <img
                  src="/NIMS-LOGO.png"
                  alt="NIMS University Rajasthan"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <h4 className="text-sm font-serif font-bold text-white">NIMS University</h4>
                <p className="text-[11px] text-amber-400">Rajasthan • Jaipur</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-rose-200/70">
              NIMS Abhivyakti 2026 Is The Flagship Annual Inter-College Cultural Championship Celebrating Talent, Heritage, Music, Dance, And Arts Across Faculties.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-amber-300">
                NAAC A+ Accredited
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-amber-300">
                NIRF Top 100
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Championship Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors">Overview</Link>
              </li>
              <li>
                <Link to="/competitions" className="hover:text-amber-300 transition-colors">Competitions & Guidelines</Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-amber-300 transition-colors">Festival Itinerary</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-amber-300 transition-colors">Championship Standings</Link>
              </li>
              <li>
                <Link to="/contingents" className="hover:text-amber-300 transition-colors">Contingent Colleges</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-300 transition-colors">Media Highlights</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Council Directorate */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Fest Directorate
            </h4>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              Organized And Steered By The NIMS Student Council Under The Aegis Of The Directorate Of Student Welfare & Cultural Affairs.
            </p>
            <div className="pt-1 space-y-1.5 text-xs text-rose-300/80">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>NIMS Jaipur Grounds, NH-11C, Rajasthan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>abhivyakti@nimsuniversity.org</span>
              </div>
            </div>
          </div>

          {/* Col 4: Directorate Staff Portal Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Staff & Jury Operations
            </h4>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              Empanelled Jury Members And College Contingent Coordinators Can Access The Official Scoring Deck.
            </p>
            <div className="pt-2">
              <Link
                to="/admin/login"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#130206] hover:bg-amber-500 hover:text-black text-amber-300 border border-amber-500/30 text-xs font-bold transition-all shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Directorate Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-300/60 space-y-3 sm:space-y-0">
          <p>© 2026 NIMS University Rajasthan. All Rights Reserved. Abhivyakti Cultural Championship.</p>
          <p className="flex items-center space-x-1">
            <span>Crafted With Pride For NIMS Student Council</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
