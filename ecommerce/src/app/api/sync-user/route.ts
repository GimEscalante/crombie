// app/api/sync-user/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { clerkId, name, email } = body;

  if (!clerkId || !email) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  // Verificar si el usuario ya existe
  const existingUser = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        clerkId,
        name,
        email,
      },
    });
  }

  return NextResponse.json({ message: "Usuario sincronizado" });
}
