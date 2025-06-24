"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import TableComponent from "@/components/table";
import { DEPARTMENT_COLUMN } from "../constant";

type DepartmentInfoProps = {
  departments: any[];
  isLoading: boolean;
};

const DepartmentInfo = ({ departments, isLoading }: DepartmentInfoProps) => {
  const router = useRouter();

  const actions = [
    {
      label: (
        <Icon
          icon="heroicons:eye-16-solid"
          width="20"
          height="20"
          color="#FF811A"
        />
      ),
      title: "View",
      

      onClick: (row: any) => router.push(`/departments/${row.id}`), // dynamic routing
    },
    {
      label: (
        <Icon
          icon="material-symbols:edit-outline-rounded"
          width="20"
          height="20"
          color="#FF811A"
        />
      ),
      title: "Edit",
      onClick: (row: any) => ({}),
 },
    {
      label: (
        <Icon
          icon="material-symbols:delete-outline-rounded"
          width="20"
          height="20"
          color="#FF811A"
        />
      ),
      title: "Delete",
      onClick: (row: any) => ({}),
 },
  ];

  return (
    <div className="flex flex-col gap-[15px]">
      <div>
        <TableComponent
          currentPage={1}
          columns={DEPARTMENT_COLUMN}
          data={departments}
          isLoading={isLoading}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default DepartmentInfo;
