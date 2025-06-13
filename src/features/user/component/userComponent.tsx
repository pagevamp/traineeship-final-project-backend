"use client";

import React from "react";
import SearchBar from "@/components/ui/searchbar";
import InfoBox from "./InfoBox";
import Image from "next/image";
import { PlusCircleIcon } from "lucide-react";
import UserStatus from "./userstatus";
import SliderModal from "./SliderModal";
import { useModal } from "@/hooks/useModal";
import { motion } from "framer-motion";

const UserComponent = () => {
  const { openModal } = useModal();

  return (
    <div>
      <div className="mb-3 sm:mb-4">
        <InfoBox />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        <div className="w-full flex flex-row items-center gap-[5px] mb-4">
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
              onClick={() => {
                openModal({
                  component: SliderModal,
                  props: {
                    className: "max-h-[100%] sm:max-h-[80%] h-full bg-white",
                  },
                  className:
                    "h-fit bg-white max-w-[98%] sm:max-w-[50%] rounded-[39px]",
                });
              }}
              className="flex font-secondary items-center justify-center gap-2 text-[#E06518] w-[122px] h-[45px] bg-white rounded-[37px] text-sm font-[400]"
            >
              Create <PlusCircleIcon size={24} />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        // transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <UserStatus />
      </motion.div>
    </div>
  );
};

export default UserComponent;
