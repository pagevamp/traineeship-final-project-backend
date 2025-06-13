"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BankDetails from "@/features/customer/component/BankDetails";
import Director from "@/features/customer/component/Director";
import Documents from "@/features/customer/component/Document";
import FinanceManager from "@/features/customer/component/FinanceManger";
import Referral from "@/features/customer/component/referral";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import VehicleOwnership from "./VehicleOwnership";
import VehicleClassification from "./VehicleClassification";
import VehicleRegistration from "./VehicleRegistration";
import VehicleMaintenance from "./VehicleMaintainance";
import VehicleSystem from "./VehicleSystem";

const accordionData = [
  {
    title: "Vehicle Ownership",
    content: <VehicleOwnership />,
  },
  {
    title: "Vehicle Classification & Capabilities",
    content: <VehicleClassification />,
  },
  {
    title: " Registration and Compliance",
    content: <VehicleRegistration />,
  },
  {
    title: " Maintenance & Tracking",
    content: <VehicleMaintenance />,
  },
  {
    title: "System & Meta Information",
    content: <VehicleSystem />,
  },
];

const VehicleInfoBar = () => {
  return (
    <div
      className="
        flex flex-col justify-center items-center
        w-full
        max-w-full
        sm:max-w-[750px]
        lg:max-w-none
        mx-0
      "
    >
      {accordionData.map((item, index) => (
        <motion.div
          key={index}
          className="w-full"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}

          // transition={{ duration: 0.2, delay: index * 0.1, ease: "easeOut" }}
        >
          <Accordion
            type="single"
            collapsible
            className={cn(
              "bg-white rounded-[20px] w-full",
              index !== 0 ? "mt-4" : ""
            )}
          >
            <AccordionItem value={`item-${index}`} className="w-full">
              <AccordionTrigger className="w-full font-primary text-[14px] sm:text-[16px] text-[#232323] p-4">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="w-full text-[#232323] px-4 pt-2 pb-4 text-[12px] sm:text-[14px]">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      ))}
    </div>
  );
};

export default VehicleInfoBar;
