import React from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

const PhoneInputField = (props: any) => {
  const {
    phoneLimit,
    optional,
    name,
    label,
    defaultValues,
    setValue,
    register,
    trigger,
    error,
    className,
    countryCode,
    disabled,
  } = props;
  return (
    <div>
      <label className="text-[14px] font-primary text-[#26203B] pb-1">
        {label}
        {!optional && <span className="text-red-600 pl-1">*</span>}
      </label>
      <div
        className={cn(
          "flex items-center gap-2 border h-12 mt-[1.2px] rounded-md border-muted-light font-[300] px-1 py-2 text-sm placeholder:text-xs",

          error && "border-destructive shadow-error font-secondary font-[300]",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <PhoneInput
          country="in"
          enableSearch={true}
          inputClass="countryCode"
          inputProps={{
            placeholder: "countryCode",
            name: "countryCode",
            style: {
              border: "0px",
              width: "90px",
            },
          }}
          onKeyDown={(e) => {
            // Allow only numeric values, backspace, delete, arrow keys, and tab
            if (
              /[0-9\b]/.test(e.key) ||
              e.key === "ArrowLeft" ||
              e.key === "ArrowRight" ||
              e.key === "ArrowUp" ||
              e.key === "ArrowDown" ||
              e.key === "Tab" ||
              e.key === "Delete" ||
              e.key === "Backspace"
            ) {
              e.preventDefault();
            }
          }}
          value={
            countryCode === "user.countryCode"
              ? defaultValues?.user?.countryCode
              : defaultValues?.countryCode
          }
          onChange={(value) => {
            setValue(countryCode ?? "countryCode", value);
          }}
          disabled={disabled}
        />
        <input
          type="tel"
          placeholder="(982) 2131-213"
          {...register(name)}
          onChange={(e) => {
            setValue(name, e.target.value);
            trigger(name);
          }}
          disabled={disabled}
          className={
            "flex h-12 w-full rounded-md bg-transparent font-[300] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:font-[300] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-xs"
          }
          // className="w-full font-secondary placeholder: font-[300] rounded-md border-input bg-transparent pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
          onKeyDown={(e) => {
            // Allow only numeric values, backspace, delete, arrow keys, and tab
            if (
              !(
                /^[0-9]$/.test(e.key) || // Ensure single numeric character
                [
                  "ArrowLeft",
                  "ArrowRight",
                  "ArrowUp",
                  "ArrowDown",
                  "Tab",
                  "Delete",
                  "Backspace",
                ].includes(e.key)
              )
            ) {
              e.preventDefault();
            }

            // Limit to `phoneLimit` digits but allow backspace/delete
            if (
              e.currentTarget.value.length >= phoneLimit &&
              !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(
                e.key
              )
            ) {
              e.preventDefault();
            }
          }}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        {error && (
          <p className="text-xs text-destructive flex items-center gap-1 mt-1">
            <Icon
              icon="solar:close-square-bold"
              width="14"
              height="14"
              className="text-destructive"
            />
            <span className="font-secondary font-[300]">{error}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default PhoneInputField;
