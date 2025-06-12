import React from "react";
import { useModal } from "@/hooks/useModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { optionalDocumentDetails } from "../constant";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

const ShipmentDocumentModal = () => {
  const { closeModal } = useModal();

  return (
    <div className="relative w-full p-8">
      <div
        onClick={closeModal}
        className="absolute -top-2 -right-2 z-50 bg-white hover:bg-primary-light w-[45px] h-[45px] rounded-full text-2xl text-[#E06518] font-bold border-primary border cursor-pointer flex items-center justify-center"
      >
        <Icon icon="ic:baseline-close" width="24" height="24" />
      </div>

      <motion.div
        className="flex flex-col items-center w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
          {optionalDocumentDetails.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <div className="w-full h-12 border border-[#C6C6C6] rounded-lg flex items-center justify-between px-4">
                  <span className="font-primary text-sm text-[#A0A0A0] truncate">
                    {item.title}
                    {item.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </span>
                  <Image
                    src="/uploadgrey.svg"
                    alt="upload icon"
                    width={20}
                    height={20}
                    className="flex-shrink-0"
                  />
                </div>
              </div>

              <div className="flex-shrink-0">
                <Checkbox />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ShipmentDocumentModal;
