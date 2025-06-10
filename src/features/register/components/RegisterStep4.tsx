import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const Register4 = () => {
  return (
    <motion.div
      className="text-[16px] w-full px-3 mt-[10px]"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      <div className="flex justify-end mb-[26px]">
        <Button
          variant="outline"
          className="flex items-center text-primary border border-primary hover:text-primary hover:bg-primary-light gap-2 h-[40px]"
        >
          Add
          <Image src="/plus.svg" alt="plus" width={24} height={24} />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-[18px] gap-x-[10px] mb-8">
        <div className="flex flex-col gap-2">
          <Input
            id="ref-name-1"
            name="ref-name-1"
            labelName="Reference Name"
            placeholder="Enter Reference Name"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="assoc-1"
            name="assoc-1"
            labelName="Business Association"
            placeholder="Enter Business Association"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="email-1"
            name="email-1"
            labelName="Email Id"
            placeholder="Enter Email Id"
            type="email"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="phone-1"
            name="phone-1"
            labelName="Phone Number"
            placeholder="Enter Phone Number"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="ref-name-2"
            name="ref-name-2"
            labelName="Reference Name"
            placeholder="Enter Reference Name"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="assoc-2"
            name="assoc-2"
            labelName="Business Association"
            placeholder="Enter Business Association"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="email-2"
            name="email-2"
            labelName="Email Id"
            placeholder="Enter Email Id"
            type="email"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            id="phone-2"
            name="phone-2"
            labelName="Phone Number"
            placeholder="Enter Phone Number"
            type="text"
            required
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Register4;
