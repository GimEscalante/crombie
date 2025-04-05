import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "@google-cloud/storage";
import path from "path";

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
    console.error({ message: "Fallo al obtener los productos", error });

    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const categoryId = formData.get("category") as string;
  const image = formData.get("image") as File | null;

  if (!name || !description || !price || !image) {
    return NextResponse.json(
      { message: "Todos los campos son obligatorios." },
      { status: 400 }
    );
  }

  const fileName = `${uuidv4()}${path.extname(image.name)}`;
  const bucket = storage.bucket(BUCKET_NAME);
  const file = bucket.file(fileName);
  const buffer = await image.arrayBuffer();
  await file.save(Buffer.from(buffer), {
    metadata: { contentType: image.type },
    public: true,
  });

  const imageUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;

  
  const product = await prisma.product.create({
    data: { name, description, price, categoryId, image: imageUrl },
  });

  return NextResponse.json(
    { message: "Producto creado", product },
    { status: 201 }
  );
}