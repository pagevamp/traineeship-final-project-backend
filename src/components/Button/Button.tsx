import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/lib/utils";

const Button = ({ label, className }: { label: string; className: any }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 justify-center gradient-border hover:bg-primary-light hover:text-primary text-primary bg-white rounded-[37px] font-medium cursor-pointer",
        className
      )}
    >
      <p className="gradient-text">{label}</p>{" "}
      <Icon icon="mdi:plus-circle-outline" width="22" height="22" />
    </div>
  );
};

export default Button;
