import { baseUrl } from "@/lib/definitions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Props {
  params: { category: string };
}

export default async function CategoryPage({ params }: Props) {
  const category = params.category;

  const res = await fetch(`${baseUrl}/api/products/by-category/${category}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const products: Product[] = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Productos en {category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.productId}
              className="bg-white shadow-md p-4 rounded-lg flex flex-col"
            >
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                  priority
                />
              </div>

              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-600 font-bold mt-2">${product.price}</p>

              <Link
                href={`/products/${product.productId}`}
                className=" inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4 text-center"
              >
                Ver más
              </Link>
            </div>
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </div>
    </main>
  );
}
