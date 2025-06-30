"use client";
import React, { useEffect, useMemo, useState } from "react";
import Child from "@/features/users/create/form";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  userCreationValidationSchema,
  userUpdateValidationSchema,
} from "../validation";
import { CreateUserPayload, Module } from "../types";
import {
  useCreateInternalUser,
  useGetModules,
  useGetUserDetail,
  useUpdateInternalUser,
} from "../hooks";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { PageLoader } from "@/components/loaders/page-loader";
import {
  getNestedValue,
  internalUserFormField,
  validatePermissions,
} from "../constant";
import { useConfirmationDialog } from "@/providers/ConfirmationDialogProvider";

const Index = () => {
  const searchParams = useSearchParams();
  const { showConfirmation } = useConfirmationDialog();

  const id = searchParams.get("id") as string;
  const router = useRouter();
  const [localModules, setLocalModules] = useState<Module[]>([]);

  const {
    register,
    watch,
    setValue,
    trigger,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserPayload>({
    defaultValues: {
      countryCode: "971",
    },
    resolver: yupResolver(
      id ? userUpdateValidationSchema : userCreationValidationSchema
    ) as Resolver<CreateUserPayload>,
  });
  const defaultValues = watch();

  // fetching user details
  const { data: userDetail, isLoading, isError } = useGetUserDetail(id);
  const getUserDetail = userDetail?.data?.data;

  const { data: getModules, isLoading: isModuleLoading } = useGetModules();
  const allModuleList = useMemo(
    () => getModules?.data?.data?.items,
    [getModules?.data?.data?.items]
  );

  useEffect(() => {
    const userModules = getUserDetail?.modules;
    const hasUserModules = Array.isArray(userModules) && userModules.length > 0;

    const finalModules = hasUserModules ? userModules : allModuleList;

    if (finalModules?.length > 0) {
      setLocalModules(finalModules);
      setValue("modules", finalModules);
    }
  }, [getUserDetail?.modules, allModuleList, setValue]);

  useEffect(() => {
    if (id) {
      internalUserFormField.forEach((field) => {
        const value = getNestedValue(getUserDetail, field);
        setValue(field as any, value);
      });
      setValue("department", {
        label: getUserDetail?.departments?.[0]?.department?.name,
        value: getUserDetail?.departments?.[0]?.department?.id,
      });
      setValue(
        "designationId",
        getUserDetail?.departments?.[0]?.designation?.id
      );
      setValue("modules", getUserDetail?.modules || []);
      setLocalModules(getUserDetail?.modules || []);
      setValue("countryCode", getUserDetail?.countryCode?.replace(/^\+/, ""));
    }
  }, [id, getUserDetail, setValue]);

  const { mutateAsync: createInternalUser, isPending } = useCreateInternalUser({
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
    onSuccess: (data) => {
      toast.success("User Successfully Created!!");
      router.push("/users");
    },
  });

  const { mutateAsync: handleUpdate, isPending: isUpdateLoading } =
    useUpdateInternalUser({
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      },
      onSuccess: (data) => {
        router.push("/users");
        toast.success("User Updated Successfully!!");
      },
    });

  const buildRequestBody = (
    formData: CreateUserPayload,
    existingDepartmentId?: string | null
  ) => {
    const {
      firstName,
      lastName,
      employeeId,
      email,
      countryCode,
      phoneNumber,
      password,
      department,
      designationId,
      modules,
    } = formData;

    const departments = [
      {
        ...(existingDepartmentId && { id: existingDepartmentId }),
        department: { id: department?.value },
        designation: { id: designationId },
      },
    ];

    return {
      firstName: firstName?.trim(),
      lastName: lastName?.trim(),
      employeeId,
      email,
      countryCode: `+${countryCode}`,
      phoneNumber,
      ...(password && { password }),
      departments,
      modules,
    };
  };

  const validateAndProceed = (
    modules: Module[] | undefined,
    onValid: () => void
  ) => {
    if (modules && !validatePermissions(modules)) {
      return toast.error("Please select one of the permissions.");
    }
    onValid();
  };

  // Create user handler
  const onSubmit = async (formData: CreateUserPayload) => {
    validateAndProceed(formData.modules, async () => {
      try {
        const reqBody = buildRequestBody(formData);
        await createInternalUser(reqBody);
      } catch (error) {}
    });
  };

  // Update user handler
  const onUpdate = async (formData: CreateUserPayload) => {
    validateAndProceed(formData.modules, async () => {
      try {
        const existingId = getUserDetail?.departments?.[0]?.id ?? null;
        const reqBody = buildRequestBody(formData, existingId);
        await handleUpdate({ id, body: reqBody });
      } catch (error) {}
    });
  };

  // Update confirmation modal
  const handleUpdateModal = (formData: CreateUserPayload) => {
    validateAndProceed(formData.modules, () => {
      showConfirmation({
        title: "Update User?",
        description: "Are you sure you want to update the user details?",
        confirmText: "Yes",
        confirmClassName:
          "font-secondary bg-gradient-to-r from-[#E06518] to-[#E3802A] hover:from-[#E06518] hover:to-[#E06518] transition-all duration-300",
        cancelText: "Cancel",
        isDisabled: isUpdateLoading,
        onConfirm: () => onUpdate(formData),
      });
    });
  };

  const createUserProps = {
    register,
    control,
    setValue,
    watch,
    trigger,
    errors,
    defaultValues,
    handleSubmit,
    onSubmit,
    modules: defaultValues?.modules,
    isPending,
    isModuleLoading,
    handleUpdateModal,
    isEdit: !!id,
    localModules,
    setLocalModules,
  };
  if (isLoading) {
    return <PageLoader />;
  }
  return <Child {...createUserProps} />;
};

export default Index;
