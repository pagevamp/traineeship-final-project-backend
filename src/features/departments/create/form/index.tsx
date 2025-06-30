"use client";
import { DepartmentInformationProps } from "../../types";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import ModalData from "../component/Modaldata";
import { useModal } from "@/hooks/useModal";
import { motion } from "framer-motion";
import { useGetDepartments } from "@/features/users/hooks";

const Index = (props: DepartmentInformationProps) => {
  const { closeModal } = useModal();

  const { handleSubmit, onSubmit, isPending, isEdit, handleUpdateModal } =
    props;

  const { data: getDepartments, isLoading: isDepartmentLoading } =
    useGetDepartments();

  const departmentInformationProps = {
    ...props,
    allDepartments: getDepartments?.data?.data?.items,
    isDepartmentLoading,
  };

  return (
    <>
      <div
        onClick={closeModal}
        className="absolute -top-2 -right-2 z-40 bg-white hover:bg-primary-light w-[45px] h-[45px] rounded-full text-2xl text-[#E06518] font-bold border-primary border cursor-pointer flex items-center justify-center"
      >
        <Icon icon="ic:baseline-close" width="24" height="24" />
      </div>
      <div className="relative w-full max-h-[90vh] overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ModalData {...departmentInformationProps} />

          <div className="flex justify-center mb-8">
            <Button
              variant="customGradient"
              className="w-[191px] h-[40px] rounded-[10px] text-white text-[14px] font-medium "
              onClick={
                isEdit
                  ? handleSubmit(handleUpdateModal)
                  : handleSubmit(onSubmit)
              }
              disabled={isPending}
            >
              {isEdit ? "Update" : "Create"}
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
    </>
  );
};

export default Index;
