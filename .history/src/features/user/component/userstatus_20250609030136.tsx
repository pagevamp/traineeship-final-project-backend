"use client";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import TableComponent from "@/components/table";
import { tabs, USER_COLUMN, UserData } from "../../../features/user/constant";
import { Icon } from "@iconify/react/dist/iconify.js";

const UserStatus = () => {
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "Pending" | "Rejected" | "Approved"
  >("Pending");

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
      onClick: (row: any) => router.push(`/sales/${row.id}`),
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="flex items-end justify-between w-full ">
        <div className="flex flex-col">
          <div className="flex gap-[40px] w-fit border-b border-[#E5D5EF]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-[16px] font-medium text-[#540F86] pb-2 transition-all duration-300 ${
                  activeTab === tab
                    ? "border-b-2 border-[#540F86]"
                    : "border-b-2 border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 md:mt-0 w-full md:w-[104px] h-[28px] bg-white flex items-center justify-center gap-[6px] rounded-[10px]">
          <span className="text-[#540F86] text-[14px] font-medium whitespace-nowrap">
            See all
          </span>
          <ChevronDown size={18} color="#000000" />
        </div>
      </div>

      <div className="bg-[#ffffff] w-full pl-[30px] pr-[57px] pt-[25px] rounded-[25px]">
        <TableComponent
          currentPage={state.pagination.page}
          columns={USER_COLUMN}
          data={UserData}
          isLoading={false}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default UserStatus;
