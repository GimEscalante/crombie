import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // o donde tengas tu instancia de Prisma


export async function POST(req: Request) {
  try {
    const { id, name, email } = await req.json();

    // Verificamos si el usuario ya existe por clerkId
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: id },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Usuario ya existe" });
    }

    // Creamos el nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        clerkId: id,
        name,
        email,
        password:"",
        
        
      }
      
    });

    return NextResponse.json({ message: "Usuario creado", user: newUser });
  } catch (error) {
    console.error("Error al sincronizar usuario:", error);
    return NextResponse.json({ error: "Error al sincronizar usuario" }, { status: 500 });
  }
}

