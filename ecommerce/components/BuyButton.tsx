"use client";

export default function BuyButton() {
  const handleBuy = () => {
    alert("¡Gracias por tu interés! Funcionalidad de compra próximamente 🛍️");
  };

  return (
    <button
      onClick={handleBuy}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl text-lg font-semibold shadow-lg transition"
    >
      Comprar ahora
    </button>
  );
}
