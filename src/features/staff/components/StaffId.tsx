"use client";
import React from "react";
import StaffHeader from "./StaffHeader";
import StaffTable from "./StaffTable";
import { useForm } from "react-hook-form";

const StaffId = () => {
  const { control } = useForm({});
  return (
    <div className="flex flex-col gap-y-2">
      <StaffHeader />
      <StaffTable control={control} />
    </div>
  );
};

export default StaffId;
