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
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 select-none">
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center justify-center bg-[#0a0103]/95 backdrop-blur-xl w-16 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-2xl border border-amber-500/40 shadow-2xl shadow-rose-950/40 gold-glow-card">
            <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-yellow-500 drop-shadow-[0_2px_12px_rgba(245,184,66,0.35)]">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[11px] font-bold tracking-widest text-amber-200/80 mt-1 uppercase">
              {unit.label}
            </span>
          </div>

          {index < units.length - 1 && (
            <span className="text-xl sm:text-3xl font-serif font-bold text-amber-500/60 pb-3">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default CountdownTimer;
