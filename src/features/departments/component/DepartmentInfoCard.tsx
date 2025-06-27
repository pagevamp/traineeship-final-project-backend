"use client";

import React from "react";
import { useGetDepartmentById } from "../hooks";
import { PageLoader } from "@/components/loaders/page-loader";

type DepartmentInfoProps = {
  departmentId: string;
};

const DepartmentInfoCard = ({ departmentId }: DepartmentInfoProps) => {
  const { data, isLoading, isError, error, refetch } =
    useGetDepartmentById(departmentId);

  const department = data?.data?.data;

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !department) {
    return (
      <div className="text-center py-8 text-red-500 font-medium">
        Failed to load department.{" "}
        <button
          className="underline text-blue-500 ml-2"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[25px] shadow-md p-6 flex flex-col font-primary">
      <h2 className="text-[22px] text-[#1C2B38] font-semibold mb-6">
        Department Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-x-10 md:gap-x-16">
        <InfoRow label="Name" value={department.name} />
        <InfoRow label="Contact Person" value={department.contactPerson} />
        <InfoRow label="Email Address" value={department.contactEmail} />
        <InfoRow
          label="Phone Number"
          type="phone"
          value={department.contactPhone}
          countryCode={department.countryCode}
        />
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  type,
  countryCode,
}: {
  label: string;
  value: string | number;
  type?: string;
  countryCode?: string;
}) => (
  <div className="flex gap-3 flex-wrap items-center">
    <span className="text-[15px] sm:text-[16px] text-[#1C2B38] font-semibold min-w-[130px]">
      {label} :
    </span>
    <span className="text-sm text-[#232323] font-secondary font-[300] break-all">
      {type === "phone"
        ? value
          ? `${countryCode || "N/A"} - ${value}`
          : "N/A"
        : value || "N/A"}
    </span>
  </div>
);

export default DepartmentInfoCard;
