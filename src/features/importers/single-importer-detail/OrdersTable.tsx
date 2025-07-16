import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import DownloadIcon from "../../../../public/images/download-icon.svg";
import TableComponent from "@/components/table";
import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import { ORDER_COLUMN, SalesData } from "@/features/sales/constant";

const OrdersTable = () => {
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
          <p className="font-semibold font-primary text-lg">Orders</p>
          <div className="flex items-center gap-4">
            <SearchComponent
              state={state}
              setState={setState}
              placeholder="Search"
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
          columns={ORDER_COLUMN}
          data={SalesData}
          isLoading={false}
          actions={actions}
          className="border-none"
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

export default OrdersTable;
