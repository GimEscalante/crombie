import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";

type Props = {
  product: Product;
  onDelete: () => void;
};

export default function AdminCard({ product, onDelete }: Props) {
  return (
    <div className="w-80 rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105">
      <Image
        src={product.image || "/images/product.jpg"}
        alt={product.name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
        unoptimized
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-1">{product.name}</h2>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <p className="text-blue-600 font-bold text-lg">${product.price}</p>
        <div className="flex justify-between mt-3">
          <Link
            href={`/admin/edit/${product.productId}`}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
          >
            Editar
          </Link>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
