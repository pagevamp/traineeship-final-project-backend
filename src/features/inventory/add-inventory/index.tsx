"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Resolver, useForm } from "react-hook-form";
import { AddInventorySchema } from "../validation";
import { ProductVariations, InventoryInformation } from "./form";

const Index = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddInventorySchema) as Resolver<any>,
  });
  const [content, setContent] = useState(watch("content") ?? "");

  const inventoryProps = {
    control,
    setValue,
    content,
    setContent,
  };
  return (
    <motion.div
      key="add-inventory"
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
    >
      <div className="rounded-3xl">
        <div className="flex items-center justify-between mb-4">
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
              Add Product
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              className="w-fit px-6 rounded-full border-none"
            >
              Save as Draft
            </Button>
            <Button
              variant="default"
              className="w-fit px-10 rounded-full hover:opacity-80 hover:bg-primary"
            >
              Publish
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl">
          <InventoryInformation {...inventoryProps} />
          <ProductVariations />
        </div>
      </div>
    </motion.div>
  );
};

export default Index;
