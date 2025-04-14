import { baseUrl } from "@/lib/definitions";
import { notFound } from "next/navigation";
import Image from "next/image";
import BuyButton from "../../../../../components/BuyButton";

type ProductParams = Promise<{ id: string }>

export default async function ProductDetail({ params }: { params: ProductParams }) {
  const { id } = await params;
  const productId = id;
  const res = await fetch(`${baseUrl}/api/products/${productId}`, { cache: "no-store" });

  if (!res.ok) return notFound();

  const product = await res.json();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-blue-600 mb-2">${product.price}</p>
            <p className="text-sm text-gray-500 mb-6">
              Categoría: <span className="font-medium">{product.category?.name || "Sin categoría"}</span>
            </p>
          </div>

          <BuyButton />
        </div>
      </div>
    </main>
  );
}
