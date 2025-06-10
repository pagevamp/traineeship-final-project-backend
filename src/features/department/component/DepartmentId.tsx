"use client";
import React, { useState } from "react";
import Image from "next/image";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import DepartmentStatus from "./DepartmentStatus";
import DepartmentInfoCard from "./DepartmentInfoCard";
import { motion } from "framer-motion";

const DepartmentId = () => {
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });

  return (
    <>
      <motion.div
        className="mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <DepartmentInfoCard />
      </motion.div>
      <div>
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <SearchComponent
            state={state}
            setState={setState}
            placeholder="Search for user"
            className="w-[80%]"
          />

          <div>
            <div className="bg-white gradient-border w-10 h-10 m-auto flex items-center justify-center rounded-full p-2 cursor-pointer">
              <Image
                src="/Download.svg"
                alt="Download Icon"
                width={18}
                height={21}
              />
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="mt-4"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      >
        <DepartmentStatus />
      </motion.div>
    </>
  );
};

export default DepartmentId;
