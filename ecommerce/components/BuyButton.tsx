"use client";

export default function BuyButton() {
  const handleBuy = () => {
    alert("¡Gracias por tu interés! Funcionalidad de compra próximamente 🛍️");
  };

  return (
    <button
      onClick={handleBuy}
      className="w-50 bg-[#E07A5F] hover:bg-[#D06045] text-[#FFF8F0] py-3 px-6 rounded text-md font-semibold shadow-md transition-colors"
    >
      Comprar
    </button>
  );
}
