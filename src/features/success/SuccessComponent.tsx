"use client";

import React from "react";
import Image from "next/image";
import Heading from "@/components/ui/Heading";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const SuccessComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const creditAccountNumber = searchParams?.get("creditAccountNumber");

  return (
    <div className="flex flex-col m-auto justify-center items-center px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 2xl:px-40 min-h-screen text-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
      >
        <Image
          src="/arctern-logo.svg"
          alt="Arctern Logo"
          width={142}
          height={81}
          className="mb-6"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
      >
        <Image
          src="/Verified.svg"
          alt="Verified Logo"
          width={140}
          height={140}
          className="mb-6"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
      >
        <Heading
          title="Account Request Submitted Successfully"
          description=""
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.4, ease: "easeOut" }}
      >
        <span className="font-secondary font-[300] text-[#9C9AA5] text-[14px] font-weight-400 sm:text-base block">
          Your Credit Account Number:{" "}
          <strong>{creditAccountNumber || "N/A"}</strong>
        </span>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.5, ease: "easeOut" }}
      >
        <span className="font-secondary text-[#9C9AA5] text-[14px] font-weight-400 sm:text-base mt-2 block">
          Status: <span className="text-[#FF811A]">In-active</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.6, ease: "easeOut" }}
      >
        <p className="font-secondary text-[#9C9AA5] text-[14px] font-[300] sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
          Your account is under internal review. Our Operations and Finance
          departments are verifying your submitted details and documents. You
          will receive updates at each step of the process. In the meantime,
          please check your email for a temporary password to log in.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.7, ease: "easeOut" }}
      >
        <button
          onClick={() => router.push("/login")}
          className="mt-12 w-[210px] h-[48px] rounded-lg text-white font-medium bg-gradient-to-b from-[#CF5406] to-[#FF811A] shadow-lg hover:brightness-110 transition"
          aria-label="Okay"
        >
          Okay
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessComponent;
