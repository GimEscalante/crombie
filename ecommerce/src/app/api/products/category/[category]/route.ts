import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const categoryName = decodeURIComponent(params.category).toLowerCase();

  try {
    
    const allCategories = await prisma.category.findMany();

    const matchedCategory = allCategories.find(
      (cat) => cat.name.toLowerCase() === categoryName
    );

    if (!matchedCategory) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    const products = await prisma.product.findMany({
      where: {
        categoryId: matchedCategory.categoryId,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener productos", details: String(error) },
      { status: 500 }
    );
  }
}
