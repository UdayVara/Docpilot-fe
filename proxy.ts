// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

const PUBLIC_ROUTES = ["/", "/login", "/signup"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore Next.js internals, static files, and API routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const token = await auth();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthenticated = !!token?.user;

  // Prevent logged-in users from opening public auth pages
  if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  // Protect private route
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - api
     * - _next/static
     * - _next/image
     * - favicon
     * - files with extension
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};