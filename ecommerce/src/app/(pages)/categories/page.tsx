import Link from "next/link";
import { Category } from "@prisma/client";
import React from "react";



export default async function CategoryPage() {
   
    const res = await fetch("http://localhost:3000/api/categories");
     //parse the response to a json object
    const categoriesFromDB = await res.json()
    //get the products from the json object
    const categories:Category[] = categoriesFromDB.categories;
    
    return(
        <div className="m-6 flex flex-col">
            <h1 className="text-4xl font-bold mb-4 text-blue-600">Categories</h1>
            {categories.map((category)=>(
                <div className=""  key={category.categoryId}>
                    <Link 
                       
                        href={`/categories/${category.categoryId}`}
                        className="my-5 hover:font-semibold"
                        
                    >
                        {category.name}
                    </Link>
                </div>
            ))}
        </div>
    );
};