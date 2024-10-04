import React from "react";

interface CountdownCircleProps {
  countdown: number; // Countdown value in seconds
  totalDuration: number; // Total duration for the countdown in seconds
  size?: number; // Size of the circle
  strokeWidth?: number; // Width of the stroke
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({
  countdown,
  totalDuration,
  size = 10,
  strokeWidth = 2,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (countdown / totalDuration) * circumference;

  return (
    <div>
      <svg width="20" height="20" viewBox="0 0 10 10">
        <circle
          className="fill-transparent stroke-gray-500"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="fill-transparent stroke-white"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray="25.132741228718345"
          strokeDashoffset={offset}
          transform="rotate(-90 5 5)"
        />
      </svg>
    </div>
  );
};

export default CountdownCircle;
