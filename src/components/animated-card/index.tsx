"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedCard({
  children,
  className = "",
  delay = 0,
}: AnimatedCardProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out h-full ${
        hasIntersected
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Card
        className={`hover:shadow-lg transition-shadow h-full duration-300 ${className}`}
      >
        {children}
      </Card>
    </div>
  );
}
