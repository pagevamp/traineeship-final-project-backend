"use client";
import { useState } from "react";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import { useModal } from "@/hooks/useModal";
import { Icon } from "@iconify/react/dist/iconify.js";

const SliderModal = () => {
  const { closeModal } = useModal();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleContinue = () => {
    if (activeSlide < 1) {
      setActiveSlide((prev) => prev + 1);
    }
  };

  return (
    <div className="relative w-full">
      <div
        onClick={closeModal}
        className="absolute -top-2 -right-2 z-50 bg-white hover:bg-primary-light w-[45px] h-[45px] rounded-full text-2xl text-[#E06518] font-bold border-primary border cursor-pointer flex items-center justify-center"
      >
        <Icon icon="ic:baseline-close" width="24" height="24" />
      </div>
      <div className="overflow-hidden">
        {activeSlide === 0 && <SlideOne onContinue={handleContinue} />}
        {activeSlide === 1 && <SlideTwo onContinue={handleContinue} />}
      </div>

      <div className="flex justify-center gap-2 pb-6">
        {[0, 1].map((idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              activeSlide === idx ? "bg-[#E06518]" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderModal;
