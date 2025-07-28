// middleware.ts (in root)
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const publicPaths = ["/login", "/register"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname) || request.nextUrl.pathname.startsWith("/api");

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
