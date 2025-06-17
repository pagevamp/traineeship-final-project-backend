"use client";

import * as React from "react";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  optional?: boolean;
  error?: any;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePicker({
  selected,
  onSelect,
  placeholder = "MM-DD-YYYY",
  className,
  disabled = false,
  label,
  optional,
  error,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [viewDate, setViewDate] = React.useState(selected || new Date());

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();
  const today = new Date();

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Get previous month's last days
  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  const daysInPrevMonth = prevMonth.getDate();

  const handleDateClick = (day: number, isCurrentMonth = true) => {
    let selectedDate: Date;

    if (isCurrentMonth) {
      selectedDate = new Date(currentYear, currentMonth, day);
    } else {
      if (day > 15) {
        selectedDate = new Date(currentYear, currentMonth - 1, day);
      } else {
        selectedDate = new Date(currentYear, currentMonth + 1, day);
      }
    }

    onSelect?.(selectedDate);
    setOpen(false);
  };

  const isSelected = (day: number, isCurrentMonth = true) => {
    if (!selected || !isCurrentMonth) return false;
    return (
      day === selected.getDate() &&
      currentMonth === selected.getMonth() &&
      currentYear === selected.getFullYear()
    );
  };

  const isToday = (day: number, isCurrentMonth = true) => {
    if (!isCurrentMonth) return false;
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleMonthChange = (month: string) => {
    const monthIndex = MONTHS.indexOf(month);
    setViewDate((prev) => new Date(prev.getFullYear(), monthIndex, 1));
  };

  const handleYearChange = (year: string) => {
    setViewDate((prev) => new Date(Number.parseInt(year), prev.getMonth(), 1));
  };

  // Generate calendar days
  const calendarDays = [];

  // Previous month's trailing days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    calendarDays.push(
      <button
        key={`prev-${day}`}
        onClick={() => handleDateClick(day, false)}
        className="h-10 w-10 text-sm text-gray-400 hover:bg-gray-100 rounded-md transition-colors"
      >
        {day}
      </button>
    );
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={cn(
          "h-9 w-9 text-xs rounded-md transition-all duration-200",
          isSelected(day) && "bg-orange-500 text-white hover:bg-orange-600",
          !isSelected(day) &&
            isToday(day) &&
            "bg-blue-100 text-blue-600 hover:bg-blue-200",
          !isSelected(day) && !isToday(day) && "text-gray-900 hover:bg-gray-100"
        )}
      >
        {day}
      </button>
    );
  }

  // Next month's leading days
  const remainingCells = 42 - calendarDays.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push(
      <button
        key={`next-${day}`}
        onClick={() => handleDateClick(day, false)}
        className="h-10 w-10 text-sm text-gray-400 hover:bg-gray-100 rounded-md transition-colors"
      >
        {day}
      </button>
    );
  }

  // Generate year options (current year ± 50 years)
  const currentYearNum = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYearNum - 225; year <= currentYearNum + 50; year++) {
    yearOptions.push(year.toString());
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn("relative", className)}>
          {label && (
            <label
              className={cn(
                "px-1 text-sm mb-1 inline-block font-medium z-10 font-primary",
                error && "text-destructive"
              )}
            >
              {label}
              {!optional && <span className="text-red-600 ml-1">*</span>}
            </label>
          )}
          <Input
            value={selected ? formatDate(selected) : ""}
            placeholder={placeholder}
            readOnly
            disabled={disabled}
            className={cn(
              "w-full pr-12 cursor-pointer text-sm font-[300]",
              !selected && "text-muted-foreground"
            )}
            onClick={() => !disabled && setOpen(true)}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-[12px] h-full px-3 py-2 hover:bg-transparent"
            onClick={() => !disabled && setOpen(true)}
            disabled={disabled}
          >
            <CalendarIcon className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0"
        align="start"
        style={{
          // zIndex: 300,
          backgroundColor: "white",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          border: "1px solid #ececec",
          borderRadius: "20px",
        }}
      >
        <div className="p-4 space-y-4">
          {/* Header with month/year selectors */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("prev")}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-2">
              <Select
                value={MONTHS[currentMonth]}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="w-fit space-x-2 h-8 text-sm font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={currentYear.toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="w-fit space-x-2 h-8 text-sm font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth("next")}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 !space-y-0 !m-0">
            {DAYS.map((day) => (
              <div
                key={day}
                className="h-10 flex items-center justify-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-0 text-xs !space-y-0 !m-0">
            {calendarDays}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
