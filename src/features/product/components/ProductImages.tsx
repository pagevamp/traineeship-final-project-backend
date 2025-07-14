"use client";
import Image from "next/image";
import React, { useState } from "react";
import { images } from "../constant";

const ProductImages = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      <div className="flex flex-col gap-4 items-center lg:items-start">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[300px] aspect-square relative rounded overflow-hidden">
          <Image
            src={selectedImage}
            alt="Selected"
            layout="fill"
            objectFit="contain"
            className="rounded-[5px]"
            priority
          />
        </div>

        <div className="flex flex-wrap justify-center lg:justify-start gap-3 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[300px]">
          {images.map((img, index) => (
            <div
              key={index}
              className={`w-20 h-20 relative cursor-pointer border-2 rounded ${
                img === selectedImage
                  ? "border-[#FF6502]"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-[5px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
