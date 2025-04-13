import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleError, NotFoundError } from "@/lib/handler";

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
      throw new NotFoundError("Producto no encontrado");
    }

    return NextResponse.json(product);
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
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
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
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
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}
