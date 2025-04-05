"use client"

import { Product } from "@prisma/client"

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Card from "../../../../components/Card";

export default function Products() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`/api/products?page=${page}&limit=4&search=${search}`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setTotalPages(data.totalPages);
            });
    
        const queryParams = new URLSearchParams();
        queryParams.set("page", page.toString());
    
        if (search) {
            queryParams.set("search", search);
        }
    
        router.push(`/products?${queryParams.toString()}`, { scroll: false });
    }, [page, search, router]);
    

    return (
        <main className="min-h-screen bg-gray-100 text-gray-800 p-8">
            <section className="max-w-6xl mx-auto">
                <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        placeholder="Type to search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border rounded w-80 text-gray-800"
                    />
                </div>
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Our Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products?.map((product) => (
                        <Card
                        key={product.productId}
                        title={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.image || "/images/product.jpg"}
                        linkToProduct={`/products/${product.productId}`}
                        onAddToCart={() => console.log("Agregar al carrito:", product.name)}
                        
                      />
                      
                    ))}
                </div>
                <div className="flex justify-center mt-6 gap-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                    >
                        Anterior
                    </button>
                    <span className="text-lg font-semibold">
                        Página {page} de {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                    >
                        Siguiente
                    </button>
                </div>
            </section>
        </main >
    )
}