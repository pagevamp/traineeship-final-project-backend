"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import DepartmentInfoCard from "./DepartmentInfoCard";
import DepartmentStatus from "./DepartmentStatus";
import { motion } from "framer-motion";
import { DepartmentTab } from "../constant";
import Button from "@/components/Button/Button";
import { useModalContext } from "@/providers/modal-context";
import DesignationForm from "./designation/create";
import { cn } from "@/lib/utils";
import {
  useGetAllDepartments,
  useGetAllUsers,
  useGetDepartmentById,
} from "../hooks";
import { useParams } from "next/navigation";
import DepartmentSearchComponent from "@/components/SearchComponent/DepartmentSearch";
import { TableLoader } from "@/features/users/loading/TableLoader";
import { usePermissions } from "@/hooks/usePermissions";

interface Pagination {
  page: number;
  recordsPerPage: number;
}

interface SortParams {
  sortParam: string;
  sortOrder: "ASC" | "DESC";
}

interface Designation {
  id: string;
  name: string;
}

const DepartmentId = () => {
  const { openModal } = useModalContext();
  const params = useParams();
  const departmentIdFromUrl = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id ?? "";

  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    userSearch: "",
    departmentSearch: "",
    filter: {
      sortParams: {
        sortParam: "createdAt",
        sortOrder: "DESC" as "DESC" | "ASC",
      },
    },
  });

  const { isView, isCreate, isUpdate, isDelete } = usePermissions();

  const [selectedDepartment, setSelectedDepartment] = useState<any | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<DepartmentTab>("Users");
  const [designations, setDesignations] = useState<Designation[]>([]);

  const {
    data: departmentsData,
    isError,
    isLoading: isDepartmentsLoading,
  } = useGetAllDepartments({
    pagination: state.pagination,
    search: state.departmentSearch,
    filters: state.filter,
  });

  const departmentsList: any[] = useMemo(
    () => (isError ? [] : departmentsData?.data?.data?.items || []),
    [departmentsData, isError]
  );

  useEffect(() => {
    if (departmentsList.length) {
      const dept = departmentsList.find((d) => d.id === departmentIdFromUrl);
      if (dept) {
        setSelectedDepartment(dept);
      } else {
        setSelectedDepartment(departmentsList[0]);
      }
    }
  }, [departmentIdFromUrl, departmentsList]);

  const { page, recordsPerPage } = state.pagination;
  const limit = recordsPerPage;
  const offset = (page - 1) * recordsPerPage;

  const shouldFetchUsers = !!selectedDepartment?.id;

  // useEffect(() => {
  //   console.log("Fetching users for department ID:", selectedDepartment?.id);
  // }, [selectedDepartment?.id]);

  const {
    data: usersData,
    isError: usersError,
    isLoading,
  } = useGetAllUsers(
    {
      limit,
      offset,
      search: state.userSearch,
      sortBy: state.filter.sortParams.sortParam,
      order: state.filter.sortParams.sortOrder,
      departmentId: selectedDepartment?.id,
    },
    {
      enabled: !!selectedDepartment?.id,
    }
  );
  const usersList: any[] = useMemo(
    () => (usersError ? [] : usersData?.data?.data?.items || []),
    [usersData, usersError]
  );

  const {
    data: designationsData,
    isLoading: isDesignationsLoading,
    isError: isDesignationsError,
    refetch,
  } = useGetDepartmentById(selectedDepartment?.id);

  useEffect(() => {
    if (!isDesignationsError && designationsData?.data?.data?.designations) {
      setDesignations(designationsData.data.data.designations);
    }
  }, [designationsData, isDesignationsError]);

  const handleAddDesignation: any = (newDesignation: Designation) => {
    setDesignations((prev) => {
      const exists = prev.some((item) => item.id === newDesignation.id);
      if (exists) return prev;
      return [newDesignation, ...prev];
    });
  };

  const openDesignationModal = () => {
    openModal({
      component: (modalProps: any) => (
        <DesignationForm
          {...modalProps}
          onAddDesignation={handleAddDesignation}
        />
      ),
      className:
        "lg:h-fit bg-white max-w-[90%] lg:max-w-[40%] rounded-[39px] h-[240px]",
    });
  };

  const usersTotal = usersData?.data?.data?.total || 0;
  const designationsTotal = designationsData?.data?.data?.total || 0;
  const recordsPerPageCount = recordsPerPage;

  const usersTotalPages = Math.ceil(usersTotal / recordsPerPageCount) || 1;
  const designationsTotalPages =
    Math.ceil(designationsTotal / recordsPerPageCount) || 1;
  return (
    <>
      <motion.div
        className="mb-4"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        {selectedDepartment && (
          <DepartmentInfoCard departmentId={selectedDepartment.id} />
        )}
      </motion.div>

      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        <DepartmentSearchComponent
          state={state}
          setState={setState}
          placeholder={
            activeTab === "Designation"
              ? "Search for designation"
              : "Search for user"
          }
          searchKey={
            activeTab === "Designation" ? "departmentsSearch" : "userSearch"
          }
          className={cn("w-[80%]", activeTab === "Designation" && "w-[35%]")}
        />

        <div>
          <div className="bg-white gradient-border w-10 h-10 m-auto flex items-center justify-center rounded-full p-2 cursor-pointer">
            <Image
              src="/Download.svg"
              alt="Download Icon"
              width={18}
              height={21}
            />
          </div>
        </div>

        {activeTab === "Designation" && departmentIdFromUrl && isCreate && (
          <div onClick={openDesignationModal}>
            <Button
              label="Create"
              className="w-fit font-secondary font-[400] h-[38px] px-4 text-sm whitespace-nowrap"
            />
          </div>
        )}
      </motion.div>

      {isLoading ? (
        <motion.div
          className="mt-4"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <TableLoader />
        </motion.div>
      ) : (
        <motion.div
          className="mt-4"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <DepartmentStatus
            departments={departmentsList}
            isEdit
            users={usersList}
            designations={designations}
            usersTotalPages={usersTotalPages}
            designationsTotalPages={designationsTotalPages}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isLoading={isDesignationsLoading}
            isError={isDesignationsError}
            refetch={refetch}
            pagination={state.pagination}
            setPagination={(pagination: Pagination) =>
              setState((prev) => ({ ...prev, pagination }))
            }
            // search={state.search}
            setSearch={(search: string) =>
              setState((prev) => ({ ...prev, search }))
            }
            sortParams={state.filter.sortParams}
            setSortParams={(sortParams: SortParams) =>
              setState((prev) => ({
                ...prev,
                filter: { ...prev.filter, sortParams },
              }))
            }
          />
        </motion.div>
      )}
    </>
  );
};

export default DepartmentId;
