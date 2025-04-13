"use client";

import Image from "next/image";

const images = [
  "/images/carrousel/carrousel-1.jpg",
  "/images/carrousel/carrousel-2.jpg",
  "/images/carrousel/carrousel-3.jpg",
  "/images/carrousel/carrousel-4.jpg",
  "/images/carrousel/carrousel-5.jpg",
];

export default function Carrousel() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="carousel w-full h-screen">
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
                <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2">
                  <a href={prevSlide} className="btn btn-circle bg-white/70 hover:bg-white">
                    ❮
                  </a>
                  <a href={nextSlide} className="btn btn-circle bg-white/70 hover:bg-white">
                    ❯
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
