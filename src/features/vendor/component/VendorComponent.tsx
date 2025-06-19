"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SearchBar from "@/components/ui/searchbar";
import { useModalContext } from "@/providers/modal-context";

import { PlusCircleIcon } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import VendorInfoBox from "./VendorInfoBox";
import VendorStatus from "./VendorStatus";
// import VendorModal from "./VendorModal";
import { useRouter } from "next/navigation";

const VendorComponent = () => {
  // const { openModal } = useModalContext();
  const router = useRouter();

  return (
    <div>
      <div className="mb-3 sm:mb-4">
        <VendorInfoBox />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        <div className="w-full flex flex-row items-center gap-[5px] mb-4">
          <SearchBar
            placeholder="Search for Department"
            className="w-[97%]  gap-[7px]"
            firstCircleContent={
              <Image src="/Menu.svg" alt="Menu" width={20} height={20} />
            }
            secondCircleContent={
              <Image
                src="/Download.svg"
                alt="Download"
                width={20}
                height={18}
              />
            }
          />
          <div className="bg-gradient-to-r from-[#E06518] to-[#E3802A] p-[2px] rounded-[37px] w-fit h-fit">
            <button
              onClick={() => router.push("/vendor/new")}
              className="flex font-secondary font-[400] items-center justify-center gap-2 text-[#E06518] w-[122px] h-[45px] bg-white rounded-[37px] text-sm"
            >
              Add <PlusCircleIcon size={24} />
            </button>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        // transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="mt-4">
          <VendorStatus />
        </div>
      </motion.div>
    </div>
  );
};

export default VendorComponent;
