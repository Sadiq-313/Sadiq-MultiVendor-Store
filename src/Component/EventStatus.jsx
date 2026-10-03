import React, { useState, useEffect } from 'react';

const getTimeLeft = (endDate) => {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const EventStatus = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endDate));

  useEffect(() => {
    setTimeLeft(getTimeLeft(endDate));
    if (!getTimeLeft(endDate)) return;
    const timer = setInterval(() => setTimeLeft(getTimeLeft(endDate)), 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  if (!timeLeft) {
    return <p className="text-sm font-bold text-red-600 md:text-base">Event Ended</p>;
  }

  return (
    <p className="text-sm font-semibold text-[#1e40af] md:text-base">
      {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds
    </p>
  );
};

export default EventStatus;