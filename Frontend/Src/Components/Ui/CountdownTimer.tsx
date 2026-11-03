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
    {
      label: "DAYS",
      value: timeLeft.days,
      cardStyle: "bg-gradient-to-b from-[#3a2004]/95 via-[#241302]/98 to-[#100701] border-2 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.35)]",
      textStyle: "from-amber-100 via-amber-300 to-yellow-400 drop-shadow-[0_2px_14px_rgba(245,158,11,0.5)]",
      labelStyle: "text-amber-200",
    },
    {
      label: "HOURS",
      value: timeLeft.hours,
      cardStyle: "bg-gradient-to-b from-[#3d1204]/95 via-[#240a02]/98 to-[#120401] border-2 border-orange-500/80 shadow-[0_0_25px_rgba(249,115,22,0.35)]",
      textStyle: "from-orange-100 via-orange-300 to-amber-500 drop-shadow-[0_2px_14px_rgba(249,115,22,0.5)]",
      labelStyle: "text-orange-200",
    },
    {
      label: "MINS",
      value: timeLeft.minutes,
      cardStyle: "bg-gradient-to-b from-[#3d0526]/95 via-[#240316]/98 to-[#12010a] border-2 border-pink-500/80 shadow-[0_0_25px_rgba(236,72,153,0.35)]",
      textStyle: "from-pink-100 via-pink-300 to-rose-400 drop-shadow-[0_2px_14px_rgba(236,72,153,0.5)]",
      labelStyle: "text-pink-200",
    },
    {
      label: "SECS",
      value: timeLeft.seconds,
      cardStyle: "bg-gradient-to-b from-[#062c3e]/95 via-[#031b26]/98 to-[#010d13] border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.35)]",
      textStyle: "from-cyan-100 via-cyan-300 to-sky-400 drop-shadow-[0_2px_14px_rgba(6,182,212,0.5)]",
      labelStyle: "text-cyan-200",
    },
  ];

  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 select-none">
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className={`flex flex-col items-center justify-center backdrop-blur-xl w-16 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-2xl transform hover:scale-105 transition-transform duration-300 ${unit.cardStyle}`}>
            <span className={`text-2xl sm:text-4xl md:text-5xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b ${unit.textStyle}`}>
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className={`text-[9px] sm:text-[11px] font-black tracking-widest mt-1 uppercase ${unit.labelStyle}`}>
              {unit.label}
            </span>
          </div>

          {index < units.length - 1 && (
            <span className="text-xl sm:text-3xl font-serif font-black text-amber-400/80 pb-3 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default CountdownTimer;
