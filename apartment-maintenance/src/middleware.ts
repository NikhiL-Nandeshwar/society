import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("Middleware hit:", req.nextUrl.pathname, "Token:", token);

  // Public paths
  const publicPaths = ["/login", "/onboarding", "/signup", "/api/"];
  if (publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Redirect if no token
  if (!token) {
    console.log("No token, redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'], // middleware runs on all non-public pages
};

