import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the access token from cookies
  const token = request.cookies.get("accessToken")?.value;
  console.log("Token:", token);

  // Check if the token exists and is valid
  let isAuthenticated = false;
  if (token) {
    try {
      // Verify the JWT using jose
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET || "your-secret-key"
      );
      const { payload } = await jwtVerify(token, secret);
      console.log("Decoded JWT payload:", payload);
      isAuthenticated = true;
    } catch (error) {
      console.log("JWT verification failed:", error);
      isAuthenticated = false;
    }
  }

  // Allow unauthenticated users to access login, signup, and forgotPassword pages
  if (pathname === "/login" || pathname === "/signup" || pathname === "/forgotPassword") {
    if (isAuthenticated) {
      // Redirect authenticated users to homepage
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login for all other routes
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow authenticated users to proceed to other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/forgotPassword", "/", "/dashboard/:path*"],
};