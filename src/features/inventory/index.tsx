"use client";
import React, { useEffect, useMemo, useState } from "react";
import TableComponent from "@/components/table";
import { INVENTORY_COLUMN, INVENTORY_COUNTS } from "./constant";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Image from "next/image";
import DownloadIcon from "../../../public/images/download-icon.svg";
import Pagination from "@/components/pagination";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useGetAllInventoryList } from "./hooks";
import { useProfileInformation } from "../dashboard/hooks/useProfileInformation";

const Index = () => {
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

  const { data: inventoryList, isLoading: isInventoryListLoading } =
    useGetAllInventoryList({
      pagination: state.pagination,
      filters: state.filter,
      searchParam: state.search,
      createdById: profileInformationData?.data?.data?.user?.id,
    });

  // memoizing  count
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const total = inventoryList?.data?.data?.total;
    if (!isNaN(total) && total !== undefined) {
      setCount(Number(total));
    }
  }, [inventoryList?.data?.data?.total]);

  const InventoryData = useMemo(() => {
    return inventoryList?.data?.data?.items;
  }, [inventoryList]);

  const actions = [
    {
      label: (
        <div className="flex items-center gap-1 text-primary font-semibold">
          <Icon
            icon="heroicons:eye-16-solid"
            width="20"
            height="20"
            color="#FF811A"
          />
          <span>View</span>
        </div>
      ),
      onClick: (row: any) => router.push(`/inventory/${row?.id}`),
    },
    {
      label: (
        <div className="flex items-center gap-1 text-primary font-semibold">
          <Icon
            icon="material-symbols:edit"
            width="20"
            height="20"
            color="#FF811A"
          />
          <span>Edit</span>
        </div>
      ),
      onClick: (row: any) => router.push(`/inventory/add-inventory/${row?.id}`),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid sm:grid-cols-2 gap-4 w-full">
        {INVENTORY_COUNTS?.map((inventory, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.2,
              delay: 0.1 + idx * 0.1,
              ease: "easeOut",
            }}
          >
            <Card
              className={cn(
                "w-full border-none shadow-none",
                idx === 0 && "bg-gradient-to-b from-[#e06518] to-[#e3802a]"
              )}
            >
              <CardHeader>
                <div
                  className={cn(
                    "w-8 flex items-center bg-gray-300/60 justify-center p-2 h-8 rounded-md",
                    idx === 0 && "bg-white/60"
                  )}
                >
                  <Icon icon={inventory?.icon} width="20" height="20" />
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                {inventory?.counts?.map((count, id) => (
                  <div
                    className={cn("space-y-1", idx === 0 && "text-white")}
                    key={id}
                  >
                    <p className="font-secondary text-sm">{count?.label}</p>
                    <p className="font-primary">{count?.count}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      >
        <div className="mt-4 bg-white rounded-3xl">
          <div className="flex items-center flex-wrap gap-2 justify-between p-4">
            <p className="font-semibold font-primary text-lg">Inventory</p>
            <div className="flex items-center gap-4">
              <SearchComponent
                state={state}
                setState={setState}
                placeholder="Search for inventory"
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
              <Link href="/inventory/add-inventory">
                <Button
                  label="Add Inventory"
                  className="w-fit font-secondary font-[400] h-[38px] px-4 text-sm whitespace-nowrap"
                />
              </Link>
            </div>
          </div>
          <TableComponent
            currentPage={state.pagination.page}
            columns={INVENTORY_COLUMN}
            data={InventoryData}
            isLoading={false}
            actions={actions}
            className={"border-none"}
          />
        </div>
        <div className="mt-4">
          <Pagination
            currentPage={state.pagination.page}
            totalPages={
              count / state.pagination.recordsPerPage > 0
                ? Math.ceil(count / state.pagination.recordsPerPage)
                : Math.floor(count / state.pagination.recordsPerPage) + 1
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
