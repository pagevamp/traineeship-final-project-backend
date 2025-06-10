"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import LoadingCard from "./loading";
import { sampleProducts } from "./constant";
import ProductCard from "./product-card";

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

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Memoize products to prevent unnecessary re-renders
  const products = useMemo(() => sampleProducts, []);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Index;
