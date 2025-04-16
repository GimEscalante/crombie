"use client";

import React from "react";
import {Product} from "@prisma/client";
//import { useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Card from "../../../../components/Card";


export default function Products() {
  //const { user } = useUser();
  // const userId = typeof user?.publicMetadata?.userId === "string" &&
  //   user.publicMetadata.userId.length > 0
  //     ? user.publicMetadata.userId
  //     : null;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`/api/products?page=${page}&limit=6&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      });

    const queryParams = new URLSearchParams();
    queryParams.set("page", page.toString());

    if (search) {
      queryParams.set("search", search);
    }

    router.push(`/products?${queryParams.toString()}`, { scroll: false });
  }, [page, search, router]);

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1A233A] px-6 py-12">
      
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-[#2d3c5e] mb-4 tracking-wide">
            TODOS LOS PLATILLOS
            <div className="w-24 h-1 bg-[#e67422] mx-auto mb-6 mt-2"></div>
          </h1>
          
          <input
            type="text"
            placeholder="Buscar platillos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-[#D1D5DB] rounded-full w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E07A5F] transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <Card
              key={product.productId}
              productId={product.productId}
              title={product.name}
              description={product.description}
              price={product.price}
              image={product.image || "/images/product.jpg"}
              linkToProduct={`/products/${product.productId}`}
              
            />
          ))}
        </div>

        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-full border border-[#D1D5DB] shadow-sm transition-all ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-[#4A5568] hover:bg-[#E07A5F] hover:text-[#FFF8F0]"
            }`}
          >
            Anterior
          </button>

          <span className="text-lg font-medium text-[#4A5568]">
            Página <strong>{page}</strong> de <strong>{totalPages}</strong>
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-full border border-[#D1D5DB] shadow-sm transition-all ${
              page === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-[#4A5568] hover:bg-[#E07A5F] hover:text-[#FFF8F0]"
            }`}
          >
            Siguiente
          </button>
        </div>
      </section>
    </main>
  );
}
