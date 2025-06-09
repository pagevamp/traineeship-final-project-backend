"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import LazyImage from "@/components/lazy-image";

interface Product {
  id: string;
  name: string;
  sizes: string[];
  image: string;
  price?: number;
}

interface LazyProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: LazyProductCardProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "50px",
  });

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${
        hasIntersected
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95"
      }`}
      style={{
        transitionDelay: hasIntersected ? `${index * 100}ms` : "0ms",
      }}
    >
      {hasIntersected && (
        <Card className="group cursor-pointer overflow-hidden border bg-white shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]">
          <CardContent className="p-0">
            {/* Image Container with 4:5 aspect ratio */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
              <LazyImage
                src={product.image}
                alt={product.name}
                className="transition-transform duration-500 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Overlay effect on hover */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Product Information */}
            <div className="p-4 space-y-3 transition-all duration-300 group-hover:bg-gray-50/50">
              <h3 className="font-medium text-gray-900 line-clamp-2 font-primary transition-colors duration-200 group-hover:text-gray-800">
                {product.name}
              </h3>

              <div className="space-y-2">
                <p className="text-sm font-secondary text-gray-500 transition-colors duration-200 group-hover:text-gray-600">
                  Available Sizes:
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, sizeIndex) => (
                    <Badge
                      key={sizeIndex}
                      variant="outline"
                      className="bg-gray-50 font-secondary font-[300] text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:scale-105 hover:shadow-sm"
                      style={{
                        animationDelay: hasIntersected
                          ? `${index * 100 + sizeIndex * 50}ms`
                          : "0ms",
                      }}
                    >
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>

              {product.price && (
                <p className="text-lg font-primary font-medium text-gray-900 pt-1 transition-all duration-200 group-hover:text-primary group-hover:scale-105">
                  ${product.price}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
