"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import TableComponent from "@/components/table";
import { DEPARTMENT_COLUMN } from "../constant";
import { useDeleteDepartment } from "../hooks";
import { useModalContext } from "@/providers/modal-context";
import Index from "../create";
import EditForm from "../create/form/editForm";
import DepartmentEditModal from "./DepartmentEditModal";

type DepartmentInfoProps = {
  departments: any[];
  isLoading: boolean;
};

const DepartmentInfo = ({ departments, isLoading }: DepartmentInfoProps) => {
  const { openModal } = useModalContext();
  const router = useRouter();
  const { mutate: deleteDepartment } = useDeleteDepartment();

  const handleEditClick = (row: any) => {
    openModal({
      component: DepartmentEditModal,
      props: { id: row.id },
      className: "h-fit bg-white max-w-[98%] sm:max-w-[50%] rounded-[39px]",
    });
  };

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

      onClick: handleEditClick,
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

      onClick: (row: any) => {
        deleteDepartment(row.id);
      },
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
