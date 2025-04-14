import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleError, NotFoundError } from "@/lib/handler";

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.pathname.split("/").pop(); 
    if (!category) throw new NotFoundError("Categoría no especificada");

    const categoryName = decodeURIComponent(category).toLowerCase();

    const allCategories = await prisma.category.findMany();

    const matchedCategory = allCategories.find(
      (cat) => cat.name.toLowerCase() === categoryName
    );

    if (!matchedCategory) {
      throw new NotFoundError("Categoría no encontrada");
    }

    const products = await prisma.product.findMany({
      where: {
        categoryId: matchedCategory.categoryId,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}
