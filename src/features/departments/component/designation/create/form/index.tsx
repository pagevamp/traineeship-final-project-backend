import React from "react";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { DesignationInformationProps } from "@/features/departments/types";
import { Button } from "@/components/ui/button";

const Index: React.FC<DesignationInformationProps> = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  isEdit,
  handleUpdateModal,
  isPending,
}) => {
  return (
    <div className="relative p-6">
      <h2 className="font-primary text-[20px] text-[#111D35] mb-6">
        {isEdit ? "Update Designation" : "Create Designation"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex gap-6">
          <div className="flex flex-col flex-1">
            <Input
              type="text"
              name="name"
              register={register}
              id="name"
              required
              labelName="Designation Name"
              placeholder="Enter Designation Name"
              error={errors.name?.message}
            />
          </div>
        </div>

        <div className="flex justify-center mt-7">
          <Button
            variant="customGradient"
            className="w-[191px] h-[40px] rounded-[10px] text-white text-[14px] font-medium "
            onClick={
              isEdit ? handleSubmit(handleUpdateModal) : handleSubmit(onSubmit)
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
      </form>
    </div>
  );
};

export default Index;
