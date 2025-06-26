"use client";

import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useModal } from "@/hooks/useModal";
import { CreateDesignationPayload } from "../../../types";
import { Resolver, useForm } from "react-hook-form";
import { designationCreationValidationSchema } from "../../../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateDesignation,
  useGetAllDesignations,
  useUpdateDesignation,
} from "../hooks";
import Child from "./form";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";

type Props = {
  onAddDesignation?: (newDesignation: any) => void;
};

const Index: React.FC<Props> = ({ onAddDesignation }) => {
  const params = useParams();
  const departmentId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();
  const isEdit = Boolean(departmentId);

  const { closeModal } = useModal();
  const queryClient = useQueryClient();
  const { showConfirmation } = useConfirmationDialog();

  const {
    register,
    watch,
    setValue,
    trigger,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateDesignationPayload>({
    resolver: yupResolver(
      designationCreationValidationSchema
    ) as Resolver<CreateDesignationPayload>,
  });

  const defaultValues = watch();

  const {
    data: existing,
    isLoading: isFetching,
    isError,
  } = useGetAllDesignations({ id: departmentId ?? "" });

  useEffect(() => {
    if (existing?.data?.data) {
      const d = existing.data.data;
      reset({ name: d.name, departmentId: d.departmentId });
    }
  }, [existing, reset]);

  const { mutateAsync: saveDesignation } = useCreateDesignation({
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Something went wrong!"),
    onSuccess: (res) => {
      toast.success("Designation saved!");
      queryClient.invalidateQueries({
        queryKey: ["designations", departmentId],
      });
      onAddDesignation?.(res.data.data);
      closeModal();
    },
  });

  const { mutateAsync: handleUpdate, isPending: isUpdateLoading } =
    useUpdateDesignation({
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      },
      onSuccess: (data) => {
        router.push("/departments");
        toast.success("department Updated Successfully!!");
        closeModal();
      },
    });

  const buildRequestBody = (formData: CreateDesignationPayload) => {
    const { name, departmentId } = formData;

    return {
      name: name?.trim(),
      department: { id: departmentId },
    };
  };

  const onSubmit = async (formData: CreateDesignationPayload) => {
    if (!departmentId) {
      toast.error("Invalid Department ID.");
      return;
    }
    const body = {
      name: formData.name.trim(),
      department: { id: departmentId },
    };
    try {
      await saveDesignation(body);
    } catch (err) {
      console.error(err);
    }
  };

  const onUpdate = async (formData: CreateDesignationPayload) => {
    try {
      if (!departmentId) return;
      const reqBody = buildRequestBody(formData);
      await handleUpdate({ departmentId, body: reqBody });
    } catch (error) {}
  };

  const handleUpdateModal = (formData: CreateDesignationPayload) => {
    showConfirmation({
      title: "Update Department?",
      description: "Are you sure you want to update the Department details?",
      confirmText: "Yes",
      confirmClassName:
        "font-secondary bg-gradient-to-r from-[#E06518] to-[#E3802A] hover:from-[#E06518] hover:to-[#E06518] transition-all duration-300",
      cancelText: "Cancel",
      onConfirm: () => onUpdate(formData),
    });
  };

  const createDesignationProps = {
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
    isEdit: Boolean(departmentId),
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={closeModal}
        aria-label="Close modal"
        className="absolute -top-2 -right-2 z-50 bg-white hover:bg-primary-light w-[45px] h-[45px] rounded-full text-2xl text-[#E06518] font-bold border-primary border flex items-center justify-center"
      >
        <Icon icon="ic:baseline-close" width="24" height="24" />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Child {...createDesignationProps} />
      </motion.div>
    </div>
  );
};

export default Index;
