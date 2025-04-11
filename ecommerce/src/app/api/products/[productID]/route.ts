import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { productID: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { productId: params.productID },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: "Error al obtener el producto", error }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { productID: string } }
) {
  try {
    const { name, description, price, categoryId } = await req.json();

    const updatedProduct = await prisma.product.update({
      where: { productId: params.productID },
      data: { name, description, price, categoryId },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json(
      { message: "Error al actualizar el producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productID: string } }
) {
  try {
    await prisma.product.delete({
      where: { productId: params.productID },
    });

    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}
