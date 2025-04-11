"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Category, Product } from "@prisma/client";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.productID as string;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("Product ID:", productId);
  
      const resProduct = await fetch(`/api/products/${productId}`);
      console.log("Status producto:", resProduct.status);
      const dataProduct = await resProduct.json();
      console.log("Producto:", dataProduct);
  
      if (!resProduct.ok) {
        console.error("Error al obtener producto");
        return;
      }
  
      setProduct(dataProduct);
      setForm({
        name: dataProduct.name,
        description: dataProduct.description,
        price: dataProduct.price,
        categoryId: dataProduct.categoryId,
      });
  
      const resCategories = await fetch("/api/categories");
      const dataCategories = await resCategories.json();
      setCategories(dataCategories);
    };
  
    if (productId) fetchData();
  }, [productId]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "price" ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    router.push("/admin");
  };

  if (!product) return <p className="text-center mt-10">Cargando producto...</p>;

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Editar producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      </form>
    </main>
  );
}
