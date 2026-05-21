"use client";

import Image from "next/image";
import { Users } from "lucide-react";
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

      {/* Dashed line decoration */}
      <svg
        className="absolute left-12 top-[130px] w-32 h-32 -z-10 opacity-20"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M 10 10 Q 50 10 50 50 T 90 90"
          stroke="#4ea5b9"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>

      <div className="max-w-2xl z-10 mb-8 relative pl-4">
        <div className="flex items-center mb-6 relative">
          {/* Dashed line trailing to the icon */}
          <div className="absolute -left-[100px] top-1/2 w-[100px] border-t-2 border-dashed border-[#4ea5b9] opacity-30"></div>

          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md z-10">
            <Users className="w-8 h-8 text-[#4ea5b9]" />
          </div>
        </div>

        <h2 className="text-[2.75rem] font-bold text-slate-800 leading-[1.15] mb-4">
          Gestão de pessoas
          <br />
          simples, completa e eficiente
        </h2>
        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
          O RHFluxo conecta pessoas, processos e<br />
          informações em um só lugar.
        </p>
      </div>

      {/* Dashboard Preview inside a container that gets clipped */}
      {/* Centralized with smaller bottom margin */}
      <div className="relative flex-1 w-full mt-4 flex justify-center items-end z-10 mb-2">
        <div className="relative w-[90%] max-w-[1100px] h-full min-h-[300px] bg-white rounded-t-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100/50">
          {showcaseImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Dashboard Preview ${index + 1}`}
              fill
              className={cn(
                "object-cover object-top transition-opacity duration-1000 ease-in-out",
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
