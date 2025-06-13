import React from "react";
import Form from "./form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { useModal } from "@/hooks/useModal";

const Index = () => {
  const { closeModal } = useModal();

  return (
    <div className="relative w-full">
      <div
        onClick={closeModal}
        className="absolute -top-2 -right-2 z-50 bg-white hover:bg-primary-light w-[45px] h-[45px] rounded-full text-2xl text-[#E06518] font-bold border-primary border cursor-pointer flex items-center justify-center"
      >
        <Icon icon="ic:baseline-close" width="24" height="24" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Form />
      </motion.div>
    </div>
  );
};

export default Index;
