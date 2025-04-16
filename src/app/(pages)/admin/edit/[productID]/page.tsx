"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { category, Product } from "@prisma/client";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.productID as string;

  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<category[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
  });

  console.log("Params:", params);
  console.log("Product ID:", productId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("PARAMS:", params);
        console.log("Product ID:", productId);

        const resProduct = await fetch(`/api/products/${productId}`);
        console.log("Status producto:", resProduct.status);

        if (!resProduct.ok) {
          console.error("Error al obtener producto");
          return;
        }

        const dataProduct = await resProduct.json();
        console.log("Producto:", dataProduct);

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
      } catch (error) {
        console.error("Error en fetchData:", error);
      }
    };

    if (productId) fetchData();
  }, [productId, params]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? parseInt(value) : value,
    }));
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

  if (!product)
    return (
      <div className="text-center mt-10">
        <p>Cargando producto...</p>
        <p className="text-sm text-gray-500">ID: {productId}</p>
      </div>
    );

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-serif text-[#1A233A] mb-6 text-center">EDITAR PRODUCTO</h1>
      <div className="w-24 h-1 bg-[#e67422] mx-auto mb-6"></div>
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
          className="bg-[#e67422] hover:bg-[#e67422c5] text-white px-4 py-2 rounded"
        >
          Guardar cambios
        </button>
      </form>
    </main>
  );
}
