import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleError, NotFoundError } from "@/lib/handler";

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.pathname.split("/").at(-1);
    console.log("Categoría recibida desde la URL:", category); // Agrega logging

    if (!category) throw new NotFoundError("Categoría no especificada");

    const categoryName = decodeURIComponent(category).toLowerCase();
    console.log("Categoría decodificada y en minúsculas:", categoryName); // Agrega logging

    const allCategories = await prisma.category.findMany();
    console.log("Todas las categorías:", allCategories); // Agrega logging

    const matchedCategory = allCategories.find(
      (cat) => cat.name.toLowerCase() === categoryName
    );

    console.log("Categoría encontrada:", matchedCategory); // Agrega logging
    if (!matchedCategory) {
      throw new NotFoundError("Categoría no encontrada");
    }

    const products = await prisma.product.findMany({
      where: {
        categoryId: matchedCategory.categoryId,
      },
    });

    console.log("Productos encontrados:", products); // Agrega logging
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error en /api/products/category/[category]:", error); // Agrega logging del error
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}
