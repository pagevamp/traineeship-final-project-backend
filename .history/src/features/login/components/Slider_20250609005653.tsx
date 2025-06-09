"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const slides = [
  {
    image: "/Slider1.jpg",
    heading: "Welcome to Arctern",
    subheading: "Your Gateway to Effortless Management.",
    bottomText: "Seamless Collaboration",
    description:
      "Real-time transport operations. Complete control over FTL, LTL, and PTL.",
  },
  {
    image: "/Slider2.jpg",
    heading: "Smarter Logistics, Smarter You",
    subheading: "Empowering businesses with intelligent solutions.",
    bottomText: "Optimized Efficiency",
    description: "From dispatch to delivery — stay in control at every step.",
  },
];

const ImageSlider = () => {
  return (
    <div className="w-[610px] h-max-screen rounded-[20px] overflow-hidden relative hidden md:block">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={`Slide ${idx}`}
                className="w-full h-full object-cover"
                width={610}
                height={850}
              />

              <div
                className="absolute inset-0"
                style={{ backgroundColor: "#540F8630" }}
              >
                <div className="flex flex-col justify-between items-center text-center h-full p-10 text-white">
                  <div className="mt-10">
                    <h1 className="font-primary text-[40px]">
                      {slide.heading}
                    </h1>
                    <p className="font-secondary text-[22px] mt-2">
                      {slide.subheading}
                    </p>
                  </div>
                  <div className="mb-16">
                    <h2 className="font-primary text-[40px]">
                      {slide.bottomText}
                    </h2>
                    <p className="font-secondary text-[22px] mt-1">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .swiper-pagination-bullet {
          background-color: white;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background-color: #f97316; /* orange-500 */
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;
