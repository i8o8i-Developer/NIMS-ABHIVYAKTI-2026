import React from "react";
import { Sparkles, Trophy, Music, Star, Flame } from "lucide-react";

interface FestiveTickerProps {
  announcements?: string[];
}

export const FestiveTicker: React.FC<FestiveTickerProps> = ({ announcements }) => {
  const items = announcements && announcements.length > 0 ? announcements : [
    "NIMS University Cultural Championship • 18-21 November 2026",
    "Abhivyakti 2026 Prestigious Championship Rolling Trophy",
    "Day 1 (18 Nov): Classical Dance & Vocal Resonance Prelims Open",
    "Day 2 (19 Nov): Couture Upcycling & Visual Arts Arena",
    "Day 3 (20 Nov): Theatrical Soliloquy & Generative AI Challenge",
    "Day 4 (21 Nov): Battle Of The Bands & Mega Group Dance Finale",
    "Official Guidelines & 4-Pillar Rubrics Available On Each Event Card",
  ];

  return (
    <div className="w-full bg-[#060002] border-b border-amber-500/20 py-2 overflow-hidden text-xs text-amber-100/90 select-none z-30 relative">
      <div className="flex w-max animate-ticker items-center space-x-10">
        {[...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center space-x-3 shrink-0">
            {i % 4 === 0 && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
            {i % 4 === 1 && <Trophy className="w-3.5 h-3.5 text-amber-400" />}
            {i % 4 === 2 && <Music className="w-3.5 h-3.5 text-rose-400" />}
            {i % 4 === 3 && <Star className="w-3.5 h-3.5 text-yellow-300" />}
            <span className="font-semibold tracking-wide text-rose-100">{text}</span>
            <span className="text-amber-500/50">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FestiveTicker;
