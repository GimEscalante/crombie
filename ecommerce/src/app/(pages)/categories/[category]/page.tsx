import { baseUrl } from "@/lib/definitions";
import { notFound } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import Card from "../../../../../components/Card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

type CategoryParams = Promise<{ category: string }>

export default async function CategoryPage({ params }: { params: CategoryParams }) {
  const { category } = await params;
  const categoryLowerCase = category.toLowerCase();
  const decodedCategory = decodeURIComponent(category);
  const capitalizedCategory = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);


  const res = await fetch(`${baseUrl}/api/products/category/${categoryLowerCase}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const products: Product[] = await res.json();
  const user = await currentUser(); 
  const userId = user?.publicMetadata?.userId as string | null;

  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-grow px-8 py-10 max-w-7xl mx-auto">
        
      <Link
        href="/categories"
        className="mb-6 inline-flex items-center text-sm text-[#4A5568] hover:underline self-start md:self-center"
      >
        <ArrowLeft className="w-4 h-4 mr-2 text-[#4A5568]" />
        Volver a categorias
      </Link>

        <h1 className="text-2xl md:text-4xl font-serif text-[#2d3c5e] mb-4 tracking-wide text-center">
           {capitalizedCategory}
          <div className="w-24 h-1 bg-[#e67422] mx-auto mb-6 mt-2"></div>
        </h1>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-7xl mx-auto">
            {products.length > 0 ? (
              products.map((product) => (
                <Card
                  key={product.productId}
                  productId={product.productId}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image || "/images/product.jpg"}
                  userId={userId}
                  isFavorite={false}
                  linkToProduct={`/products/${product.productId}`}
                />
              ))
            ) : (
              <p className="text-center w-full">
                No hay productos en esta categoría.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>

  );
}
