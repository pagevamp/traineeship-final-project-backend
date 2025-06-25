"use client";
import React, { useMemo } from "react";
import PermissionManager from "../component/Grant-Access/PermissionManager";
import { useGetDepartments } from "../../hooks";
import PersonalInformation from "../component/PersonalInformation/PersonalInformation";
import { PersonalInformationProps } from "../../types";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

const Index = (props: PersonalInformationProps) => {
  const {
    defaultValues,
    handleSubmit,
    onSubmit,
    modules,
    isPending,
    isEdit,
    handleUpdateModal,
    setValue,
    localModules,
    setLocalModules,
    isModuleLoading,
  } = props;

  const { data: getDepartments, isLoading: isDepartmentLoading } =
    useGetDepartments();

  const departmentDesignations = useMemo(() => {
    if (!getDepartments?.data?.data?.items) return [];

    return (
      getDepartments?.data?.data?.items.find(
        (dept: any) =>
          dept.name.toLowerCase() ===
          defaultValues?.department?.label?.toLowerCase()
      )?.designations || []
    );
  }, [getDepartments?.data, defaultValues?.department?.label]);

  const personalInformationProps = {
    ...props,
    allDepartments: getDepartments?.data?.data?.items,
    isDepartmentLoading,
    allDesignations: departmentDesignations,
    isEdit,
  };

  return (
    <div>
      <PersonalInformation {...personalInformationProps} />
      <PermissionManager
        modules={modules}
        isLoading={isModuleLoading}
        setValue={setValue}
        localModules={localModules}
        setLocalModules={setLocalModules}
      />
      <div className="flex justify-center mt-[28px]">
        <Button
          variant="customGradient"
          className="w-[191px] h-[40px] rounded-[10px] text-white text-[14px] font-medium"
          onClick={
            isEdit ? handleSubmit(handleUpdateModal) : handleSubmit(onSubmit)
          }
          disabled={isPending}
        >
          {isEdit ? "Update" : "Create"}
          {isPending && (
            <div className="flex items-center justify-center">
              <Icon icon="codex:loader" className="text-[30px] animate-spin" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Index;
