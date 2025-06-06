"use client";

import { AnimatedLoader } from "./animated-loader";
import { cn } from "@/lib/utils";

interface PageLoaderProps {
  message?: string;
  variant?: "truck" | "bus" | "car" | "plane";
  className?: string;
}

export function PageLoader({
  message = "Loading...",
  variant = "truck",
  className,
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center min-h-[400px] rounded-full justify-center space-y-0",
        className
      )}
    >
      <AnimatedLoader variant={variant} size="sm" />
      <div className="text-center space-y-3">
        <h3 className="text-sm text-primary font-medium">{message}</h3>
        {/* <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
        </div> */}
      </div>
    </div>
  );
}
