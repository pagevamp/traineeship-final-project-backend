"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  InformationComponent,
  ShipmentDetailComponent,
  BillingDetailComponent,
} from "./form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const router = useRouter();
  return (
    <motion.div
      key="add-customer"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
    >
      <div className="p-4 bg-white rounded-3xl">
        <div
          className="flex items-center gap-4 w-fit cursor-pointer"
          onClick={() => router.back()}
        >
          <Icon
            icon="weui:back-filled"
            width="12"
            height="24"
            className="font-bold"
          />
          <p className="font-primary font-semibold tracking-wide text-lg">
            Add Customer
          </p>
        </div>
        <InformationComponent />
        <BillingDetailComponent />
        <ShipmentDetailComponent />
        <div className="flex items-center justify-center mt-4">
          <Button
            variant="default"
            className="w-fit px-10 rounded-full hover:bg-[#e06a1bff]"
          >
            Save
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
