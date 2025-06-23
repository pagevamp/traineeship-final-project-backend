"use client";
import React, { useState } from "react";
import Child from "@/features/users/create/form";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userCreationValidationSchema } from "../validation";
import { CreateUserPayload, Module } from "../types";
import { useCreateInternalUser } from "../hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);

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
      countryCode: "91",
    },
    resolver: yupResolver(
      userCreationValidationSchema
    ) as Resolver<CreateUserPayload>,
  });
  const defaultValues = watch();

  const { mutateAsync: createInternalUser, isPending } = useCreateInternalUser({
    onError: (error, variables, context) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
    onSuccess: (data) => {
      toast.success("User Successfully Created!!");
      router.push("/users");
    },
  });

  const onSubmit = async (formData: CreateUserPayload) => {
    let requestObject: any = {
      ...formData,
    };

    try {
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
      } = requestObject;

      const reqBody = {
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        employeeId,
        email,
        countryCode: `+${countryCode}`,
        phoneNumber,
        password,
        departments: [
          {
            department: { id: department?.value },
            designation: { id: designationId },
          },
        ],
        modules,
      };

      await createInternalUser(reqBody);
    } catch (error) {
    } finally {
    }
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
    modules,
    setModules,
    isPending
  };
  return <Child {...createUserProps} />;
};

export default Index;
