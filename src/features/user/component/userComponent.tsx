"use client";

import SearchBar from "@/components/ui/searchbar";
import React, { useState } from "react";
import InfoBox from "./InfoBox";
import Image from "next/image";
import { PlusCircleIcon } from "lucide-react";
import UserStatus from "./userstatus";
import SliderModal from "./SliderModal";
import { motion } from "framer-motion";

const UserComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        <div className="mb-[15px]">
          <InfoBox />
        </div>

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <div className="w-full flex flex-row items-center gap-[10px] mt-[41px] mb-[26px]">
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

        <div>
          <UserStatus />
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
            <div className="bg-white rounded-[39px] p-6 relative w-[669px]">
              <button
                onClick={handleCloseModal}
                className="absolute -top-2 -right-2 bg-white w-[45px] h-[45px] rounded-full text-2xl text-[#E06518] font-bold bg-transparent border-primary border cursor-pointer"
                aria-label="Close modal"
              >
                &times;
              </button>
              <SliderModal />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserComponent;
