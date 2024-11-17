import React, { useState, useEffect, useCallback } from "react";

interface CountdownTimerProps {
  isActive: boolean;
  createdAt: string; // ISO date string
  durationInDays: number;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

function CountDownTimer({
  isActive,
  createdAt,
  durationInDays,
}: CountdownTimerProps) {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const targetDate = new Date(
      new Date(createdAt).getTime() + durationInDays * 24 * 60 * 60 * 1000,
    );
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      hours: hours >= 0 ? hours : 0,
      minutes: minutes >= 0 ? minutes : 0,
      seconds: seconds >= 0 ? seconds : 0,
    };
  }, [createdAt, durationInDays]);

  const [time, setTime] = useState(calculateTimeLeft());

  useEffect(() => {
    const countdown = setInterval(() => {
      const newTime = calculateTimeLeft();

      setTime(newTime);

      if (
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [calculateTimeLeft]);

  if (!isActive)
    return (
      <div className="font-semibold uppercase text-gray-600">00:00:00</div>
    );

  return (
    <div className="font-semibold uppercase text-gray-600">
      {String(time.hours).padStart(2, "0")}:
      {String(time.minutes).padStart(2, "0")}:
      {String(time.seconds).padStart(2, "0")}
    </div>
  );
}

export default CountDownTimer;
