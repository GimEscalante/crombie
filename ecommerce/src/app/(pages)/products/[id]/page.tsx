
import { baseUrl } from "@/lib/definitions";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }: { params: { id: string } }) {
    const productId =  await params.id
    const res = await fetch(`${baseUrl}/api/products/${productId}`);

    if (!res.ok) return notFound();

    const product = await res.json();

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-8">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">{product.name}</h1>
                <p className="text-gray-600 text-lg">{product.description}</p>
                <p className="text-xl text-blue-500 font-bold mt-4">${product.price}</p>
                <p className="text-gray-500 mt-2">Category: {product.category?.name || "Sin categoría"}</p>
            </div>
        </main>
    );
}