"use client";

import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminCard from "../../../../components/AdminCard";
import { useUser } from "@clerk/nextjs";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    // Verificar si el usuario está autenticado con Clerk
    if (isLoaded) {
      if (!isSignedIn) {
        router.push("/sign-in"); // Redirigir al sign-in si no está autenticado
        return;
      }
      
      // Si está autenticado, cargar los productos
      fetchProducts();
    }
  }, [isLoaded, isSignedIn, router]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products?limit=100"); 
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      
      const data = await res.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("No se pudieron cargar los productos. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.categoryId && product.categoryId.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleDelete = async (productId: string) => {
    const confirmed = confirm("¿Seguro que querés eliminar este producto?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      setProducts(products.filter((p) => p.productId !== productId));
      setFilteredProducts(filteredProducts.filter((p) => p.productId !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("No se pudo eliminar el producto. Por favor, intenta nuevamente.");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Cargando...</p>
      </div>
    );
  }

  if (isLoaded && !isSignedIn) {
    return null;
  }
  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-serif text-[#1A233A] text-center mb-6">PANEL DE ADMINISTRACION:</h1>
      <div className="w-24 h-1 bg-[#e67422] mx-auto mb-6"></div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full sm:w-2/3">
          <input
            type="text"
            placeholder="Buscar productos por nombre, descripción o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <Link
          href="/admin/create"
          className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-center"
        >
          + Crear Producto
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-lg">Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => fetchProducts()} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg">No se encontraron productos{searchTerm ? " con ese término de búsqueda" : ""}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <AdminCard
              key={product.productId}
              product={product}
              onDelete={() => handleDelete(product.productId)}
            />
          ))}
        </div>
      )}
      
      <div className="mt-6 text-center text-gray-700">
        <p>Total de productos: {products.length}</p>
        {searchTerm && (
          <p>Resultados de búsqueda: {filteredProducts.length}</p>
        )}
      </div>
    </main>
  );
}