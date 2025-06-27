"use client";
import { useEffect } from "react";
import Child from "@/features/departments/create/form";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { departmentCreationValidationSchema } from "../validation";
import { CreateDepartmentPayload } from "../types";
import {
  useCreateDepartment,
  useDeleteDepartment,
  useGetDepartmentById,
  useUpdateDepartment,
} from "../hooks";
import { toast } from "sonner";
import { useModal } from "@/hooks/useModal";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";
import { department, departmentFormField } from "../constant";
import { getNestedValue } from "@/features/users/constant";
import { useQueryClient } from "@tanstack/react-query";

interface IndexProps {
  id?: string;
}

const Index = ({ id }: IndexProps) => {
  const departmentId = id ?? "";
  const queryClient = useQueryClient();

  const { closeModal } = useModal();
  const { showConfirmation } = useConfirmationDialog();

  const {
    register,
    watch,
    setValue,
    trigger,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDepartmentPayload>({
    defaultValues: {
      countryCode: "91",
    },
    resolver: yupResolver(
      departmentCreationValidationSchema
    ) as Resolver<CreateDepartmentPayload>,
  });
  const defaultValues = watch();

  const { data: getDepartments } = useGetDepartmentById(
    departmentId ?? undefined
  );

  useEffect(() => {
    if (id) {
      departmentFormField.forEach((field) => {
        const value = getNestedValue(getDepartments?.data?.data, field);
        setValue(field as any, value);
      });
    }
  }, [id, getDepartments, setValue]);

  const { mutateAsync: createDepartment, isPending } = useCreateDepartment({
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["departmentList"],
      });
      toast.success("Department Successfully Created!!");
      closeModal();
    },
  });

  const { mutateAsync: handleUpdate, isPending: isUpdateLoading } =
    useUpdateDepartment({
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["departmentList"],
        });
        toast.success("Department Updated Successfully!!");
        closeModal();
      },
    });

  const { mutateAsync: handleDelete, isPending: isDeleteLoading } =
    useDeleteDepartment({
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["departmentList"] });
        toast.success("Designation Deleted Successfully!!");
        closeModal();
      },
    });

  const buildRequestBody = (formData: CreateDepartmentPayload) => {
    const { name, contactEmail, contactPerson, contactPhone, countryCode } =
      formData;

    return {
      name: name?.trim(),
      contactEmail: contactEmail,
      contactPerson: contactPerson,
      contactPhone: contactPhone,
      countryCode: `+${countryCode}`,
    };
  };

  const onSubmit = async (formData: CreateDepartmentPayload) => {
    try {
      const reqBody = buildRequestBody(formData);
      await createDepartment(reqBody);
    } catch (error) {
    } finally {
    }
  };

  const onUpdate = async (formData: CreateDepartmentPayload) => {
    try {
      if (!id) return;
      const reqBody = buildRequestBody(formData);
      await handleUpdate({ id, body: reqBody });
    } catch (error) {}
  };

  const handleUpdateModal = (formData: CreateDepartmentPayload) => {
    showConfirmation({
      title: "Update Department?",
      description: "Are you sure you want to update the department details?",
      confirmText: "Yes",
      confirmClassName:
        "font-secondary bg-gradient-to-r from-[#E06518] to-[#E3802A] hover:from-[#E06518] hover:to-[#E06518] transition-all duration-300",
      cancelText: "Cancel",
      isDisabled: isUpdateLoading,
      onConfirm: () => onUpdate(formData),
    });
  };

  const createDepartmentProps = {
    register,
    watch,
    setValue,
    trigger,
    control,
    errors,
    defaultValues,
    handleUpdateModal,
    handleSubmit,
    onSubmit,
    onUpdate,
    isPending,
    departments: [],
    isLoading: false,
    isEdit: Boolean(id),
  };

  return <Child {...createDepartmentProps} />;
};

export default Index;
