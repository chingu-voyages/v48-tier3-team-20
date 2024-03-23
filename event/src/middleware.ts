import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import * as jose from 'jose';


export function middleware(request: NextRequest) {
    let cookie = request.cookies.get('accessToken')
    const key = new TextEncoder().encode("encoderKEY")

    console.log("MIDDLEWARE START")
    console.log("cookie", cookie)

    try {
        console.log("Beginning of the try middleware")
        if (!cookie) {
            console.log('no cookie')
            return NextResponse.rewrite(new URL('/login', request.url))
        }
        jose.jwtVerify(cookie.value, key)
        //console.log(jose.jwtVerify(cookie.value, key))
        console.log('after jwt verify')
        if (request.nextUrl.pathname.startsWith('/about')) {
            console.log('middleware about')
            return NextResponse.rewrite(new URL('/about-2', request.url))
        }

        if (request.nextUrl.pathname.startsWith('/dashboard')) {
            return NextResponse.rewrite(new URL('/dashboard/user', request.url))
        }
    } catch (error) {
        console.log('error caught:', error);
        const err = error as Error;
        console.log(err.name, err.message);
    }

}

export const config = {
    matcher: ['/about:path*', '/dashboard:path*'],
}