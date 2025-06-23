"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { Icon } from "@iconify/react/dist/iconify.js";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface SelectboxProps {
  options: ComboboxOption[];
  placeholder?: string;
  emptyText?: string;
  value: string;
  onChange: (value: ComboboxOption) => void;
  className?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  optional?: boolean;
}

export function Selectbox({
  options = [],
  placeholder = "Select an option...",
  emptyText = "No option found.",
  value,
  onChange,
  className,
  label,
  error,
  optional = false,
  disabled,
}: SelectboxProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === triggerRef.current) {
          setTriggerWidth((entry.target as HTMLElement).offsetWidth);
        }
      }
    });

    if (triggerRef.current) {
      resizeObserver.observe(triggerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {label && (
        <label className={cn("text-[14px] font-primary text-[#26203B]")}>
          {label}
          {!optional && <span className="text-red-600">*</span>}
        </label>
      )}
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "justify-between relative shadow-none hover:bg-transparent font-normal mt-1",
            className,
            error && "border-destructive !shadow-error"
          )}
        >
          <span className="truncate">
            {value ? (
              <span className="text-sm font-[300]">
                {options.find((option) => option.value === value)?.label}
              </span>
            ) : (
              <span className="text-muted-foreground text-xs font-[300]">
                {placeholder}
              </span>
            )}
          </span>

          <Icon
            icon="hugeicons:arrow-down-01"
            width="3"
            height="24"
            className="scale-[1.8]"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 z-[301]" style={{ width: triggerWidth }}>
        <Command className="max-h-[300px] border">
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
