"use client";
import Box from "@/components/ui/box";
import { motion } from "framer-motion";
import { infoData } from "../constant";

const ShipmentInfoBox = () => {
  return (
    <div className="grid grid-cols-1 sm:grid sm:grid-cols-4 flex-wrap justify-center lg:justify-between items-center gap-4 w-full">
      {infoData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
          className="w-full"
        >
          <Box imgSrc={item.imgSrc} title={item.title} number={item.number} />
        </motion.div>
      ))}
    </div>
  );
};

export default ShipmentInfoBox;
