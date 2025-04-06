"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  productId: string;
  userId: string | null;
};

export function AddToCartButton({ productId, userId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!userId) {
      alert("Tenés que iniciar sesión para agregar productos al carrito.");
      router.push("/sign-in"); // o "/login" dependiendo de tu ruta de login
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/cart/${userId}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al agregar al carrito");
      }

      alert("Producto agregado al carrito!");
      // Podés también redirigir o actualizar algo
    } catch (error) {
      console.error(error);
      alert("No se pudo agregar al carrito.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
    >
      {loading ? "Agregando..." : "Agregar al carrito"}
    </button>
  );
}
