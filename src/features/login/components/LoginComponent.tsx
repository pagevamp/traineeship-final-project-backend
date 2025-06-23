"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LoginPropsInterface } from "../types";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

const LoginComponent = (props: LoginPropsInterface) => {
  const { register, errors, isPending } = props;
  return (
    <motion.div
      className="flex flex-col items-center px-6 max-w-[358px]"
      initial={{ x: 70, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      <Image
        src="/arctern-logo.svg"
        alt="Arctern Logo"
        width={142}
        height={81}
        className="mb-[26px]"
      />

      <Heading title="Login" description="Enter your credentials to proceed." />

      <div className="min-w-[300px] sm:min-w-[358px]">
        <div className="pb-4">
          <Input
            type="text"
            register={register}
            // trigger={trigger}
            name={"username"}
            labelName="Employee ID / Email"
            placeholder="Enter Employee ID / Email"
            // className="min-w-[358px]"
            error={errors?.username?.message}
          />
        </div>

        <div>
          <Input
            type="password"
            register={register}
            // trigger={trigger}
            name={"password"}
            placeholder="Enter Password"
            labelName="Password"
            // className="min-w-[358px]"
            error={errors?.password?.message}
          />
        </div>
      </div>

      <span
        className="text-[#9C9AA5] underline cursor-pointer tracking-wide font-secondary font-[300] text-sm pt-2 self-end mr-[5px]"
        style={{ marginBottom: "60px" }}
      >
        Forgot password?
      </span>
      <Button
        variant={"default"}
        className="w-full h-[48px] rounded-md text-white font-primary text-base"
        style={{
          background: "linear-gradient(to bottom, #CF5406, #FF811A)",
          marginBottom: "45px",
        }}
        disabled={isPending}
      >
        {isPending ? (
          <div className="flex items-center justify-center">
            <Icon icon="codex:loader" className="text-[30px] animate-spin" />
          </div>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="flex items-center gap-2 mb-[20px]">
        <span className="text-[#9C9AA5] font-primary text-sm">
          Don’t have an account ?
        </span>
        <Link href="/register">
          <span
            className="font-primary text-sm font-semibold"
            style={{
              background: "linear-gradient(to bottom, #CF5406, #FF811A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Sign Up
          </span>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-[#9C9AA5] font-secondary font-weight-200 text-xs ">
          By signing up to create an account I accept Company’s
        </span>
        <span className="text-[#26203B] font-secondary text-xs font-weight-200 cursor-pointer">
          Terms of use and Privacy Policy
        </span>
      </div>
    </motion.div>
  );
};

export default LoginComponent;
