"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StepProps {
  title: string;
  stepNumber?: number;
  isCompleted?: boolean;
  isActive?: boolean;
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ title, stepNumber, isCompleted, isActive }, ref) => {
    return (
      <div ref={ref} className="flex items-center h-8 min-w-[180px]">
        <div className="relative flex items-center justify-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              isCompleted || isActive
                ? "text-primary-foreground bg-gradient-to-r from-[#CF5406] to-[#F87B18]"
                : "border-[1px] border-[#DFDFDF]"
            )}
          >
            {isCompleted ? (
              <span className="text-sm font-medium">{stepNumber}</span>
            ) : (
              <span className="text-sm font-medium text-[#DFDFDF]">
                {stepNumber}
              </span>
            )}
          </div>
        </div>
        <div className="ml-4">
          <p
            className={cn(
              "text-[16px]",
              isCompleted || isActive
                ? "font-normal inline-block bg-gradient-to-r from-[#CF5406] to-[#F87B18] bg-clip-text text-transparent"
                : "text-muted-foreground font-medium text-[#DFDFDF]"
            )}
          >
            {title}
          </p>
        </div>
      </div>
    );
  }
);

Step.displayName = "Step";

interface StepperProps {
  steps: Array<{ title: string; description?: string }>;
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const target = stepRefs.current[currentStep - 1];
    if (target && containerRef.current) {
      target.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentStep]);

  return (
    <div className="w-full mx-auto" ref={containerRef}>
      <div className="flex flex-row items-center gap-4 mb-8 w-max">
        {steps.map((step, index) => (
          <Step
            key={step.title}
            title={step.title}
            stepNumber={index + 1}
            isCompleted={index < currentStep}
            isActive={index + 1 === currentStep}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}
