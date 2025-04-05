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
    <div className="flex flex-col">
      <h1 className="font-extrabold">Categorías disponibles</h1>
      {categories.map((category) => (
        <div key={category}>
          <Link
            href={`/categories/${category}`}
            className="my-5 hover:font-semibold"
          >
            {category.toUpperCase()}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
