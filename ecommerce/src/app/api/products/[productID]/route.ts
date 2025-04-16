import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleError, NotFoundError } from "@/lib/handler";

export async function GET(request: NextRequest) {
  try {
    const productID = request.nextUrl.pathname.split("/").pop()!;

    const product = await prisma.product.findUnique({
      where: { productId: productID },
      include: { category: true },
    });

    if (!product) {
      throw new NotFoundError("Producto no encontrado");
    }

    return NextResponse.json(product);
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const productID = request.nextUrl.pathname.split("/").pop()!;
    const { name, description, price, categoryId } = await request.json();

    const updatedProduct = await prisma.product.update({
      where: { productId: productID },
      data: { name, description, price, categoryId },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const productID = request.nextUrl.pathname.split("/").pop()!;

    await prisma.product.delete({
      where: { productId: productID },
    });

    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}
