"use client";
import React, { useMemo } from "react";
import { useGetAllDepartments } from "../../hooks";
import { DepartmentInformationProps } from "../../types";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import ModalData from "../component/Modaldata";
import { useModal } from "@/hooks/useModal";
import { motion } from "framer-motion";

const EditForm = (props: DepartmentInformationProps) => {
  const { defaultValues, handleSubmit, onSubmit, isPending } = props;

  const { data: getDepartments, isLoading: isDepartmentLoading } =
    useGetAllDepartments({});

  

  const departmentInformationProps = {
    ...props,
    allDepartments: getDepartments?.data?.data?.items,
    isDepartmentLoading,
   
  };

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
        <ModalData {...departmentInformationProps} />

        <div className="flex justify-center my-[15px]">
          <Button
            variant="customGradient"
            className="w-[191px] h-[40px] rounded-[10px] text-white text-[14px] font-medium"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            Update
            {isPending && (
              <div className="flex items-center justify-center">
                <Icon
                  icon="codex:loader"
                  className="text-[30px] animate-spin"
                />
              </div>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditForm;
