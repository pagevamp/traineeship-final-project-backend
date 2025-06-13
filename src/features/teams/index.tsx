"use client";
import React, { useState } from "react";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Image from "next/image";
import DownloadIcon from "../../../public/images/download-icon.svg";
import TableComponent from "@/components/table";
import { TEAM_COLUMN, TeamData } from "./constant";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pagination";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4">
          <SearchComponent
            state={state}
            setState={setState}
            placeholder="Search"
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
      </motion.div>

      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      >
        <div className="pt-3 sm:pt-4">
          <TableComponent
            currentPage={state.pagination.page}
            columns={TEAM_COLUMN}
            data={TeamData}
            isLoading={false}
            actions={actions}
          />
        </div>
        <div className="mt-4">
          <Pagination
            currentPage={state.pagination.page}
            totalPages={
              // count / state.pagination.recordsPerPage > 0
              //   ? Math.ceil(count / state.pagination.recordsPerPage)
              //   : Math.floor(count / state.pagination.recordsPerPage) + 1
              4
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
      </motion.div>
    </div>
  );
};

export default Index;
