"use client";
import Child from "@/features/departments/create/form";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { departmentCreationValidationSchema } from "../validation";
import { CreateDepartmentPayload } from "../types";
import {
  useCreateDepartment,
  useGetDepartmentById,
  useUpdateDepartment,
} from "../hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";
import { useEffect } from "react";
import { departmentFormField } from "../constant";
import { getNestedValue } from "@/features/users/constant";

interface IndexProps {
  id?: string;
}

const Index = ({ id }: IndexProps) => {
  const departmentId = id ?? "";
  const isEdit = Boolean(departmentId);

  const { closeModal } = useModal();
  const router = useRouter();
  const { showConfirmation } = useConfirmationDialog();

  const {
    register,
    watch,
    setValue,
    trigger,
    control,
    handleSubmit,
    reset,
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

  const {
    data: getDepartments,
    isLoading,
    isError,
  } = useGetDepartmentById(departmentId ?? undefined);

  const getDepartmentDetail = getDepartments?.data?.data;

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
      closeModal();
    },
    onSuccess: (data) => {
      toast.success("Department Successfully Created!!");
      router.push("/departments");
      closeModal();
    },
  });

  const { mutateAsync: handleUpdate, isPending: isUpdateLoading } =
    useUpdateDepartment({
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      },
      onSuccess: (data) => {
        router.push("/departments");
        toast.success("department Updated Successfully!!");
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
      closeModal();
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
      description: "Are you sure you want to update the Department details?",
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
    isEdit: Boolean(id),
  };


  return <Child {...createDepartmentProps} />;
};

export default Index;
