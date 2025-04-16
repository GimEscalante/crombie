// "use client";

// import { useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { ShoppingCart, Loader2 } from "lucide-react";

// type Props = {
//   productId: string;
// };

// export function AddToCartButton({ productId }: Props) {
//   const { isSignedIn, user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleAddToCart = async () => {
//     if (!isSignedIn) {
//       router.push("/sign-in");
//       return;
//     }
    
//     setLoading(true);

//     try {
//       const res = await fetch(`/api/cart/${user?.id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           productId,
//           quantity: 1,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Error al agregar al carrito");
//       }
//       router.refresh();
//       const toast = document.createElement("div");
//       toast.className = "fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-up";
//       toast.textContent = "¡Producto agregado al carrito!";
//       document.body.appendChild(toast);
      
//       setTimeout(() => {
//         toast.classList.add("animate-fade-out");
//         setTimeout(() => document.body.removeChild(toast), 500);
//       }, 3000);
//     } catch (error) {
//       console.error(error);
//       alert("No se pudo agregar al carrito.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleAddToCart}
//       disabled={loading}
//       className={`flex items-center justify-center px-3 py-1 rounded text-sm font-medium transition-colors ${
//         isSignedIn
//           ? "bg-green-800 text-white hover:bg-green-700"
//           : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//       }`}
//     >
//       {loading ? (
//         <Loader2 className="h-4 w-4 animate-spin mr-1" />
//       ) : (
//         <ShoppingCart className="h-4 w-4 mr-1" />
//       )}
//       {loading ? "Agregando..." : isSignedIn ? "Agregar al carrito" : "Iniciar sesión"}
//     </button>
//   );
// }