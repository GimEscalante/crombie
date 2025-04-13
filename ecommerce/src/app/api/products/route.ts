import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "@google-cloud/storage";
import path from "path";
import {handleError, UserInputError} from "@/lib/handler";

const storage = new Storage();
const BUCKET_NAME = process.env.GCP_BUCKET_NAME!;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const totalProducts = await prisma.product.count();

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      skip,
      take: limit,
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      products,
      total: totalProducts,
      page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string, 10);
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File | null;

    if (!name || !description || !price || !image || !categoryId) {
      throw new UserInputError("Todos los campos son obligatorios.");
    }

    const fileName = `${uuidv4()}${path.extname(image.name)}`;
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(fileName);
    const buffer = await image.arrayBuffer();

    await file.save(Buffer.from(buffer), {
      metadata: { contentType: image.type },
    });

    const imageUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;

    const categoryExists = await prisma.category.findUnique({
      where: { categoryId },
    });

    if (!categoryExists) {
      throw new UserInputError("La categoría no existe en la base de datos.");
    }

    const product = await prisma.product.create({
      data: { name, description, price, categoryId, image: imageUrl },
    });

    return NextResponse.json(
      { message: "Producto creado", product },
      { status: 201 }
    );
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}
