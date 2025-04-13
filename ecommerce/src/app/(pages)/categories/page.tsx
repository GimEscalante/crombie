'use client';

import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import {
  Shirt,
  Dumbbell,
  Home,
  MonitorSmartphone,
  MousePointer,
} from 'lucide-react';

const CategoryPage = () => {
  const [categories, setCategories] = useState<string[]>([]);

  interface Category {
    id: string;
    name: string;
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      setCategories(data.map((cat: Category) => cat.name));
    };

    fetchCategories();
  }, []);

  const categoryIcons: Record<string, JSX.Element> = {
    moda: <Shirt className="w-12 h-12 text-blue-600" />,
    deportes: <Dumbbell className="w-12 h-12 text-blue-600" />,
    hogar: <Home className="w-12 h-12 text-blue-600" />,
    tecnologia: <MonitorSmartphone className="w-12 h-12 text-blue-600" />,
  };

  const defaultIcon = <MousePointer className="w-12 h-12 text-blue-600" />;

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-4">
        Categorías disponibles
      </h1>

      <p className="text-lg text-center text-gray-600 max-w-2xl mb-12">
        Te invitamos a recorrer nuestras categorías para encontrar el producto que mejor se adapte a tus necesidades.
        Ya sea que busques lo último en tecnología, ropa con estilo o equipamiento para tu hogar, ¡acá lo vas a encontrar!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/categories/${category.toLowerCase()}`}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform p-8 min-h-[200px] flex flex-col items-center justify-center text-center"
          >
            <div className="mb-4">
              {categoryIcons[category.toLowerCase()] || defaultIcon}
            </div>
            <h2 className="text-2xl font-semibold mb-2 capitalize">{category}</h2>
            <p className="text-base text-gray-500">
              Ver productos de {category.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
