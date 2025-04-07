"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CategoryPage = () => {
  const [categories, setCategories] = useState<string[]>([]);

  interface Category {
    id: string;
    name: string;
  }
  
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.categories.map((cat: Category) => cat.name));
    };
  
    fetchCategories();
  }, []);
  

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen max-w-5xl mx-auto px-4 py-10">
      <h1 className="absolute top-10 text-3xl font-extrabold text-center">
        Categorías disponibles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-24">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/categories/${category.toLowerCase()}`}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all p-8 min-h-[180px] flex flex-col items-center justify-center text-center"
          >
            <div className="text-5xl mb-4">🛍️</div>
            <h2 className="text-2xl font-semibold mb-2">{category}</h2>
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
