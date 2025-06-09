"use client";

import React from "react";
import InfoBox from "./InfoBox";
import SearchBar from "@/components/ui/searchbar";
import Image from "next/image";
import CustomerStatus from "./CustomerStatus";
import { motion } from "framer-motion";

const CustomerComponent = () => {
  return (
    <div className="bg-[#F9F2FD] sm:px-6 md:px-10 py-6 w-full">
      <div className="mb-6">
        <InfoBox />
      </div>

      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full z-50"
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

      <div className="mt-6">
        <CustomerStatus />
      </div>
    </div>
  );
};

export default CustomerComponent;
