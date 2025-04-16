// En /app/api/auth/check/route.ts
import { getAuth } from "@clerk/nextjs/server"; 
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  
  if (!userId) {
    return NextResponse.json({ authenticated: false });
  }
  
  return NextResponse.json({ authenticated: true });
}