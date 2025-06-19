"use client";

import React, { useState } from "react";
import InfoBox from "./InfoBox";
import UserStatus from "./userstatus";
import InternalUserSliderModal from "./SliderModal";
import { useModal } from "@/hooks/useModal";
import { motion } from "framer-motion";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "@/components/Button/Button";

const UserComponent = () => {
  const { openModal } = useModal();
  // managing states
  const [state, setState] = useState({
    pagination: {
      page: 1,
      recordsPerPage: 10,
    },
    search: "",
  });
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
        <div className="w-full flex flex-row items-center gap-4 mb-4">
          <SearchComponent
            state={state}
            setState={setState}
            placeholder="Search for user"
            className="w-[80%]"
          />
          <div>
            <div
              className={`bg-white hover:bg-primary-light gradient-border w-10 h-10 m-auto flex items-center justify-center rounded-full  cursor-pointer`}
            >
              <Icon
                icon="ion:filter-outline"
                width="22"
                height="22"
                className="text-primary"
              />
            </div>
          </div>
          <div
            onClick={() => {
              openModal({
                component: InternalUserSliderModal,
                props: {
                  className: "max-h-[100%] sm:max-h-[80%] h-full bg-white",
                },
                className:
                  "max-h-[100%] sm:max-h-[80%] h-full rounded-sm sm:rounded-[39px] bg-white max-w-[98%] sm:max-w-[50%] ",
                // className:
                //   "min-h-fit h-full bg-white max-w-[98%] sm:max-w-[50%] rounded-[39px]",
              });
            }}
          >
            <Button
              label="Create"
              className="w-fit font-secondary font-[400] h-[38px] px-4 text-sm whitespace-nowrap"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <UserStatus />
      </motion.div>
    </div>
  );
};

export default UserComponent;
