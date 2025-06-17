"use client";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Option {
  label: string;
  value: string;
}

interface SelectedBadgesProps {
  selected: string[];
  options: Option[];
  onRemove: (value: string) => void;
  className?: string;
}

export function SelectedBadges({
  selected,
  options,
  onRemove,
  className,
}: SelectedBadgesProps) {
  if (selected.length === 0) return null;

  return (
    <div className={`flex gap-1 flex-wrap mt-2 ${className || ""}`}>
      {selected.map((item) => {
        const option = options.find((opt) => opt.value === item);
        return (
          <Badge
            variant="outline"
            key={item}
            className="mr-1 mb-1 font-secondary font-[400] cursor-pointer hover:bg-secondary/80"
            onClick={() => onRemove(item)}
          >
            {option?.label || item}
            <button
              className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onRemove(item);
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove(item);
              }}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        );
      })}
    </div>
  );
}
