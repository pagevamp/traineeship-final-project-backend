"use client";

import { useEffect, useState } from "react";
import { useIntersectionObserver } from "./use-intersection-observer";

export function useCounterAnimation(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!hasIntersected) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, hasIntersected]);

  return { count, elementRef };
}
