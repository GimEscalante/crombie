"use client";

import { useEffect, useState } from "react";
import { Product } from "@prisma/client";

import Link from "next/link";
import AdminCard from "../../../../components/AdminCard";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    const confirmed = confirm("¿Seguro que querés eliminar este producto?");
    if (!confirmed) return;

    await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    setProducts(products.filter((p) => p.productId !== productId));
  };

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Panel de Administración</h1>
      <div className="flex justify-end mb-4">
        <Link
          href="/admin/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Crear Producto
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <AdminCard
            key={product.productId}
            product={product}
            onDelete={() => handleDelete(product.productId)}
          />
        ))}
      </div>
    </main>
  );
}

