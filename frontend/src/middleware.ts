import { NextResponse } from "next/server";
import type { NextRequest /*, NextFetchEvent*/ } from "next/server";

export function middleware(request: NextRequest /*, event: NextFetchEvent*/) {
  const token = request.cookies.get("accessToken");
  console.log("Token:", token);
  console.log("Request URL:", request.url);
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/about/:path*",
    // "/dashboardssss/:path*",
    // "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    // "/(api|trpc)(.*)",
    // "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
