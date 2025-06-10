import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const Register3 = () => {
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
          className="flex items-center gap-2 h-[40px] text-primary border border-primary hover:bg-primary-light hover:text-primary"
        >
          Add
          <Image src="/plus.svg" alt="plus" width={24} height={24} />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[18px] gap-x-[10px] mb-8">
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="company-type"
            name="company-type"
            labelName="Company Type"
            placeholder="Enter Company Type"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="director-email"
            name="director-email"
            labelName="Email Id"
            placeholder="Enter Email Id"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="director-phone-no"
            name="director-phone-no"
            labelName="Phone Number"
            placeholder="Enter Phone Number"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="company-type-2"
            name="company-type-2"
            labelName="Company Type"
            placeholder="Enter Company Type"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="director-email-2"
            name="director-email-2"
            labelName="Email Id"
            placeholder="Enter Email Id"
            type="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="director-phone-no-2"
            name="director-phone-no-2"
            labelName="Phone Number"
            placeholder="Enter Phone Number"
            type="text"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-[22px]">
        <h3 className="text-center font-primary text-xl">
          Finance Manager Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10px]">
          <div className="flex flex-col gap-2">
            <Input
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
              id="company-type-2"
              name="company-type-2"
              labelName="Company Type"
              placeholder="Enter Company Type"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
              id="director-email-2"
              name="director-email-2"
              labelName="Email Id"
              placeholder="Enter Email Id"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
              id="director-phone-no-2"
              name="director-phone-no-2"
              labelName="Phone Number"
              placeholder="Enter Phone Number"
              type="text"
              required
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register3;
