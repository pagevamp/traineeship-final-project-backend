"use client";
import { useState } from "react";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import { useModal } from "@/hooks/useModal";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const SliderModal = () => {
  const { closeModal } = useModal();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleContinue = () => {
    if (activeSlide < 1) {
      setActiveSlide((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full p-8">
      <div
        onClick={closeModal}
        className="absolute top-2 right-2 sm:-top-2 sm:-right-2 z-50 bg-white hover:bg-primary-light size-8 sm:w-[45px] sm:h-[45px] rounded-full text-2xl text-[#E06518] font-bold border-primary border cursor-pointer flex items-center justify-center"
      >
        <Icon icon="ic:baseline-close" width="24" height="24" />
      </div>

      <div className="min-h-[50%] overflow-auto">
        <AnimatePresence mode="wait">
          {activeSlide === 0 && (
            <motion.div
              key="slide-one"
              initial={{ opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <SlideOne onContinue={handleContinue} />
            </motion.div>
          )}
          {activeSlide === 1 && (
            <motion.div
              key="slide-two"
              initial={{ opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <SlideTwo onContinue={handleContinue} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        key="slider-controls"
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center gap-2 mt-6">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeSlide === idx
                  ? "gradient-bg w-[24px] h-[8px]"
                  : idx === 1
                  ? "bg-[#FFC890]"
                  : "bg-[#FF6502]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SliderModal;
