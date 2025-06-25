"use client";
import React from "react";
import LoginForm from "./components/LoginComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidationSchema } from "./validation";
import { toast } from "sonner";
import { useEmailLogin } from "./hooks/auth";
import { storageUtil } from "@/storage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constant";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormValidationSchema),
  });
  const { mutateAsync: loginEmail, isPending } = useEmailLogin({
    onError: (error, variables, context) => {
      toast.error(error?.response?.data?.message);
    },
    onSuccess: (data) => {
      storageUtil.set(ACCESS_TOKEN, data?.data?.data?.accessToken);
      storageUtil.set(REFRESH_TOKEN, data?.data?.data?.refreshToken);
      window.location.href = "/";
    },
  });

  const onSubmit = async (formData: { username: string; password: string }) => {
    try {
      await loginEmail({
        username: formData.username,
        password: formData.password,
      });
    } catch (e) {}
  };
  const loginProps = {
    register,
    watch,
    setValue,
    trigger,
    errors,
    handleSubmit,
    onSubmit,
    isPending,
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LoginForm {...loginProps} />
    </form>
  );
};

export default Index;
