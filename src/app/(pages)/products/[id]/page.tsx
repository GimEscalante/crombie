import { baseUrl } from "@/lib/definitions";
import { notFound } from "next/navigation";
import Image from "next/image";
import BuyButton from "../../../../../components/BuyButton";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = params;
  const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: "no-store" });

  if (!res.ok) return notFound();

  const product = await res.json();

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8f3e9] py-10 px-4">
      <div className="bg-[#FFF8F0] rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl border border-[#F0E6D2]">
       <div className="relative w-full md:w-1/2 h-96 md:h-auto">
          <Image
          src={product.image || "/images/product.jpg"}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          />
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A233A] mb-4">{product.name}</h1>
            <p className="text-gray-500 text-lg mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-[#E07A5F] mb-2">${product.price}</p>
            <p className="text-sm text-gray-400 mb-6">
              Categoría: <span className="font-medium text-[#4A5568]">{product.category?.name || "Sin categoría"}</span>
            </p>
          </div>
          <BuyButton />
        </div>
      </div>
   </main>
  );
}
