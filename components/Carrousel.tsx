"use client";

import Image from "next/image";
import Link from "next/link";


const images = [
  "/images/products/japonesa/sushi.jpg",
  "/images/products/china/dumpling.jpg",
  "/images/products/coreana/tteokbokki.jpg",
  "/images/products/thai/padthai.jpg",
  
];

export default function Carrousel() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f3e9]">
      <main className="flex-grow">
        <div className="carousel w-full h-screen relative">
      
        {images.map((src, index) => {
        const slideId = `slide${index + 1}`;
        const prevSlide = `#slide${(index - 1 + images.length) % images.length + 1}`;
        const nextSlide = `#slide${(index + 1) % images.length + 1}`;

          return (
            <div
            key={slideId}
            id={slideId}
            className="carousel-item relative w-full h-screen"
            >
              <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              />
            
              <div className="absolute inset-0 bg-[#f8f3e9]/70 z-20" />
            
              <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2 z-40">
                <a 
                href={prevSlide} 
                className="btn h-12 w-12 rounded-full border-2 border-[#2d3c5e] bg-[#f8f3e9]/80 hover:bg-[#f8f3e9] text-[#2d3c5e] flex items-center justify-center"
                >
                ❮
                </a>
                <a 
                href={nextSlide} 
                className="btn h-12 w-12 rounded-full border-2 border-[#2d3c5e] bg-[#f8f3e9]/80 hover:bg-[#f8f3e9] text-[#2d3c5e] flex items-center justify-center"
                >
                ❯
                </a>
              </div>
            </div>
          );
      })}
      
      
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <h1 className="text-5xl md:text-6xl text-[#2d3c5e] font-serif tracking-wider">
          TASTE THE TRADITION
          </h1>
          <h2 className="text-4xl md:text-5xl text-[#2d3c5e] font-serif mt-2 tracking-wider">
          OF ASIA
          </h2>
          <p className="mt-6 text-lg md:text-xl text-[#2d3c5e] font-light max-w-xl">
          La experiencia culinaria que combina tradición y sabores únicos para deleitar tus sentidos
          </p>
          
          <Link
            href="/categories"
            className="mt-8 bg-[#e67422] text-white px-8 py-3 rounded font-medium hover:bg-[#d15e0c] transition-all pointer-events-auto"
          >
            PEDIR AHORA
          </Link>
        </div>
      </div>
      </main>
  </div>
  );
};