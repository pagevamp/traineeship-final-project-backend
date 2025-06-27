"use client";

import React, { useEffect, useMemo, useState } from "react";
import DepartmentInfo from "./DepartmentInfo";
import { PlusCircleIcon } from "lucide-react";
import { useModalContext } from "@/providers/modal-context";
import { motion } from "framer-motion";
import Pagination from "@/components/pagination";
import { useGetAllDepartments } from "../hooks";
import Index from "../create";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TableLoader } from "@/features/users/loading/TableLoader";
import { usePermissions } from "@/hooks/usePermissions";

const DepartmentComponent = () => {
  const { openModal } = useModalContext();
  const { isView, isCreate, isUpdate, isDelete } = usePermissions();
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    count: 0,
    search: "",
    filter: {
      sortParams: {
        sortParam: "createdAt",
        sortOrder: "DESC",
      },
    },
  });
  const [count, setCount] = useState<number>(0);

  const handleCreateClick = () => {
    openModal({
      component: Index,
      className:
        "lg:h-fit bg-white max-w-[90%] lg:max-w-max rounded-[39px] h-[310px] sm:h-[360px]",
    });
  };

  const { data, isLoading, isError } = useGetAllDepartments({
    pagination: state.pagination,
    search: state.search,
    filters: state.filter,
  });

  const DepartmentData: any[] = useMemo(
    () => (isError ? [] : data?.data?.data?.items || []),
    [data, isError]
  );

  // memoizing count
  useEffect(() => {
    const total = data?.data?.data?.total;
    if (!isNaN(total) && total !== undefined) {
      setCount(Number(total));
    }
  }, [data?.data?.data?.total]);

  return (
    <>
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
        >
          <div className="w-full flex flex-row items-center gap-[10px] mb-4">
            <SearchComponent
              state={state}
              setState={setState}
              placeholder="Search for department"
              className="w-[80%]"
            />
            <div>
              <div
                className={`bg-white hover:bg-primary-light gradient-border w-10 h-10 m-auto flex items-center justify-center rounded-full  cursor-pointer`}
              >
                <Icon
                  icon="ion:filter-outline"
                  width="22"
                  height="22"
                  className="text-primary"
                />
              </div>
            </div>
            {isCreate && (
              <div className="bg-gradient-to-r from-[#E06518] to-[#E3802A] p-[1px] rounded-[37px] w-fit h-fit">
                <button
                  onClick={handleCreateClick}
                  className="flex font-secondary font-[400] items-center justify-center gap-2 text-[#E06518] w-[122px] h-[45px] bg-white hover:bg-primary-light rounded-[37px] text-sm"
                >
                  Create <PlusCircleIcon size={24} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

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
          <DepartmentInfo
            departments={DepartmentData}
            isLoading={isLoading}
            isEdit
            currentPage={state.pagination}
          />
        </motion.div>
      )}

      <div className="mt-4">
        <Pagination
          currentPage={state.pagination.page}
          totalPages={
            count / state?.pagination.recordsPerPage > 0
              ? Math.ceil(count / state?.pagination.recordsPerPage)
              : Math.floor(count / state?.pagination.recordsPerPage) + 1
          }
          onPageChange={(page: number) => {
            setState((prevState) => ({
              ...prevState,
              pagination: {
                ...prevState.pagination,
                page,
              },
            }));
          }}
        />
      </div>
    </>
  );
};

export default DepartmentComponent;
