import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: any, res: any, next: any) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
