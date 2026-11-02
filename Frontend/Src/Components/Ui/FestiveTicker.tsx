import React from "react";
import { Sparkles, Trophy, Music, Star, Flame } from "lucide-react";

interface FestiveTickerProps {
  announcements?: string[];
}

export const FestiveTicker: React.FC<FestiveTickerProps> = ({ announcements }) => {
  const items = announcements && announcements.length > 0 ? announcements : [
    "NIMS University Cultural Championship 2026",
    "Abhivyakti 2026 Prestigious Championship Rolling Trophy",
    "Mega Battle Of The Bands & Rock Concert Prelims Open",
    "Star Celebrity Night Announcement Dropping Soon",
    "High-Stakes Nukkad Natak & Classical Dance Active",
  ];

  return (
    <div className="w-full bg-[#180308] border-b border-[#F5B842]/20 py-2 overflow-hidden text-xs text-festival-cream-200">
      <div className="flex w-max animate-ticker items-center space-x-10">
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center space-x-3 shrink-0">
            {i % 4 === 0 && <Sparkles className="w-3.5 h-3.5 text-festival-gold-400" />}
            {i % 4 === 1 && <Trophy className="w-3.5 h-3.5 text-festival-gold-400" />}
            {i % 4 === 2 && <Music className="w-3.5 h-3.5 text-rose-400" />}
            {i % 4 === 3 && <Star className="w-3.5 h-3.5 text-amber-300" />}
            <span className="font-medium tracking-wide">{text}</span>
            <span className="text-festival-gold-500/50">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

