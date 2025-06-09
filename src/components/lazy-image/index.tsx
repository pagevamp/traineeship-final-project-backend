"use client";

import Image from "next/image";
import { useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export default function LazyImage({
  src,
  alt,
  className,
  sizes,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
  });

  return (
    <div ref={elementRef} className={`relative ${className}`}>
      {hasIntersected && (
        <>
          {/* Blur placeholder */}
          <div
            className={`absolute inset-0 bg-gray-200 transition-opacity duration-500 ${
              isLoaded ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 animate-pulse" />
          </div>

          {/* Actual image */}
          <Image
            src={hasError ? "/placeholder.svg" : src}
            alt={alt}
            width={500}
            height={400}
            className={`object-cover transition-all duration-700 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            sizes={sizes}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setHasError(true);
              setIsLoaded(true);
            }}
          />
        </>
      )}
    </div>
  );
}
