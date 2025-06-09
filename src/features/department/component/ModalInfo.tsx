"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { fields } from "../constant";
import { useModal } from "@/hooks/useModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import Modaldata from "./Modaldata";

const DepartmentForm = () => {
  const { closeModal } = useModal();
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="relative w-full">
      <div>
        <Modaldata />
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

export default DepartmentForm;
