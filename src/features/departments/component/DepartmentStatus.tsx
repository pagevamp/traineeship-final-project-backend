"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { DepartmentTab, USER_COLUMN, DESIGNATION_COLUMN } from "../constant";

import TableComponent from "@/components/table";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import Pagination from "@/components/pagination";
import { UserDetail } from "@/features/users/types";
import { useDeleteDesignation } from "./designation/hooks";
import { useModalContext } from "@/providers/modal-context";
import Index from "../component/designation/create";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";
import { usePermissions } from "@/hooks/usePermissions";

type PaginationType = {
  page: number;
  recordsPerPage: number;
};

type SortParams = {
  sortParam: string;
  sortOrder: "ASC" | "DESC";
};

type Props = {
  departments: any[];
  users: UserDetail[];
  designations: any[];
  usersTotalPages: number;
  designationsTotalPages: number;
  activeTab: DepartmentTab;
  setActiveTab: (tab: DepartmentTab) => void;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  pagination: PaginationType;
  setPagination: (pagination: PaginationType) => void;
  // search: string;
  setSearch: (search: string) => void;
  sortParams: SortParams;
  setSortParams: (sortParams: SortParams) => void;
  isEdit: boolean;
};

const DepartmentStatus: React.FC<Props> = ({
  users,
  designations,
  usersTotalPages,
  designationsTotalPages,
  activeTab,
  setActiveTab,
  isLoading,
  pagination,
  setPagination,
}) => {
  const tabs: DepartmentTab[] = ["Users", "Designation"];
  const { showConfirmation } = useConfirmationDialog();

  const { openModal } = useModalContext();
  const router = useRouter();
  const { closeModal } = useModalContext();
  const { mutate: deleteDesignation } = useDeleteDesignation({});
  const { isView, isCreate, isUpdate, isDelete } = usePermissions();
  const handleEditClick = (row: any) => {
    closeModal();
    openModal({
      component: Index,
      props: { data: row },
      className:
        "lg:h-fit bg-white max-w-[90%] lg:max-w-[40%] rounded-[39px] h-[240px]",
    });
  };

  const handleDeleteClick = (row: any) => {
    showConfirmation({
      title: "Delete Designation?",
      description: "Are you sure you want to delete this designation?",
      confirmText: "Yes, Delete",
      confirmClassName:
        "font-secondary bg-gradient-to-r from-[#E06518] to-[#E3802A] hover:from-[#E06518] hover:to-[#E06518] transition-all duration-300",
      cancelText: "Cancel",
      onConfirm: () => deleteDesignation(row.id),
    });
  };

  const userActions = [
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
      onClick: (row: any) => router.push(`/users/${row.id}`),
    },
  ];

  const designationActions = [
    isUpdate && {
      label: (
        <Icon
          icon="heroicons:pencil-solid"
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
          icon="heroicons:trash-solid"
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
      <div className="flex items-end justify-end md:justify-between w-full flex-wrap md:flex-nowrap">
        <div className="flex flex-col w-full md:w-auto">
          <motion.div
            className="flex gap-[81px] w-full md:w-fit border-b-[1px] border-[#E5D5EF] overflow-x-auto no-scrollbar"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative whitespace-nowrap text-[14px] md:text-[16px] font-medium text-[#540F86] pb-3 transition-all duration-300 overflow-visible",
                  activeTab === tab && "font-semibold"
                )}
              >
                <span className="relative z-10 font-secondary font-[400]">
                  {tab}
                </span>
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[3px] bg-[#540F86] rounded-t-[10px] transition-all duration-300 z-0" />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        className={cn(
          "w-full rounded-[25px] overflow-auto",
          activeTab === "Designation" && "max-w-fit"
        )}
      >
        <div key={activeTab} className="min-w-[600px]">
          {activeTab === "Users" ? (
            <>
              <TableComponent
                currentPage={pagination.page}
                columns={USER_COLUMN}
                data={users}
                isLoading={isLoading}
                actions={userActions}
              />
              <div className="mt-4">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={usersTotalPages}
                  onPageChange={(page) =>
                    setPagination({
                      ...pagination,
                      page,
                    })
                  }
                />
              </div>
            </>
          ) : (
            <>
              {isUpdate || isDelete ? (
                <TableComponent
                  currentPage={pagination.page}
                  columns={DESIGNATION_COLUMN}
                  data={designations}
                  isLoading={isLoading}
                  actions={designationActions}
                />
              ) : (
                <TableComponent
                  currentPage={pagination.page}
                  columns={DESIGNATION_COLUMN}
                  data={designations}
                  isLoading={isLoading}
                />
              )}
              <div className="mt-4">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={designationsTotalPages}
                  onPageChange={(page) =>
                    setPagination({
                      ...pagination,
                      page,
                    })
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentStatus;
