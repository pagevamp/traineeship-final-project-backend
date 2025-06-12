"use client";
import Box from "@/components/ui/box";
import { motion } from "framer-motion";
import { vendorInfoData } from "../constant";

const VendorInfoBox = () => {
  return (
    <div className="grid grid-cols-1 sm:grid sm:grid-cols-3 flex-wrap justify-center lg:justify-between items-center gap-4 w-full">
      {vendorInfoData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.3, ease: "easeOut" }}
        >
          <Box imgSrc={item.imgSrc} title={item.title} number={item.number} />
        </motion.div>
      ))}
    </div>
  );
};

export default VendorInfoBox;
