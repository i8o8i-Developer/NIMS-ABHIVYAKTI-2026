import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, Heart, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#240410] via-[#1a031e] to-[#0c0112] border-t-2 border-amber-400/50 pt-14 pb-8 text-amber-100 relative z-30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-amber-400/30">
          {/* Col 1: Festival Identity */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="bg-white/95 p-1.5 rounded-xl border-2 border-amber-400/50 shadow-lg">
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
            <p className="text-xs leading-relaxed text-rose-200/90 font-medium">
              NIMS Abhivyakti 2026 Is The Flagship Annual Inter-College Cultural Championship Celebrating Talent, Heritage, Music, Dance, And Arts Across Faculties.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-400/40 text-amber-200">
                NAAC A+ Accredited
              </span>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/40 text-cyan-200">
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

          {/* Col 4: Central Festival Helpdesk */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Festival Helpdesk
            </h4>
            <p className="text-xs text-rose-200/70 leading-relaxed">
              For Inquiries Regarding College Contingent Registrations, Logistics, Or Competition Guidelines, Contact The Central Helpdesk.
            </p>
            <div className="pt-1 space-y-1.5 text-xs text-rose-300/80">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+91 141 399 9100 / Ext. 2026</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Student Welfare Central Office</span>
              </div>
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
