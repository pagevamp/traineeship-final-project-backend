"use client";
import React, { useState } from "react";
import Image from "next/image";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import DepartmentStatus from "./DepartmentStatus";
import DepartmentInfoCard from "./DepartmentInfoCard";
import { motion } from "framer-motion";
import { DepartmentTab } from "../constant";
import Button from "@/components/Button/Button";
import { useModalContext } from "@/providers/modal-context";
import DesignationForm from "./designation";
import { cn } from "@/lib/utils";

const DepartmentId = () => {
  const { openModal } = useModalContext();
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });
  const [activeTab, setActiveTab] = useState<DepartmentTab>("Users");

  return (
    <>
      <motion.div
        className="mb-4"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        <DepartmentInfoCard />
      </motion.div>
      <div>
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
        >
          <SearchComponent
            state={state}
            setState={setState}
            placeholder="Search for user"
            className={cn("w-[80%]", activeTab === "Designation" && "w-[35%]")}
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
          {activeTab === "Designation" && (
            <div
              onClick={() => {
                openModal({
                  component: DesignationForm,
                  className:
                    "h-fit bg-white max-w-[98%] sm:max-w-[40%] rounded-[39px]",
                });
              }}
            >
              <Button
                label="Create"
                className="w-fit font-secondary font-[400] h-[38px] px-4 text-sm whitespace-nowrap"
              />
            </div>
          )}
        </motion.div>
      </div>
      <motion.div
        className="mt-4"
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      >
        <DepartmentStatus activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>
    </>
  );
};

export default DepartmentId;
