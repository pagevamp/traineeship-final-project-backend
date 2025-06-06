"use client"

import { cn } from "@/lib/utils"

interface AnimatedLoaderProps {
  size?: "sm" | "md" | "lg"
  variant?: "truck" | "bus" | "car" | "plane"
  className?: string
}

export function AnimatedLoader({ size = "md", variant = "truck", className }: AnimatedLoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const TruckIcon = () => (
    <div className={cn("relative", sizeClasses[size])}>
      <div className="absolute inset-0 animate-bounce">
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary">
          <path
            d="M1 3h15v13H1V3zM16 8h4l3 5v5h-3M16 8v10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/20 rounded animate-pulse" />
    </div>
  )

  const BusIcon = () => (
    <div className={cn("relative", sizeClasses[size])}>
      <div className="absolute inset-0 animate-pulse">
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary">
          <path
            d="M3 6h18v10H3V6zM3 6V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2M7 16v2M17 16v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="19" r="1" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="17" cy="19" r="1" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  )

  const CarIcon = () => (
    <div className={cn("relative", sizeClasses[size])}>
      <div className="absolute inset-0 animate-bounce">
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary">
          <path
            d="M5 17h14v-6l-2-5H7l-2 5v6zM5 17v2M19 17v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="19" r="1" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="17" cy="19" r="1" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </div>
  )

  const PlaneIcon = () => (
    <div className={cn("relative", sizeClasses[size])}>
      <div className="absolute inset-0 animate-pulse">
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-primary">
          <path
            d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 2-3.5 3.5L11 16l-8.2 1.8c-.5.1-.8.6-.8 1.1s.5 1.1 1.1 1.1L11 19l8.2-1.8z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </div>
  )

  const icons = {
    truck: TruckIcon,
    bus: BusIcon,
    car: CarIcon,
    plane: PlaneIcon,
  }

  const IconComponent = icons[variant]

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <IconComponent />
    </div>
  )
}
