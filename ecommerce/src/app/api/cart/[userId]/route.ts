// /app/api/cart/[userId]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Cart, CartItem } from "@prisma/client";


export async function POST(req: Request, { params }: { params: { userId: string } }) {
  const { productId, quantity } = await req.json();

  let cart: (Cart & { items: CartItem[] }) | null = await prisma.cart.findUnique({
    where: { userId: params.userId },
    include: { items: true },
  });

  // Crear el carrito si no existe
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: params.userId,
        items: {
          create: [
            {
              productId,
              quantity,
            },
          ],
        },
      },
      include: { items: true },
    });
    
    
  } else {
    const existingItem = cart.items.find((item) => item.productId === productId);
    if (existingItem) {
      await prisma.cartItem.update({
        where: { cartItemId: existingItem.cartItemId },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.cartId,
          productId,
          quantity,
        },
      });
    }
  }

  return NextResponse.json({ message: "Producto agregado al carrito" });
}
// /app/api/cart/[userId]/route.ts
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const cart = await prisma.cart.findUnique({
    where: { userId: params.userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json(cart || {});
}
