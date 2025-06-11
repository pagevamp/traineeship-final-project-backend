"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@iconify/react";
import TableComponent from "@/components/table";
import { USER_COLUMN, department } from "../constant";

const DepartmentInfo = () => {
  const router = useRouter();
  const actions = [
    {
      label: (
        <Icon
          icon="heroicons:eye-16-solid"
          width="22"
          height="22"
          color="#FF811A"
        />
      ),
      onClick: (row: any) => router.push(`/department/1`),
    },
  ];
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });
  return (
    <div className="flex flex-col gap-[15px]">
      <div className="bg-[#ffffff] w-full rounded-[25px] overflow-x-auto">
        <TableComponent
          currentPage={state.pagination.page}
          columns={USER_COLUMN}
          data={department}
          isLoading={false}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default DepartmentInfo;
