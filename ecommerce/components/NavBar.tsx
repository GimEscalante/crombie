"use client";

import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const { isSignedIn, user } = useUser();

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" >
        <Image
          src="/images/logo.png" 
          alt="Logo de la tienda"
          width={50}
          height={10}
          priority
        />
        </Link>
      </div>

      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-6">
          <Link
            href="/about"
            className="btn btn-ghost text-lg font-medium hover:bg-primary hover:text-primary-content transition-all duration-200"
          >
            About Us
          </Link>
          <Link
            href="/categories"
            className="btn btn-ghost text-lg font-medium hover:bg-primary hover:text-primary-content transition-all duration-200"
          >
            Categories
          </Link>
          <Link
            href="/products"
            className="btn btn-ghost text-lg font-medium hover:bg-primary hover:text-primary-content transition-all duration-200"
          >
            Products
          </Link>
        </div>
      </div>

      <div className="flex-none mr-6">
        {isSignedIn ? (
          <div className="flex items-center gap-3">
           
            <div className="dropdown dropdown-end mr-5">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
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
                  <span className="badge badge-sm indicator-item">0</span>
                </div>
              </div>
            </div>

            <span className="text-sm">{user?.fullName}</span>
            <UserButton />
            </div>
          ) : (
            <Link href="/sign-in" className="btn btn-outline btn-sm">
              Iniciar sesión
            </Link>
          )}
      </div>
    </div>

  );
}
