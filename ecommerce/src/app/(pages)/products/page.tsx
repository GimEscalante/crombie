"use client";

import React from "react";
import {Product} from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Card from "../../../../components/Card";
import SyncUser from "../../../../components/SyncUser";

export default function Products() {
  const { user } = useUser();
  const userId =
    typeof user?.publicMetadata?.userId === "string" &&
    user.publicMetadata.userId.length > 0
      ? user.publicMetadata.userId
      : null;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`/api/products?page=${page}&limit=4&search=${search}`)
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
    <main className="min-h-screen bg-gray-100 text-gray-800 px-6 py-12">
      <SyncUser />
      <section className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4 sm:mb-0">
            Nuestros productos
          </h1>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
              onAddToCart={() => console.log("Agregar al carrito:", product.name)}
              userId={userId ?? null}
            />
          ))}
        </div>

        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-lg border shadow-sm transition-all ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            Anterior
          </button>

          <span className="text-lg font-medium">
            Página <strong>{page}</strong> de <strong>{totalPages}</strong>
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-lg border shadow-sm transition-all ${
              page === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            Siguiente
          </button>
        </div>
      </section>
    </main>
  );
}
