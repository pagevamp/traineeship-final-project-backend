import React from "react";
import { shipmentItemDetails } from "../constant";
import ShipmentSelection from "./ShipmentSelection";
import { useModal } from "@/hooks/useModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";

const ShipmentModal = () => {
  const { closeModal } = useModal();
  return (
    <div className="flex flex-col gap-1 p-2 w-full h-full">
      <div
        onClick={closeModal}
        className="absolute -top-2 -right-2 z-50 bg-white hover:bg-primary-light w-[45px] h-[45px] rounded-full text-2xl text-[#E06518] font-bold border-primary border cursor-pointer flex items-center justify-center"
      >
        <Icon icon="ic:baseline-close" width="24" height="24" />
      </div>

      <motion.div
        className="rounded-[25px] bg-white w-full h-full flex-col items-center my-auto pl-8 pr-16 py-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 w-full">
          {shipmentItemDetails.map(({ label, value }, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center gap-1"
            >
              <span className="font-primary text-[14px] md:text-[15px] text-[#404040] font-medium">
                {label}
              </span>
              <span className="font-secondary text-[13px] md:text-[14px] text-[#404040] font-light">
                {value}
              </span>
            </div>
          ))}
        </div>
        <div>
          <ShipmentSelection />
        </div>
      </motion.div>
    </div>
  );
};

export default ShipmentModal;
