"use client";
import React, { useState } from "react";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Image from "next/image";
import DownloadIcon from "../../../public/images/download-icon.svg";
import TableComponent from "@/components/table";
import { USER_COLUMN, DashboardUserData } from "./constant";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import AnimatedCard from "@/components/animated-card";

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
    <AnimatedCard delay={500}>
      <div className="flex items-center flex-wrap gap-2 justify-between p-4 w-full">
        <p className="font-semibold font-primary text-lg">Users</p>
        <div className="flex items-center flex-wrap lg:justify-end gap-4 lg:w-[60%]">
          <SearchComponent
            state={state}
            setState={setState}
            placeholder="Search for user"
            className="sm:w-[60%]"
          />
          <div className="w-10">
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
          <div className="w-10">
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
          <Button
            label="Add Users"
            className="w-fit h-[38px] whitespace-nowrap px-4 text-sm"
          />
        </div>
      </div>

      <div className="pt-4">
        <TableComponent
          currentPage={state.pagination.page}
          columns={USER_COLUMN}
          data={DashboardUserData}
          isLoading={false}
          actions={actions}
        />
      </div>
    </AnimatedCard>
  );
};

export default Index;
