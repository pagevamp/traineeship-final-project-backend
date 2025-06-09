"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
  trigger?: any;
  label?: string;
  error?: string;
  name?: string;
  optional?: boolean;
  isIdeaTitle?: boolean;
  defaultValue?: any;
  autofocus?: any;
  numberType?: any;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, register, ...props }, ref) => {
    return (
      <input
        type={"text"}
        className={cn(
          "flex h-12 w-full rounded-md border border-muted-light bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
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
    );
  }
);
Input.displayName = "Input";

export { Input };
