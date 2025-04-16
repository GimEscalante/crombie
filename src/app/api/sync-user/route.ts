import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { handleError } from "@/lib/handler";

export async function POST(req: Request) {
  try {
    const { id, name, email } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: id },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Usuario ya existe" });
    }

    const newUser = await prisma.user.create({
      data: {
        clerkId: id,
        name,
        email,
        password: "",
      },
    });

    await clerkClient.users.updateUserMetadata(id, {
      publicMetadata: {
        userId: newUser.userId,
      },
    });

    return NextResponse.json({
      message: "Usuario creado y sincronizado",
      user: newUser,
    });
  } catch (error) {
    const { message, statusCode } = handleError(error);
    return NextResponse.json({ message }, { status: statusCode });
  }
}
