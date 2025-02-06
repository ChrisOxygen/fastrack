import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Check for session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("token", token);

  // Redirect to login page if there's no token
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if page is login, sign up or forgot password, redirect to dashboard if token is present

  // console.log("request.url-----------", request.url);
  // if (
  //   request.url.includes("/login") ||
  //   request.url.includes("/signup") ||
  //   request.url.includes("/forgot-password")
  // ) {
  //   console.log("redirecting to dashboard");
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
