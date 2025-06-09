"use client";
import Box from "@/components/ui/box";
import { infoData } from "./constant";
import { motion } from "framer-motion";

const InfoBox = () => {
  return (
    <div className="grid sm:grid-cols-4 flex-wrap justify-center lg:justify-between items-center gap-6 w-full px-4 md:px-0">
      {infoData.map((item, index) => (
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

export default InfoBox;
