"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import { TableLoader } from "@/features/users/loading/TableLoader";
import ProductTable from "./ProductTable";
import { useGetAllMasterProduct } from "./hooks";

const ProductsList = ({ userId }: any) => {
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
    useGetAllMasterProduct({
      pagination: state.pagination,
      filters: state.filter,
      search: state.search,
      createdById: userId,
    });

  // memoizing product data
  const ProductData: any[] = useMemo(
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

  const productTableProps = {
    data: ProductData,
    count,
    pagination: state.pagination,
    setState,
    isLoading,
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        <div className="w-full flex flex-row items-center justify-end gap-4 mb-4">
          <SearchComponent
            state={state}
            setState={setState}
            placeholder="Search for product"
            className="w-[80%]"
          />
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
          <ProductTable {...productTableProps} />
        </motion.div>
      )}
    </div>
  );
};

export default ProductsList;
