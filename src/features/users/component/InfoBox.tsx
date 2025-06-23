"use client";
import Box from "@/components/ui/box";
import { infoData } from "../constant";
import { motion } from "framer-motion";

const InfoBox = () => {
  return (
    <div className="grid grid-cols-1 sm:grid sm:grid-cols-3 flex-wrap justify-center lg:justify-between items-center gap-4 w-full">
      {infoData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
        >
          <Box imgSrc={item.imgSrc} title={item.title} number={item.number} />
        </motion.div>
      ))}
    </div>
  );
};

export default InfoBox;
