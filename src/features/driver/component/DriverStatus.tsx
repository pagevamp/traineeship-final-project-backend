"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@iconify/react";
import Pagination from "@/components/pagination";
import TableComponent from "@/components/table";
import { DRIVER_USER_COLUMN, DriverUserData } from "../constant";

type StatusType = "Approved" | "Pending" | "Rejected";

const DriverStatus = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<StatusType>("Pending");

  const tabs: StatusType[] = ["Pending", "Rejected", "Approved"];

  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });

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
      onClick: (row: any) => router.push(`/driver/1`),
    },
  ];

  return (
    <div className="flex flex-col gap-[15px]">
      <div
      // className="bg-[#ffffff] w-full rounded-[25px] overflow-auto"
      >
        <TableComponent
          currentPage={state.pagination.page}
          columns={DRIVER_USER_COLUMN}
          data={DriverUserData}
          isLoading={false}
          actions={actions}
        />
      </div>
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
  );
};

export default DriverStatus;
