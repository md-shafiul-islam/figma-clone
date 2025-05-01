import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/dashboard")) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });
    console.log("Token ", token);
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
  return NextResponse.next();
}
