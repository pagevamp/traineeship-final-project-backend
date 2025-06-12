import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import DownloadIcon from "../../../../../public/images/download-icon.svg";
import Button from "@/components/Button/Button";
import TableComponent from "@/components/table";
import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";
import { CONSUMER_COLUMN, ConsumerData } from "@/features/consumer/constant";

const CustomerTeamTable = () => {
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
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 12 }}
    >
      <div className="mt-4 bg-white rounded-3xl">
        <div className="flex items-center flex-wrap gap-2 justify-between p-4">
          <p className="font-semibold font-primary text-lg">Customer Team</p>
          <div className="flex items-center gap-4">
            <Button
              label="Add Sub Customer"
              className="w-fit h-[38px] px-4 text-sm whitespace-nowrap"
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
        </div>
        <TableComponent
          currentPage={state.pagination.page}
          columns={CONSUMER_COLUMN}
          data={ConsumerData}
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
    </motion.div>
  );
};

export default CustomerTeamTable;
