'use client';

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
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      setCategories(data.map((cat: Category) => cat.name));
    };

    fetchCategories();
  }, []);

  const categoryImages: { [key: string]: string } = {
    "comida japonesa": "/images/banderas/japon.png",
    "comida china": "/images/banderas/china.png",
    "comida coreana": "/images/banderas/corea.png",
    "comida tailandesa": "/images/banderas/thai.png",
  };
  
  

  return (
    <div className="min-h-screen bg-[#f8f3e9] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[#2d3c5e] mb-4 tracking-wide">
            NUESTRAS ESPECIALIDADES
          </h1>
          <div className="w-24 h-1 bg-[#e67422] mx-auto mb-6"></div>
          <p className="text-lg text-[#2d3c5e]/80 font-light max-w-2xl mx-auto">
            Descubre nuestra selección de auténticas cocinas asiáticas, cada una con su tradición y sabores únicos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/categories/${category.toLowerCase()}`}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform p-8 min-h-[200px] flex flex-col items-center justify-center text-center"
          >
            <div className="mb-4">
              <img
                src={categoryImages[category.toLowerCase()]}
                alt={`Bandera de ${category}`}
                className="w-16 h-16 object-cover"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2d3c5e] mb-4 tracking-wide">{category}</h2>
            <p className="text-lg text-[#e67422] font-light max-w-1xl mx-auto">
              Ver productos de {category.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  </div>

  );
};

export default CategoryPage;