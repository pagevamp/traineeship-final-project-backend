"use client";
import React, { useState } from "react";
import TableComponent from "@/components/table";
import { INVENTORY_COLUMN, InventoryData } from "./constant";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Image from "next/image";
import DownloadIcon from "../../../public/images/download-icon.svg";

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
  ];

  return (
    <div>
      <div className="bg-white rounded-3xl">
        <div className="flex items-center flex-wrap gap-2 justify-between p-4">
          <p className="font-semibold font-primary text-lg">Orders</p>
          <div className="flex items-center gap-4">
            <SearchComponent
              state={state}
              setState={setState}
              placeholder="Search for orders"
              className="w-[100%]"
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
        </div>
        <TableComponent
          currentPage={state.pagination.page}
          columns={INVENTORY_COLUMN}
          data={InventoryData}
          isLoading={false}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default Index;
