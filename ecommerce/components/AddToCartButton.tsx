"use client";
//A futuro: Boton para que se puedan agregar productos a un carrito, si es que hay un usuario logeado 
import { useState } from "react";

type Props = {
  productId: string;
  userId: string | null;
};

export function AddToCartButton({ productId, userId }: Props) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    
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
