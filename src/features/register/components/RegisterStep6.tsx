import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
const Register6 = () => {
  return (
    <motion.div
      className="text-[16px] min-w-[320px] max-w-screen-2xl mx-auto px-4 flex flex-col gap-6 md:flex-col md:place-items-center md:gap-[21px] mt-2 mb-1"
      initial={{ x: 50, opacity: 0.1 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      <div className="relative mb-2 w-[163px] h-[163px] mx-auto">
        <Image
          src="Ellipse 1.svg"
          alt="ellipse"
          fill
          className="absolute inset-0 m-auto"
          style={{ objectFit: "contain" }}
        />
        <Image
          src="Work.svg"
          alt="work"
          width={50}
          height={50}
          className="absolute inset-0 m-auto"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px]">
        <div className="flex flex-col gap-2 flex-1 w-full">
          <div className="w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 px-6 rounded-md shadow-sm ">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              Trade License
            </span>
          </div>
        </div>

        <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />

        <div className="flex flex-col gap-2 flex-1 w-full">
          <div className="w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 px-3 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              Vat certificate
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px]">
        <div className="flex flex-col gap-2 flex-1 w-full">
          <div className="w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 px-3 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              Passport copy
            </span>
          </div>
        </div>

        <div className="hidden md:block w-[1px] h-[62px] bg-[#DFDFDF]" />

        <div className="flex flex-col gap-2 flex-1 w-full">
          <div className="w-[209px] h-[48px]  border border-muted-light bg-white flex items-center justify-center gap-2 px-3 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              Emirates ID
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-[24px]">
        <div className="flex flex-col gap-2 flex-1 w-full">
          <div className="w-[209px] h-[48px]  border border-muted-light bg-white flex items-center justify-center gap-2 px-3 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">
              Security Cheque
            </span>
          </div>
        </div>

        <div className="hidden md:block bg-[#DFDFDF] w-[1px] h-[62px]" />

        <div className="flex flex-col gap-2 flex-1 w-full">
          <div className="w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 px-3 rounded-md shadow-sm">
            <Image
              src="/Upload.svg"
              alt="Company Logo"
              className="w-6 h-6 object-contain"
              width={20}
              height={20}
            />
            <span className="text-sm font-medium text-[#1E1E1E]">Contract</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col  items-center gap-2 flex-1 w-full ">
        <div className="w-[209px] h-[48px] border border-muted-light bg-white flex items-center justify-center gap-2 rounded-md shadow-sm ">
          <Image
            src="/Upload.svg"
            alt="Company Logo"
            className="w-6 h-6 object-contain"
            width={20}
            height={20}
          />
          <span className="text-sm  font-medium text-[#1E1E1E]">Others</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Register6;
