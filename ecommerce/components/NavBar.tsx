"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const { isSignedIn, user } = useUser();

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
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-[#2d3c5e] hover:bg-[#e67422]/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge badge-sm indicator-item bg-[#e67422] text-white border-0">0</span>
        </div>
      </div>

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
    </div>
  </div>
</div>
  );
}