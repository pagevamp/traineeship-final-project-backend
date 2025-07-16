"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import LoadingCard from "./loading";
import { sampleProducts } from "./constant";
import ProductCard from "./product-card";
import { useProfileInformation } from "../dashboard/hooks/useProfileInformation";
import { useGetAllInventoryList } from "../inventory/hooks";
import { INVENTORY_STATUS } from "../inventory/constant";
import Pagination from "@/components/pagination";

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

  const {
    data: productList,
    isLoading: isProductListLoading,
    isError: isProductListError,
  } = useGetAllInventoryList({
    pagination: state.pagination,
    filters: state.filter,
    searchParam: state.search,
    createdById: profileInformationData?.data?.data?.user?.id,
    status: INVENTORY_STATUS.PUBLISHED,
  });

  // memoizing  count
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const total = productList?.data?.data?.total;
    if (!isNaN(total) && total !== undefined) {
      setCount(Number(total));
    }
  }, [productList?.data?.data?.total]);

  const productData = useMemo(() => {
    return productList?.data?.data?.items;
  }, [productList]);

  console.log(productData, "productData");

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Memoize products to prevent unnecessary re-renders
  const products = useMemo(() => sampleProducts, []);

  useEffect(() => {
    if (!isProductListLoading && !isProductListError) {
      setIsInitialLoading(false);
    }
  }, [isProductListLoading, isProductListError]);

  if (isInitialLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-4">
      <div className="flex items-center flex-wrap gap-2 justify-between pb-4">
        <p className="font-semibold font-primary text-lg">Products</p>
        <div className="flex items-center gap-4">
          <SearchComponent
            state={state}
            setState={setState}
            placeholder="Search for products"
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {productData?.length > 0 &&
          productData?.map((product: any, index: any) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        {productData?.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
      {productData?.length > 0 && (
        <div className="mt-12">
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
      )}
    </div>
  );
};

export default Index;
