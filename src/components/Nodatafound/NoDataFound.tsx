"use client";

import type React from "react";
import { Truck } from "lucide-react";

interface NoDataFoundProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export function NoDataFound({
  icon,
  title = "No Data Found",
  description = "There's nothing here yet. Get started by adding some data.",
}: NoDataFoundProps) {
  const defaultIcon = (
    <div className="relative w-64 h-40 mb-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
            <Truck className="w-8 h-8 text-gray-500 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="w-24 h-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded mx-auto" />
            <div className="w-16 h-2 bg-gray-500/10 rounded mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center flex-col min-h-[400px]">
      {icon || defaultIcon}

      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
