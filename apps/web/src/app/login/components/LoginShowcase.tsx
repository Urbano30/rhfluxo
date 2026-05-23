"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const showcaseImages = [
  "/2-home_full.png",
  "/2-home_g_full.png",
  "/3-design_pagamentos_full_detalhes.png",
];

export function LoginShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative flex flex-col pl-16 pr-8 pt-16 pb-6 bg-transparent">
      {/* Background blobs for gradient effect */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/60 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-white/60 rounded-full blur-[80px]"></div>

      <div className="max-w-2xl z-10 mb-4 relative pl-4">
        <h2 className="text-[2.75rem] font-bold text-slate-800 leading-[1.15]">
          Gestão de pessoas
          <br />
          simples, completa e eficiente
        </h2>
      </div>

      {/* Dashboard Preview inside a container that gets clipped */}
      {/* Centralized with smaller bottom margin */}
      <div className="relative flex-1 w-full mt-4 flex justify-center items-center z-10 mb-2">
        <div className="relative w-[95%] max-w-[1200px] h-full min-h-[300px]">
          {showcaseImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Dashboard Preview ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1000px"
              className={cn(
                "object-contain transition-opacity duration-1000 ease-in-out",
                index === currentIndex ? "opacity-100" : "opacity-0",
              )}
              priority={index === 0}
            />
          ))}
        </div>
      </div>

      {/* Carousel dots */}
      <div className="w-full flex justify-center items-center gap-3 mt-4 mb-2 z-10">
        {showcaseImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentIndex ? "bg-[#008fb3] w-6" : "bg-[#c6d7e2]",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
