"use client";

import React from "react";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import { useRouter } from "next/navigation";

const SuccessComponent = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-40 min-h-screen pt-[5rem] pb-[4rem] text-center">
      <Image
        src="/arctern-logo.svg"
        alt="Arctern Logo"
        width={142}
        height={81}
        className="mb-20"
        priority
      />

      <Image
        src="/Verified.svg"
        alt="Verified Logo"
        width={180}
        height={180}
        className="mb-9"
        priority
      />

      <Heading title="Account Request Submitted Successfully" description="" />

      <span className="font-primary text-[#9C9AA5] text-[14px] font-weight-400 sm:text-lg mt-6 block">
        Your Credit Account Number: <strong>ABC12316</strong>
      </span>

      <span className="font-secondary text-[#9C9AA5] text-[14px] font-weight-400 sm:text-lg mt-2 block">
        Status: <span className="text-[#FF811A]">In-active</span>
      </span>

      <p className="font-secondary text-[#9C9AA5] text-[14px] font-weight-400 sm:text-base mt-5 max-w-xl mx-auto leading-relaxed">
        Your account is under internal review. Our Operations and Finance
        departments are verifying your submitted details and documents. You will
        receive updates at each step of the process.
      </p>

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-12 w-[210px] h-[48px] rounded-lg text-white font-medium bg-gradient-to-b from-[#CF5406] to-[#FF811A] shadow-lg hover:brightness-110 transition"
        aria-label="Okay"
      >
        Okay
      </button>
    </div>
  );
};

export default SuccessComponent;
