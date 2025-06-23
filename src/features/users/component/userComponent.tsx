"use client";

import React, { useEffect, useMemo, useState } from "react";
import InfoBox from "./InfoBox";
import InternalUserTable from "./InternalUserTable";
import { motion } from "framer-motion";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useGetAllInternalUsers } from "../hooks";
import { TableLoader } from "../loading/TableLoader";

const UserComponent = () => {
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

  // fetching user data
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAllInternalUsers({
      pagination: state.pagination,
      filters: state.filter,
      search: state.search,
    });

  // memoizing user data
  const UsersData: any[] = useMemo(
    () => (isError ? [] : data?.data?.data?.items),
    [data, isError]
  );
  // memoizing user count

  useEffect(() => {
    const total = data?.data?.data?.total;
    if (!isNaN(total) && total !== undefined) {
      setCount(Number(total));
    }
  }, [data?.data?.data?.total]);

  const userTableProps = {
    data: UsersData,
    count,
    pagination: state.pagination,
    setState,
    isLoading,
  };
  return (
    <div>
      <div className="mb-3 sm:mb-4">
        <InfoBox />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        <div className="w-full flex flex-row items-center gap-4 mb-4">
          <SearchComponent
            state={state}
            setState={setState}
            placeholder="Search for user"
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
            <Link href="/users/create">
              <Button
                label="Create"
                className="w-fit font-secondary font-[400] h-[38px] px-4 text-sm whitespace-nowrap"
              />
            </Link>
          </div>
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
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <InternalUserTable {...userTableProps} />
        </motion.div>
      )}
    </div>
  );
};

export default UserComponent;
