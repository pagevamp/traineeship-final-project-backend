"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected?: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  searchPlaceholder?: string;
  label?: string;
  optional?: boolean;
  error?: string;
}

export function MultiSelect({
  options = [],
  selected = [],
  onChange,
  placeholder = "Select items...",
  className,
  searchPlaceholder = "Search...",
  label,
  optional = false,
  error,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  // Ensure selected is always an array
  const selectedArray = Array.isArray(selected) ? selected : [];

  const handleSelect = (item: string) => {
    if (selectedArray.includes(item)) {
      onChange(selectedArray.filter((i) => i !== item));
    } else {
      onChange([...selectedArray, item]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {label && (
        <label
          className={cn(
            "text-[14px] font-primary text-[#26203B]",
            error && "text-destructive"
          )}
        >
          {label}
          {!optional && <span className="text-red-600">*</span>}
        </label>
      )}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal min-h-10",
            className,
            error && "border-destructive !shadow-error"
          )}
          onClick={() => setOpen(!open)}
        >
          <div className="flex gap-1 flex-wrap">
            <span className="text-xs text-muted-foreground font-[300] font-secondary">
              {placeholder}
            </span>
          </div>
          <Icon
            icon="hugeicons:arrow-down-01"
            width="3"
            height="24"
            className="scale-[1.6]"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0"
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command className="max-h-[300px] border">
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList className="max-h-60">
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedArray.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={isSelected}
                      className="pointer-events-none"
                    />
                    <span className="flex-1">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
