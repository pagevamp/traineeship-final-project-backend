import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
const Register7 = () => {
  return (
    <motion.div
      className="text-[16px] w-full sm:max-w-screen-lg mx-auto px-4 mt-2"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      <div className="flex justify-end mb-6 gap-2">
        <Button
          variant="outline"
          className="flex items-center h-[40px] gap-2 text-primary hover:text-primary border border-primary hover:bg-primary-light"
        >
          Add <Image src="/plus.svg" alt="plus" width={24} height={24} />
        </Button>
        <div className="border border-[#D55B09] rounded-[7px] h-[40px] w-[40px] flex items-center justify-center">
          <Image src="PaperClip.svg" alt="paperclip" width={26} height={26} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="bank-name"
            name="bank-name"
            labelName="H S Code"
            placeholder="Enter H S Code"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Input
            className="w-full py-2 px-4 placeholder:text-xs placeholder:text-[#9C9AA5] h-12"
            id="bank-name"
            name="bank-name"
            labelName="Commodity Name"
            placeholder="Enter Commodity Name"
            type="text"
            required
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Register7;
