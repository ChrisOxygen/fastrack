import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const { pathname } = url;
    const token =
      req.cookies.get("next-auth.session-token") ||
      req.cookies.get("__Secure-next-auth.session-token");

    if (!token) {
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Allow access if user is authenticated
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*"], // Protect all routes under /dashboard
};
