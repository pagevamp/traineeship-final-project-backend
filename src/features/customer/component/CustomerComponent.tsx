"use client";

import React from "react";
import InfoBox from "./InfoBox";
import SearchBar from "@/components/ui/searchbar";
import Image from "next/image";
import CustomerStatus from "./CustomerStatus";
import { motion } from "framer-motion";

const CustomerComponent = () => {
  return (
    <div className="lg:px-0 sm:px-6 md:px-1 pb-6 w-full">
      <div className="mb-3 sm:mb-4">
        <InfoBox />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        <SearchBar
          placeholder="Search for user"
          className="w-full"
          firstCircleContent={
            <Image src="/Menu.svg" alt="Menu" width={20} height={20} />
          }
          secondCircleContent={
            <Image src="/Download.svg" alt="Download" width={20} height={18} />
          }
        />
      </motion.div>

      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="mt-4">
          <CustomerStatus />
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerComponent;
