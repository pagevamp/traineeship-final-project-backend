"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Icon } from "@iconify/react/dist/iconify.js";

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
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="flex flex-col gap-1">
        {labelName && (
          <label
            htmlFor={inputId}
            className="text-[14px] font-primary text-[#26203B]"
          >
            {labelName}{" "}
            {props.required && <span className="text-red-600">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "flex h-12 w-full rounded-md border border-muted-light bg-transparent font-[300] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:font-[300] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-xs",
              error &&
                "border-destructive shadow-error font-primary placeholder:font-primary",
              isPassword && "pr-10",
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
          {isPassword && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? (
                <Icon icon="mdi-light:eye-off" width="20" height="20" />
              ) : (
                <Icon icon="mdi-light:eye" width="20" height="20" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
