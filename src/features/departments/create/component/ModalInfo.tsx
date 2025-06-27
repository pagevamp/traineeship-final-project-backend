"use client";

import React from "react";
import ModalData from "./Modaldata";
import { motion } from "framer-motion";
import { useModal } from "@/hooks/useModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { CreateDepartmentPayload } from "../../types";

const DepartmentForm = () => {
  const { closeModal } = useModal();
  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<CreateDepartmentPayload>({
    defaultValues: {
      name: "",
      contactPerson: "",
      contactEmail: "",
      countryCode: "+977",
      contactPhone: "",
    },
  });

  const onSubmit = (data: CreateDepartmentPayload) => {};

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
        <ModalData
          register={register}
          watch={watch}
          setValue={setValue}
          trigger={trigger}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          control={control}
          defaultValues={getValues()}
          isDepartmentLoading={false}
        />
      </motion.div>
    </div>
  );
};

export default DepartmentForm;
