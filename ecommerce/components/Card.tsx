import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Heart } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  linkToProduct: string;
}

export default function Card({
  title,
  description,
  price,
  image,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  linkToProduct,
}: CardProps) {
  return (
    <div className="w-80 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
          unoptimized
        />
        <button
          onClick={onToggleFavorite}
          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-1">{title}</h2>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <p className="text-blue-600 font-bold text-lg">${price}</p>

        {/* NUEVA sección de botones */}
        <div className="flex justify-between gap-2 mt-2">
          <Link
            href={linkToProduct}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Ver más
          </Link>
          <button
            onClick={onAddToCart}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
