"use client";
import { useState, useMemo } from "react";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import { useModal } from "@/hooks/useModal";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userCreationValidationSchema } from "../validation";

const slideVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, y: 0 },
};

const SliderModal = () => {
  const { closeModal } = useModal();
  const [activeSlide, setActiveSlide] = useState(0);

  const {
    register,
    watch,
    setValue,
    trigger,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userCreationValidationSchema),
  });

  const handleContinue = () => {
    setActiveSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const sliderProps = {
    register,
    control,
    setValue,
    watch,
    trigger,
    errors,
  };

  const slides = useMemo(
    () => [
      <SlideOne key="slide-1" {...sliderProps} />,
      <SlideTwo key="slide-2" {...sliderProps} />,
    ],
    []
  );

  return (
    <>
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 sm:-top-2 sm:-right-2 z-50 bg-white hover:bg-primary-light size-8 sm:w-[45px] sm:h-[45px] rounded-full text-2xl text-[#E06518] font-bold border-primary border cursor-pointer flex items-center justify-center"
        aria-label="Close modal"
      >
        <Icon icon="ic:baseline-close" width="24" height="24" />
      </button>

      {/* Modal Content */}
      <div className="w-full p-8 overflown-auto max-h-[90vh] rounded-sm sm:rounded-[39px]">
        <div className="p-2 h-[100%] overflow-y-scroll">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              {slides[activeSlide]}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-[28px]">
            <Button
              variant={"default"}
              onClick={handleContinue}
              className="w-[191px] h-[40px] rounded-[10px] text-white font-medium text-[14px]"
              style={{
                background: "linear-gradient(90deg, #E06518 0%, #E3802A 100%)",
              }}
            >
              {`${activeSlide === slides.length - 1 ? "Create" : "Continue"}`}
            </Button>
          </div>

          {/* Slider Dots */}
          <motion.div
            key="slider-controls"
            initial={{ opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-2 mt-6">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
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
      </div>
    </>
  );
};

export default SliderModal;
