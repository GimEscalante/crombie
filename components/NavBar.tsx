"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

export default function NavBar() {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchCartItemCount = async () => {
    if (!isSignedIn || !user?.id) return;
    
    try {
      const res = await fetch(`/api/cart/${user.id}/count`);
      if (res.ok) {
        const data = await res.json();
        setCartItemCount(data.count);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };
  useEffect(() => {
    if (isSignedIn) {
      fetchCartItemCount();
    } else {
      setCartItemCount(0);
    }
  }, [isSignedIn, user?.id]);

  return (
    <div className="navbar py-4 px-6 bg-[#f8f3e9] sticky top-0 z-50 font-serif text-[#2d3c5e] border-b border-[#2d3c5e]/20">
      <div className="flex-1">
        <Link href="/">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Logo de la tienda"
              width={50}
              height={10}
              priority
              className="object-contain"
            />
            <span className="text-xl font-medium tracking-wider text-[#2d3c5e]">ASIAN FOOD</span>
          </div>
        </Link>
      </div>
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-10">
          <Link
            href="/"
            className="text-base font-medium hover:text-[#e67422] transition-all duration-200 relative group"
          >
            Home
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#e67422] opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link
            href="/about"
            className="text-base font-medium hover:text-[#e67422] transition-all duration-200 relative group"
          >
            About
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#e67422] opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link
            href="/categories"
            className="text-base font-medium hover:text-[#e67422] transition-all duration-200 relative group"
          >
            Menu
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#e67422] opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link
            href="/products"
            className="text-base font-medium hover:text-[#e67422] transition-all duration-200 relative group"
          >
            Products
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#e67422] opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
        </div>
      </div>

      <div className="flex-none">
        <div className="flex items-center gap-4">
          {isSignedIn && (
            <Link href="/cart" className="relative flex items-center">
              <button className="btn btn-ghost btn-circle text-[#2d3c5e] hover:bg-[#e67422]/10">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-[#e67422] text-white text-xs rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </Link>
          )}
          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{user?.fullName}</span>
              <UserButton />
            </div>
          ) : (
            <Link 
              href="/sign-in" 
              className="px-4 py-2 border border-[#2d3c5e] rounded-sm text-[#2d3c5e] text-sm font-medium hover:bg-[#2d3c5e] hover:text-[#f8f3e9] transition-all duration-200"
            >
              Iniciar sesión
            </Link>
          )}
          <button 
            className="md:hidden btn btn-ghost btn-circle"
            onClick={toggleMenu}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#f8f3e9] p-4 shadow-md z-50 border-t border-[#2d3c5e]/20">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-base font-medium hover:text-[#e67422] transition-all duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-base font-medium hover:text-[#e67422] transition-all duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/categories"
              className="text-base font-medium hover:text-[#e67422] transition-all duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/products"
              className="text-base font-medium hover:text-[#e67422] transition-all duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            
            {isSignedIn && (
              <Link
                href="/cart"
                className="flex items-center text-base font-medium hover:text-[#e67422] transition-all duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Carrito
                {cartItemCount > 0 && (
                  <span className="ml-2 bg-[#e67422] text-white text-xs rounded-full px-2 py-1">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}