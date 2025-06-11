"use client";
import React from "react";
import ShipmentInfoBox from "./ShipmentInfoBox";
import { motion } from "framer-motion";
import SearchBar from "@/components/ui/searchbar";
import Image from "next/image";
import { PlusCircleIcon } from "lucide-react";
import ShipmentTable from "./ShipmentTable";
import ShipmentPickup from "./ShipmentPickup";
import ShipmentDetail from "./ShipmentDetails";
import ShipmentAdd from "./ShipmentAdd";
import { useRouter } from "next/navigation";

const ShipmentComponent = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-3 sm:mb-4">
        <ShipmentInfoBox />
      </div>
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <div className="w-full flex flex-row items-center gap-[7px] mb-4">
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
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF6502] to-[#FF953D] text-white rounded-[37px] text-primary text-sm font-300 whitespace-nowrap px-6 py-3 "
            >
              Add Shipment <PlusCircleIcon size={20} />
            </button>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <ShipmentTable />
      </motion.div>
    </div>
  );
};

export default ShipmentComponent;
