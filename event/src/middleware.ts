import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./lib/authHelper";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("accessToken");
  if (!cookie) {
    // if user visits /login and has no cookies, do nothing and return
    if (request.nextUrl.pathname.startsWith("/login")) {
      return;
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }


  try {
    const { data, error } = await verifyJwt(cookie.value);
    console.log(data)
    if (!data || error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // if logged in user visits /login, redirects to /about, for testing only
    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/about", request.url));
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
  matcher: ["/about:path*", "/dashboard:path*", "/login"],
};
