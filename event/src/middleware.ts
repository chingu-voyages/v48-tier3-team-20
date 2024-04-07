import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./lib/authHelper";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("accessToken");

  // if user visits /login and has no cookies, do nothing and return
  if (!cookie) {
    if (request.nextUrl.pathname.startsWith("/login")) {
      return;
    }

    // else redirect to /login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { data, error } = await verifyJwt(cookie.value);

    // throw error if invalid jwt, catch block to delete cookie
    if (!data || error) {
      throw new Error("Invalid or expired JWT");
    }

    // if logged in user visits /host, verify isSubscribed
    if (request.nextUrl.pathname.startsWith("/host")) {
      if (data.isSubscribed === true) {
        return;
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // if logged in user visits /login, redirects to /dashboard
    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch (error) {
    const err = error as Error;
    console.log("error caught in middleware:", err);

    // if error, delete cookie and redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    return response;
  }
}

export const config = {
  matcher: ["/host/:path*", "/dashboard/:path*", "/login", "/profile/:path*"],
};
