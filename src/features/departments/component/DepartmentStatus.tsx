"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  department,
  DepartmentTab,
  statusColors,
  USER_COLUMN,
} from "../constant";
import TableComponent from "@/components/table";
import { Icon } from "@iconify/react";
import {
  info,
  DEPARTMENT_COLUMN,
  DESIGNATION_COLUMN,
  designationInfo,
} from "../constant";
import { cn } from "@/lib/utils";
import Pagination from "@/components/pagination";

const DepartmentStatus = ({ activeTab, setActiveTab }: any) => {
  const router = useRouter();

  const tabs: DepartmentTab[] = ["Users", "Designation"];

  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });

  const userActions = [
    {
      label: (
        <Icon
          icon="heroicons:eye-16-solid"
          width="22"
          height="22"
          color="#FF811A"
        />
      ),
      onClick: (row: any) => router.push(`/users/1`),
    },
  ];

  const designationActions = [
    {
      label: (
        <Icon
          icon="heroicons:pencil-solid"
          width="22"
          height="22"
          color="#4CAF50"
        />
      ),
    },
    {
      label: (
        <Icon
          icon="heroicons:trash-solid"
          width="22"
          height="22"
          color="#F44336"
        />
      ),
    },
  ];

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
                className="relative whitespace-nowrap text-[14px] md:text-[16px] font-medium text-[#540F86] pb-3 transition-all duration-300 overflow-visible"
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
            <div>
              <TableComponent
                currentPage={state.pagination.page}
                columns={USER_COLUMN}
                data={info}
                isLoading={false}
                actions={userActions}
              />
              <div className="mt-4">
                <Pagination
                  currentPage={state.pagination.page}
                  totalPages={4}
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
            </div>
          ) : (
            <div>
              <TableComponent
                currentPage={state.pagination.page}
                columns={DESIGNATION_COLUMN}
                data={designationInfo}
                isLoading={false}
              />
              <div className="mt-4">
                <Pagination
                  currentPage={state.pagination.page}
                  totalPages={4}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentStatus;
