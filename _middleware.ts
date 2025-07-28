import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    const publicPaths = ["/login", "/register"];
    const pathname = request.nextUrl.pathname;
    const isPublicPath = publicPaths.includes(pathname) || pathname.startsWith("/api");

    if (!token && !isPublicPath) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("❌ Middleware error:", error);
    return new NextResponse("Middleware failure", { status: 500 });
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
