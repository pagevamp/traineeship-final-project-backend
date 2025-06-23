"use client";
import React, { useMemo } from "react";
import PermissionManager from "../component/Grant-Access/PermissionManager";
import { useGetDepartments, useGetModules } from "../../hooks";
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
    setModules,
    isPending,
  } = props;

  const { data: getModules, isLoading } = useGetModules();
  const { data: getDepartments, isLoading: isDepartmentLoading } =
    useGetDepartments();

  const allModuleList = useMemo(
    () => getModules?.data?.data?.items,
    [getModules?.data?.data?.items]
  );

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
  };

  return (
    <div>
      <PersonalInformation {...personalInformationProps} />
      <PermissionManager
        allModuleLists={allModuleList}
        modules={modules}
        setModules={setModules}
        isLoading={isLoading}
      />
      <div className="flex justify-center mt-[28px]">
        <Button
          variant="customGradient"
          className="w-[191px] h-[40px] rounded-[10px] text-white text-[14px] font-medium"
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          Create
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
