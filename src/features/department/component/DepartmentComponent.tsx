"use client";

import SearchBar from "@/components/ui/searchbar";
import Image from "next/image";
import React from "react";
import DepartmentInfo from "./DepartmentInfo";
import { PlusCircleIcon } from "lucide-react";
import { useModalContext } from "@/providers/modal-context";
import DepartmentForm from "./ModalInfo";
import { motion } from "framer-motion";

const DepartmentComponent = () => {
  const { openModal } = useModalContext();

  const handleCreateClick = () => {
    openModal({
      component: (props: any) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative my-[30px]">
            <button
              onClick={props.closeModal}
              className="absolute top-1 right-2 bg-white w-[45px] h-[45px] border rounded-full text-2xl text-[#E06518] font-bold bg-transparent border-primary cursor-pointer"
              aria-label="Close modal"
            >
              &times;
            </button>
            <DepartmentForm {...props} />
          </div>
        </motion.div>
      ),
      className:
        "bg-white rounded-lg max-w-[600px] min-h-[400px] px-[10px] pt-[10px] relative overflow-x-hidden",
      overlayClassName: "fixed inset-0 bg-black/60",
    });
  };

  return (
    <>
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <div className="w-full flex flex-row items-center gap-[10px] mb-[26px]">
            <SearchBar
              placeholder="Search for Department"
              className="w-[97%]  gap-[7px]"
              firstCircleContent={
                <Image src="/Menu.svg" alt="Menu" width={20} height={20} />
              }
              secondCircleContent={""}
            />
            <div className="bg-gradient-to-r from-[#E06518] to-[#E3802A] p-[2px] rounded-[37px] w-fit h-fit">
              <button
                onClick={handleCreateClick}
                className="flex items-center justify-center gap-2 text-[#E06518] w-[122px] h-[45px] bg-white rounded-[37px] text-sm font-medium"
              >
                Create <PlusCircleIcon size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      >
        <DepartmentInfo />
      </motion.div>
    </>
  );
};

export default DepartmentComponent;
