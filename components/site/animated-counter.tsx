"use client";

import { useEffect, useState } from "react";

export function AnimatedCounter({
  value,
  suffix = ""
}: {
  value: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 900;
    const stepTime = Math.max(duration / value, 18);

    const timer = window.setInterval(() => {
      start += 1;
      setCount(start);

      if (start >= value) {
        window.clearInterval(timer);
      }
    }, stepTime);

    return () => window.clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
