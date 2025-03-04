import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("Middleware running...");

  // Get token from cookies only
  const token = req.cookies.get("token")?.value || "";

  console.log("Cookie token:", token);
  console.log(process.env.NEXT_PUBLIC_BASE_URL);

  // For protected API routes that require authentication
  if (!token) {
    return NextResponse.redirect(
      new URL("/signup", process.env.NEXT_PUBLIC_BASE_URL)
    );
  }

  try {
    // Verify the token using jose
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "");
    const { payload } = await jose.jwtVerify(token, secretKey);
    console.log("Token successfully verified:", payload);

    // Simply proceed with the request if token is valid
    return NextResponse.next();
  } catch (error) {
    console.log("Token verification failed:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/shorturl", "/api/shorturl/:path*"],
};
