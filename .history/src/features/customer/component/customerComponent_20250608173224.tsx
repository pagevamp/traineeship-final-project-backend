"use client";

import React from "react";
import InfoBox from "./InfoBox";
import SearchBar from "@/components/ui/searchbar";
import Image from "next/image";
import CustomerStatus from "./CustomerStatus";
import { motion } from "framer-motion";

const CustomerComponent = () => {
  return (
    <div>
      <div>
        {" "}
        <div className="bf-[#F9F2FD]">
          <div className="my-[25px]">
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
                <Image
                  src="/Download.svg"
                  alt="profile"
                  width={20}
                  height={18}
                />
              }
            />
          </motion.div>
          <div className="mt-[25px]">
            <CustomerStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerComponent;
