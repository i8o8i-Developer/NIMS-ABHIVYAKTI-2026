import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate = "2026-11-21T09:00:00",
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 15,
    minutes: 40,
    seconds: 12,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4">
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center justify-center bg-[#150408]/90 backdrop-blur-md w-18 sm:w-24 md:w-28 h-20 sm:h-26 md:h-28 rounded-2xl border border-festival-gold-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.6)]">
            <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-festival-gold-400 drop-shadow-[0_2px_10px_rgba(245,184,66,0.3)]">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[11px] font-bold tracking-widest text-festival-cream-300 mt-1 uppercase">
              {unit.label}
            </span>
          </div>

          {index < units.length - 1 && (
            <span className="text-xl sm:text-3xl font-serif font-bold text-festival-gold-500/60 pb-4">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
