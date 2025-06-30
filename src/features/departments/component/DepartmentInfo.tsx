"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import TableComponent from "@/components/table";
import { DEPARTMENT_COLUMN } from "../constant";
import { useDeleteDepartment } from "../hooks";
import { useModalContext } from "@/providers/modal-context";
import Index from "../create";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";
import { usePermissions } from "@/hooks/usePermissions";

type DepartmentInfoProps = {
  departments: any[];
  isLoading: boolean;
  isEdit: boolean;
  currentPage?: any;
};

const DepartmentInfo = ({
  departments,
  isLoading,
  currentPage,
}: DepartmentInfoProps) => {
  const { showConfirmation } = useConfirmationDialog();
  const { openModal } = useModalContext();
  const router = useRouter();
  const { mutate: deleteDepartment } = useDeleteDepartment({});

  const handleDeleteClick = (row: any) => {
    showConfirmation({
      title: "Delete Department?",
      description: "Are you sure you want to delete this department?",
      confirmText: "Yes, Delete",
      confirmClassName:
        "font-secondary bg-gradient-to-r from-[#E06518] to-[#E3802A] hover:from-[#E06518] hover:to-[#E06518] transition-all duration-300",
      cancelText: "Cancel",
      onConfirm: () => deleteDepartment(row.id),
    });
  };

  const { closeModal } = useModalContext();
  const handleEditClick = (row: any) => {
    closeModal();
    openModal({
      component: Index,
      props: { id: row.id, isEdit: true },
      className:
        "lg:h-fit bg-white max-w-[90%] lg:max-w-max rounded-[39px] h-[310px] sm:h-[360px]",
    });
  };
  const { isView, isCreate, isUpdate, isDelete } = usePermissions();

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
      onClick: (row: any) => router.push(`/departments/${row.id}`),
    },
    isUpdate && {
      label: (
        <Icon
          icon="material-symbols:edit-outline-rounded"
          width="20"
          height="20"
          color="#FF811A"
        />
      ),
      title: "Edit",
      onClick: (row: any) => handleEditClick(row),
    },

    isDelete && {
      label: (
        <Icon
          icon="material-symbols:delete-outline-rounded"
          width="20"
          height="20"
          color="#FF811A"
        />
      ),

      title: "Delete",

      onClick: (row: any) => handleDeleteClick(row),
    },
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-[15px]">
      <div>
        <TableComponent
          currentPage={currentPage.page}
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
