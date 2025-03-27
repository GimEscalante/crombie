"use client";


import Link from "next/link";


export default function NavBar() {
   

    return (

        <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* HOME a la izquierda */}
          <Link href="/" className="text-2xl font-bold">HOME</Link>
  
          {/* Enlaces centrados */}
          <div className="flex gap-6 text-lg">
            <Link href="/about" className="hover:text-gray-300">About</Link>
            <Link href="/categories" className="hover:text-gray-300">Categories</Link>
            <Link href="/products" className="hover:text-gray-300">Products</Link>
          </div>
  
          {/* Profile o Iniciar Sesión a la derecha */}
          <div>
            <Link href="/profile" className="text-lg font-semibold hover:text-gray-300">Profile</Link>
            {/* Si hay autenticación, mostrar Profile, si no, Iniciar Sesión */}
            {/* <Link href="/login" className="text-lg font-semibold hover:text-gray-300">Iniciar Sesión</Link> */}
          </div>
        </div>
      </nav>
    )
};