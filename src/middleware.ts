// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Obtener la cookie de autenticación de Clerk
  const clerkSession = request.cookies.get("__session");
  
  // Verificar si la ruta es una ruta de administrador
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  
  // Si es ruta de administrador y no hay sesión, redirigir a la página principal
  if (isAdminRoute && !clerkSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};