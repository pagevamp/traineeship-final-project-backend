"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
  trigger?: any;
  label?: string;
  labelName?: string | React.ReactNode;
  error?: string;
  name?: string;
  optional?: boolean;
  isIdeaTitle?: boolean;
  defaultValue?: any;
  autofocus?: any;
  numberType?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, register, labelName, name, ...props }, ref) => {
    const inputId = name || "input-" + Math.random().toString(36).substr(2, 9);

    return (
      <div className="flex flex-col gap-1">
        {labelName && (
          <label
            htmlFor={inputId}
            className="text-[14px] font-primary text-[#26203B]"
          >
            {labelName}{" "}
            {props.required && (
              <sup className="font-[16px] text-[#E45270]"> *</sup>
            )}
          </label>
        )}
        <input
          id={inputId}
          type={"text"}
          className={cn(
            "flex h-12 w-full rounded-md border border-muted-light bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:font-[300] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            error &&
              "border-destructive shadow-error font-primary placeholder:font-primary",
            className
          )}
          autoComplete="new-password"
          inputMode={`${props?.numberType ? "numeric" : ""}`}
          onKeyDown={(e) => {
            if (
              props?.numberType &&
              !(
                e.key === "Backspace" ||
                (/[0-9]/.test(e.key) && e.key !== "." && e.key !== "Decimal")
              )
            ) {
              e.preventDefault();
            }
          }}
          ref={ref}
          {...props}
          {...(register ? register(name) : {})}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
