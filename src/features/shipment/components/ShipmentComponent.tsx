"use client";
import React from "react";
import ShipmentInfoBox from "./ShipmentInfoBox";
import { motion } from "framer-motion";
import SearchBar from "@/components/ui/searchbar";
import Image from "next/image";
import { PlusCircleIcon } from "lucide-react";
import ShipmentTable from "./ShipmentTable";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Pagination from "@/components/pagination";

const ShipmentComponent = () => {
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4">
      <div>
        <ShipmentInfoBox />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        <div className="w-full flex flex-row items-center gap-[7px]">
          <SearchBar
            placeholder="Search for Department"
            className="w-[97%] gap-[7px]"
            firstCircleContent={
              <Image src="/Menu.svg" alt="Menu" width={20} height={20} />
            }
            secondCircleContent={""}
          />
          <div className="">
            <button
              onClick={() => router.push(`/shipment/1`)}
              className="flex items-center font-secondary font-[400] justify-center gap-2 bg-gradient-to-r from-[#FF6502] to-[#FF953D] text-white rounded-[37px] text-primary text-sm font-300 whitespace-nowrap px-6 py-3 "
            >
              Add Shipment <PlusCircleIcon size={20} />
            </button>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        // transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <ShipmentTable />
      </motion.div>
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
    </div>
  );
};

export default ShipmentComponent;
