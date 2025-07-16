"use client";
import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "@/components/table";
import { InventoryData, ORDER_COLUMN } from "../constant";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Image from "next/image";
import { motion } from "framer-motion";
import Pagination from "@/components/pagination";
import { useProfileInformation } from "@/features/dashboard/hooks/useProfileInformation";
import { useGetAllOrdersList } from "../hooks";

const OrderComponent = () => {
  const router = useRouter();

  // get profile information
  const {
    data: profileInformationData,
    isLoading: isLoadingProfileInformation,
  } = useProfileInformation();

  // managing states
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    filter: {
      sortParams: {
        sortParam: "createdAt",
        sortOrder: "DESC",
      },
    },
    search: "",
  });

  const { data: ordersList, isLoading: isOrdersListLoading } =
    useGetAllOrdersList({
      pagination: state.pagination,
      filters: state.filter,
      searchParam: state.search,
      customerId: profileInformationData?.data?.data?.id,
    });

  // memoizing  count
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const total = ordersList?.data?.data?.total;
    if (!isNaN(total) && total !== undefined) {
      setCount(Number(total));
    }
  }, [ordersList?.data?.data?.total]);

  const OrdersData = useMemo(() => {
    return ordersList?.data?.data?.items;
  }, [ordersList]);

  console.log(OrdersData, "OrdersData");

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
      onClick: (row: any) => router.push(`/orders/${row.id}`),
    },
    {
      label: (
        <Icon
          icon="material-symbols:edit-outline-rounded"
          width="22"
          height="22"
          color="#FF811A"
        />
      ),
      onClick: (row: any) => router.push(`/orders/${row.id}`),
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      >
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
                    src="/Download.svg"
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
            data={InventoryData}
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
    </div>
  );
};

export default OrderComponent;
