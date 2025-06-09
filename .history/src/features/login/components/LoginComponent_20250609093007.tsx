"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import Image from "next/image";

const LoginComponent = () => {
  return (
    <div
      className="flex flex-col items-center px-6"
      style={{ marginTop: "65px" }}
    >
      <Image
        src="/arctern-logo.svg"
        alt="Arctern Logo"
        width={142}
        height={81}
        className="mb-[26px]"
      />

      <Heading title="Login" description="Enter your credentials to proceed." />

      <div>
        <Input
          type="text"
          labelName="Company ID"
          placeholder="Enter Company ID"
          className="w-[358px] h-[48px] rounded border border-gray-300 px-4 mb-[26px] font-primary placeholder-gray-400"
        />
      </div>

      <div>
        <Input
          type="password"
          placeholder="Enter Password"
          labelName="Password"
          className="w-[358px] h-[48px] rounded border border-gray-300 px-4 mb-[6px] font-primary placeholder-gray-400"
        />
      </div>

      <span
        className="text-[#9C9AA5] underline cursor-pointer self-end mr-[5px]"
        style={{ marginBottom: "60px" }}
      >
        Forgot password?
      </span>

      <button
        className="w-[357px] h-[48px] rounded-md text-white font-primary text-lg"
        style={{
          background: "linear-gradient(to bottom, #CF5406, #FF811A)",
          marginBottom: "45px",
        }}
      >
        Continue
      </button>

      <div className="flex items-center gap-2 mb-[155px]">
        <span className="text-[#9C9AA5] font-primary text-sm">
          Don’t have an account
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
        <span className="text-[#9C9AA5] font-primary text-xs max-w-[300px]">
          By signing up to create an account I accept Company’s
        </span>
        <span className="text-black font-secondary text-[10px] cursor-pointer">
          Terms of use and Privacy Policy
        </span>
      </div>
    </div>
  );
};

export default LoginComponent;
