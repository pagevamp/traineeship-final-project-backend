"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const InventoryImages = ({ imagesList }: { imagesList: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(imagesList[0]);
  const [api, setApi] = React.useState<CarouselApi>();
  const [thumbApi, setThumbApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay configuration
  const AUTOPLAY_DELAY = 5000; // 5 seconds

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      const newCurrent = api.selectedScrollSnap();
      setCurrent(newCurrent);

      // Sync thumbnail carousel when main carousel changes
      if (thumbApi) {
        // For infinite carousel, we need to map the current index to the actual image index
        const actualIndex = newCurrent % imagesList.length;
        thumbApi.scrollTo(actualIndex);
      }
    });
  }, [api, thumbApi, imagesList.length]);

  // Autoplay functionality with infinite loop
  useEffect(() => {
    if (!api || !isPlaying) return;

    const startAutoplay = () => {
      intervalRef.current = setInterval(() => {
        // For infinite carousel, we can simply call scrollNext
        api.scrollNext();
      }, AUTOPLAY_DELAY);
    };

    startAutoplay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api, isPlaying]);

  // Stop autoplay on user interaction
  const handleUserInteraction = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Resume autoplay after 5 seconds of no interaction
    setTimeout(() => {
      setIsPlaying(true);
    }, 5000);
  };

  const handleThumbClick = React.useCallback(
    (index: number) => {
      handleUserInteraction();
      api?.scrollTo(index);
    },
    [api]
  );

  const handleNavClick = () => {
    handleUserInteraction();
  };

  // Get the actual image index for thumbnail highlighting
  const getActualImageIndex = (carouselIndex: number) => {
    return carouselIndex % imagesList.length;
  };

  return (
    <div>
      {/* Main carousel */}
      <div className="w-full">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true, // Enable infinite loop
          }}
        >
          <CarouselContent>
            {imagesList?.map((img, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden">
                  <CardContent className="w-full aspect-square items-center justify-center p-0 overflow-hidden">
                    <div className="w-full aspect-square relative rounded overflow-hidden">
                      <Image
                        src={img}
                        alt="Selected"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Thumbnail carousel */}
        <Carousel setApi={setThumbApi} className="mt-4 w-full max-w-xs">
          <CarouselContent className="flex my-1">
            {imagesList?.map((img, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  "basis-1/3 cursor-pointer",
                  getActualImageIndex(current) === index
                    ? "opacity-100 "
                    : "opacity-50"
                )}
                onClick={() => handleThumbClick(index)}
              >
                <Card className="overflow-hidden rounded-3xl">
                  <CardContent
                    className={cn(
                      "relative p-0 w-full aspect-square items-center justify-center overflow-hidden rounded-3xl",
                      getActualImageIndex(current) === index
                        ? "border-2 border-primary shadow-xl"
                        : ""
                    )}
                  >
                    <div
                      key={index}
                      className={`w-full aspect-square relative cursor-pointer overflow-hidden rounded-3xl`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover rounded-3xl"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default InventoryImages;
