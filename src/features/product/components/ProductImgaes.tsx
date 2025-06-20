"use client";
import Image from "next/image";
import React, { useState } from "react";
import { images } from "../constant";

const ProductImages = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div>
      <div className="flex flex-col gap-2 sm:mx-4">
        <div className="flex flex-col gap-2 w-fit">
          <div className="h-[300px] w-[300px] relative rounded overflow-hidden mb-2">
            <Image
              src={selectedImage}
              alt="Selected"
              layout="fill"
              objectFit="contain"
              className="rounded-[5px]"
            />
          </div>

          <div className="flex gap-2 w-[300px]">
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
    </div>
  );
};

export default ProductImages;
