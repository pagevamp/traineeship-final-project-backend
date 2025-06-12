"use client";

import React from "react";
import SearchBar from "@/components/ui/searchbar";
import Image from "next/image";
import DepartmentInfo from "./DepartmentInfo";
import { PlusCircleIcon } from "lucide-react";
import { useModalContext } from "@/providers/modal-context";
import DepartmentForm from "./ModalInfo";
import { motion } from "framer-motion";
import Pagination from "@/components/pagination";
import { useState } from "react";

const DepartmentComponent = () => {
  const { openModal } = useModalContext();
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });

  const handleCreateClick = () => {
    openModal({
      component: DepartmentForm,
      // (props: any) => (
      //   <motion.div
      //     initial={{ opacity: 0 }}
      //     animate={{ y: 0, opacity: 1 }}
      //     transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      //     className="relative"
      //   >
      //     <div className="relative my-[30px]">
      //       <button
      //         onClick={props.closeModal}
      //         className="absolute top-1 right-2 bg-white w-[45px] h-[45px] border rounded-full text-2xl text-[#E06518] font-bold bg-transparent border-primary cursor-pointer"
      //         aria-label="Close modal"
      //       >
      //         &times;
      //       </button>
      //       <DepartmentForm {...props} />
      //     </div>
      //   </motion.div>
      // ),
      // className:
      //   "bg-white rounded-lg max-w-[600px] min-h-[400px] px-[10px] pt-[10px] relative overflow-x-hidden",
      // overlayClassName: "fixed inset-0 bg-black/60",
      className: "h-fit bg-white max-w-[98%] sm:max-w-[50%] rounded-[39px]",
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
          <div className="w-full flex flex-row items-center gap-[10px] mb-4">
            <SearchBar
              placeholder="Search for Department"
              className="w-[97%] gap-[7px]"
              firstCircleContent={
                <Image src="/Menu.svg" alt="Menu" width={20} height={20} />
              }
              secondCircleContent={""}
            />
            <div className="bg-gradient-to-r from-[#E06518] to-[#E3802A] p-[1px] rounded-[37px] w-fit h-fit">
              <button
                onClick={handleCreateClick}
                className="flex items-center justify-center gap-2 text-[#E06518] w-[122px] h-[45px] bg-white hover:bg-primary-light rounded-[37px] text-sm font-semibold"
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

      <div className="mt-8">
        <Pagination
          currentPage={state.pagination.page}
          totalPages={
            // count / state.pagination.recordsPerPage > 0
            //   ? Math.ceil(count / state.pagination.recordsPerPage)
            //   : Math.floor(count / state.pagination.recordsPerPage) + 1
            4
          }
          onPageChange={(page: number) => {
            setState((prevState) => ({
              ...prevState,
              pagination: {
                ...prevState.pagination,
                page,
              },
            }));
          }}
        />
      </div>
    </>
  );
};

export default DepartmentComponent;
