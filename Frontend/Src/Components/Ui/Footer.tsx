import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, Heart, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0D0104] border-t border-festival-gold-500/20 pt-14 pb-8 text-festival-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Festival Identity */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="bg-white/95 p-1.5 rounded-lg border border-festival-gold-500/30">
                <img
                  src="/Assets/NIMS-LOGO.png"
                  alt="NIMS University Rajasthan"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div>
                <h4 className="text-sm font-serif font-bold text-white">NIMS University</h4>
                <p className="text-[11px] text-festival-gold-400">Rajasthan • Jaipur</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-festival-cream-300/80">
              NIMS Abhivyakti 2026 is the flagship annual inter-college cultural championship celebrating talent, heritage, music, dance, and arts across faculties.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-festival-gold-400">
                NAAC A+ Accredited
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-festival-gold-400">
                NIRF Top 100
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-festival-gold-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-festival-gold-300 transition-colors">Overview</Link>
              </li>
              <li>
                <Link to="/competitions" className="hover:text-festival-gold-300 transition-colors">Competitions & Arenas</Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-festival-gold-300 transition-colors">Fest Schedule</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-festival-gold-300 transition-colors">Championship Leaderboard</Link>
              </li>
              <li>
                <Link to="/rulebook" className="hover:text-festival-gold-300 transition-colors">Official Rulebook</Link>
              </li>
              <li>
                <Link to="/contingents" className="hover:text-festival-gold-300 transition-colors">Colleges & Contingents</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Cultural Arenas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-festival-gold-400">
              Fest Arenas
            </h4>
            <ul className="space-y-2 text-xs text-festival-cream-300/80">
              <li>Dance - Solo, Duet & Group</li>
              <li>Singing - Solo, Duet & Band</li>
              <li>Theatre & Mono Act</li>
              <li>Fine Arts & Face Painting</li>
              <li>Fashion Upcycling & MakeUp</li>
              <li>AI Art & Digital Design</li>
              <li>Celebrity Star Night</li>
            </ul>
          </div>

          {/* Col 4: Venue & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-festival-gold-400">
              Festival Directorate
            </h4>
            <div className="space-y-2.5 text-xs text-festival-cream-300/80">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-festival-gold-400 shrink-0 mt-0.5" />
                <span>Rajeshwari Auditorium & Grounds, NIMS University Rajasthan, Jaipur – 303121</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-festival-gold-400 shrink-0" />
                <a href="mailto:abhivyakti@nimsuniversity.org" className="hover:text-festival-gold-300">
                  abhivyakti@nimsuniversity.org
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-festival-gold-400 shrink-0" />
                <span>Helpline: +91 141 666 0999</span>
              </div>
            </div>
            <div className="pt-3">
              <Link
                to="/admin/login"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-festival-wine-900 border border-festival-gold-500/30 text-xs font-medium text-festival-gold-400 hover:bg-festival-crimson-700/50 transition-colors"
              >
                <span>Staff & Jury Login</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-festival-cream-300/60 space-y-3 sm:space-y-0">
          <p>© 2026 NIMS University Rajasthan • Student Council Fest Directorate. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <Link to="/rulebook" className="hover:text-festival-gold-400 transition-colors">Code Of Conduct</Link>
            <span>•</span>
            <Link to="/live" target="_blank" className="hover:text-festival-gold-400 transition-colors">Stadium Screen</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

