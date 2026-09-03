import { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return Response.redirect(new URL("/auth/login", req.url));
  }

  const user = await verifyJwt(token);

  if (!user) {
    return Response.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/applications/:path*", "/profile/:path*"],
};
