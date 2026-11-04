import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

// private routes: send the user to login and bring them back after login
export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-book",
    "/my-books",
    "/my-borrows",
    "/profile",
    "/profile/:path*",
    "/books/:path",
  ],
};
