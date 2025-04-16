import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/handler";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}
