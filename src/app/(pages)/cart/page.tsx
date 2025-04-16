"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";

// Definimos los tipos para nuestros datos
interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

export default function CartPage() {
  const { isSignedIn, user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const fetchCartItems = async () => {
    if (!isSignedIn || !user?.id) return;

    try {
      setIsLoading(true);
      const res = await fetch(`/api/cart/${user.id}`);
      if (!res.ok) throw new Error("Error fetching cart");
      
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (!isSignedIn || !user?.id || newQuantity < 1) return;

    try {
      setIsUpdating(true);
      const res = await fetch(`/api/cart/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItemId: itemId,
          quantity: newQuantity,
        }),
      });

      if (!res.ok) throw new Error("Error updating cart");
      setCartItems(
        cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const removeItem = async (itemId: string) => {
    if (!isSignedIn || !user?.id) return;

    try {
      setIsUpdating(true);
      const res = await fetch(`/api/cart/${user.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItemId: itemId,
        }),
      });

      if (!res.ok) throw new Error("Error removing item");

      setCartItems(cartItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCheckout = async () => {
    if (!isSignedIn || !user?.id || cartItems.length === 0) return;

    try {
      alert("Gracias por comprar!.");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchCartItems();
    }
  }, [isSignedIn, user?.id]);

  if (!isSignedIn) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <h1 className="text-2xl font-serif text-[#2d3c5e] mb-8">Carrito de Compras</h1>
        <div className="bg-[#f8f3e9] p-8 rounded-lg shadow text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl mb-2 font-medium text-[#2d3c5e]">Inicia sesión para ver tu carrito</h2>
          <p className="text-gray-500 mb-6">Necesitas iniciar sesión para agregar productos y ver tu carrito</p>
          <Link
            href="/sign-in"
            className="px-6 py-3 bg-[#2d3c5e] text-white rounded-md hover:bg-[#1a233a] transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="flex items-center mb-8">
        <Link href="/products" className="flex items-center text-[#2d3c5e] hover:text-[#e67422] mr-4">
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Volver a productos</span>
        </Link>
        <h1 className="text-2xl font-serif text-[#2d3c5e] items-center">TU CARRITO DE COMPRAS</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e67422]"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="bg-[#f8f3e9] p-8 rounded-lg shadow text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl mb-2 font-medium text-[#2d3c5e]">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-6">¡Agrega algunos productos deliciosos a tu carrito!</p>
          <Link
            href="/products"
            className="px-6 py-3 bg-[#e67422] text-white rounded-md hover:bg-[#d06045] transition-colors"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-6 px-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover object-center"
                        unoptimized
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-[#2d3c5e]">
                          <h3>{item.product.title}</h3>
                          <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">${item.product.price.toFixed(2)} por unidad</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating}
                            className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isUpdating}
                            className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          disabled={isUpdating}
                          className="font-medium text-red-600 hover:text-red-500 flex items-center disabled:opacity-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-[#f8f3e9] rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-[#2d3c5e] mb-4">Resumen del pedido</h2>
              <div className="flex justify-between py-2 text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-gray-600">
                <span>Envío</span>
                <span>Calculado al finalizar</span>
              </div>
              <div className="border-t border-gray-300 my-4"></div>
              <div className="flex justify-between py-2 font-medium text-[#2d3c5e]">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || isUpdating}
                className="w-full mt-6 bg-[#e67422] text-white py-3 px-4 rounded-md hover:bg-[#d06045] transition-colors disabled:opacity-50"
              >
                Proceder al pago
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}