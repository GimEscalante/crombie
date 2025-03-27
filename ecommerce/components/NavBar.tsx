"use client";


import Link from "next/link";


export default function NavBar() {
   

    return (

        <div>
            <Link href="/" className="text-2xl absolute left-4">
                HOME
            </Link> 
            <div>
                <Link href="/about">About</Link>
                <Link href="/categories">Categories</Link>
                <Link href="/products">Products</Link>

                <>
                <Link href="/profile">  Profile</Link>
                
                </>
                ): (
                    <Link href="/login">Iniciar Sesion</Link>
                )
                )
            </div>
        </div>
    )
};