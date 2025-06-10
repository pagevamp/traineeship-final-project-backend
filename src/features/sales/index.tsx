"use client";
import React, { useState } from "react";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Image from "next/image";
import DownloadIcon from "../../../public/images/download-icon.svg";
import TableComponent from "@/components/table";
import { SALES_COLUMN, SalesData } from "./constant";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  // managing states
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
      onClick: (row: any) => router.push(`/sales/${row.id}`),
    },
    // {
    //   label: (
    //     <Icon
    //       icon="solar:trash-bin-minimalistic-2-bold"
    //       width="22"
    //       height="22"
    //       color="#FF5C0B"
    //     />
    //   ),
    //   onClick: (row: any) => {},
    // },
  ];

  return (
    <div>
      <div className="flex items-center gap-4">
        <SearchComponent
          state={state}
          setState={setState}
          placeholder="Search for user"
          className="w-[80%]"
        />
        <div>
          <div
            className={`bg-white hover:bg-primary-light gradient-border w-10 h-10 m-auto flex items-center justify-center rounded-full p-3 cursor-pointer`}
          >
            <Image
              src={DownloadIcon}
              alt="Download Icon"
              width={18}
              height={21}
            />
          </div>
        </div>
      </div>

      <div className="pt-3 sm:pt-4">
        <TableComponent
          currentPage={state.pagination.page}
          columns={SALES_COLUMN}
          data={SalesData}
          isLoading={false}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default Index;
