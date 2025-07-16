"use client";
import React, { useEffect, useMemo, useState } from "react";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Image from "next/image";
import DownloadIcon from "../../../public/images/download-icon.svg";
import TableComponent from "@/components/table";
import { IMPORTER_COLUMN } from "./constant";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import Pagination from "@/components/pagination";
import { useGetAllImporters } from "./hooks";
import { TableLoader } from "../users/loading/TableLoader";

const Index = () => {
  const router = useRouter();
  // managing states
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    count: 0,
    search: "",
    filter: {
      sortParams: {
        sortParam: "createdAt",
        sortOrder: "DESC",
      },
    },
  });
  const [count, setCount] = useState<number>(0);

  // fetching importer data
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAllImporters({
      pagination: state.pagination,
      filters: state.filter,
      search: state.search,
    });

  // memoizing importer data
  const ImporterData: any[] = useMemo(
    () => (isError ? [] : data?.data?.data?.items),
    [data, isError]
  );
  // memoizing importer count

  useEffect(() => {
    const total = data?.data?.data?.total;
    if (!isNaN(total) && total !== undefined) {
      setCount(Number(total));
    }
  }, [data?.data?.data?.total]);

  const importerTableProps = {
    data: ImporterData,
    count,
    pagination: state.pagination,
    setState,
    isLoading,
  };

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
      title: "View",
      onClick: (row: any) => router.push(`/importers/${row?.id}`),
    },
    {
      label: (
        <Icon
          icon="material-symbols:edit-outline-rounded"
          width="20"
          height="20"
          color="#FF811A"
        />
      ),
      title: "Edit",
      onClick: (row: any) => router.push(`/importers/add-importer?id=${row?.id}`),
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <SearchComponent
            state={state}
            setState={setState}
            placeholder="Search for importer"
            className="md:w-[60%] xl:w-[70%]"
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
          <Link href="/importers/add-importer">
            <Button
              label="Add Importer"
              className="w-fit h-[38px] font-secondary font-[400] px-4 text-sm"
            />
          </Link>
        </div>
      </motion.div>

      {isLoading ? (
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <TableLoader />
        </motion.div>
      ) : (
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
        >
          <div className="pt-4">
            <TableComponent
              currentPage={state.pagination.page}
              columns={IMPORTER_COLUMN}
              data={ImporterData}
              isLoading={isLoading}
              actions={actions}
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
                setState((prevState: any) => ({
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
      )}
    </div>
  );
};

export default Index;
