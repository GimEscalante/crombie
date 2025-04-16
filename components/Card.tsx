"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
//import { AddToCartButton } from "./AddToCartButton";
import { useUser } from "@clerk/nextjs";

interface CardProps {
  productId: string;
  title: string;
  description: string;
  price: number;
  image: string;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  linkToProduct: string;
}

export default function Card({
  // productId,
  title,
  description,
  price,
  image,
  onToggleFavorite,
  isFavorite,
  linkToProduct,
}: CardProps) {
  const { isSignedIn } = useUser();

  return (
    <div className="w-80 rounded-xl overflow-hidden shadow-md bg-[#FFF8F0] transition-transform hover:scale-105 border border-[#F0E6D2]">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
          unoptimized
        />
        {isSignedIn && (
          <button
            onClick={onToggleFavorite}
            className="absolute top-2 right-2 bg-[#FFF8F0] rounded-full p-1 shadow-sm"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
          </button>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1 text-[#1A233A]">{title}</h2>
        <p className="text-gray-500 text-sm mb-2">{description}</p>
        <p className="text-[#2d3c5e] font-bold text-lg">${price.toFixed(2)}</p>
        <div className="flex justify-between gap-2 mt-3">
          <Link
            href={linkToProduct}
            className="bg-[#E07A5F] text-[#FFF8F0] px-3 py-1 rounded hover:bg-[#D06045] text-sm font-medium transition-colors"
          >
            Ver más
          </Link>
          {/* <AddToCartButton productId={productId} /> */}
        </div>
      </div>
    </div>
  );
}
