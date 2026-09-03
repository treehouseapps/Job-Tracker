// import { verifyJwt } from "@/lib/auth";

export async function middleware(req: any) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  if (!token) {
    return Response.redirect(new URL("/auth/login", req.url));
  }

  //   const user = await verifyJwt(token);

  //   if (!user || !user.id || !user.role) {
  //     return Response.redirect(new URL("/login", req.url));
  //   }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
