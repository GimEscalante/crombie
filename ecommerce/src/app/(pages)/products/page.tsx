import React from "react";
import { Product } from "@prisma/client"

export default async function Products() {
    //bring products from DB
    const res = await fetch("http://localhost:3000/api/products");
    //parse the response to a json object
    const productsFromDB = await res.json()
    //get the products from the json object
    const products:Product[] = productsFromDB.products;
    return (
        //display the products
        <main className="min-h-screen bg-gray-600 text-gray-800 p-8">
            <section className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Our Products:</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {products.map((product)=>(
                    <div key={product.productId} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform">
                       
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-xl font-bold text-blue-600">{product.price}</p>
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 roundend hover:bg-blue-700 transition">Buy Now!</button>
                        </div>
                    </div>
                    ))}
                </div>
            </section>
        </main>
    );
}