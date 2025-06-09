"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reset scroll progress when path or search params change
  useEffect(() => {
    setScrollProgress(0);
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]); // Re-initialize when path changes

  // Handle visibility change (tab switching)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Reset progress when tab becomes visible again
        setScrollProgress(0);

        // Calculate actual current progress after a small delay
        setTimeout(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress =
            totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setScrollProgress(progress);
        }, 100);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-[#e06518] to-[#e3802a] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
