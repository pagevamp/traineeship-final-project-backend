"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetDepartmentById, useUpdateDepartment } from "../hooks";
import { useForm } from "react-hook-form";
import EditForm from "../create/form/editForm";
import { CreateDepartmentPayload } from "../types";
import { departmentFormField } from "../constant";
import { getNestedValue } from "@/features/users/constant";

interface Props {
  id: string;
}

export default function DepartmentEditModal({ id }: Props) {
  const router = useRouter();

  const { data: resp, isLoading: loading } = useGetDepartmentById(id);
  const existing: CreateDepartmentPayload | undefined = resp?.data;
  console.log(resp, "resp");
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<CreateDepartmentPayload>({
    defaultValues: existing,
  });

  useEffect(() => {
    if (id) {
      departmentFormField.forEach((field) => {
        const value = getNestedValue(resp?.data?.data, field);
        setValue(field as any, value);
      });
    }
  }, [id, resp, setValue]);

  const updateMut = useUpdateDepartment();

  const onSubmit = (data: CreateDepartmentPayload) => {
    updateMut.mutate(
      { id },
      {
        onSuccess: () => {
          router.push("/departments");
        },
      }
    );
  };

  return (
    <EditForm
      defaultValues={existing}
      isPending={isSubmitting}
      isDepartmentLoading={loading}
      register={register}
      control={control}
      setValue={setValue}
      trigger={trigger}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    />
  );
}
