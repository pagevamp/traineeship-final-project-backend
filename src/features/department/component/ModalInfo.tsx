"use client";

import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import ModalData from "./Modaldata";
import { motion } from "framer-motion";

const DepartmentForm = () => {
  const { closeModal } = useModal();

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ModalData />
      </motion.div>

      <div className="flex justify-center gap-2 pt-6">
        {[0, 1].map((idx) => (
          <button
            key={idx}
            className="w-3 h-3 rounded-full transition-colors"
            aria-label={`Dot ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DepartmentForm;
