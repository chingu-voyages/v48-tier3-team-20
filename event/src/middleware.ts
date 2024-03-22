import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {verify} from 'jsonwebtoken';

export function middleware(request: NextRequest) {
    try {
        let cookie = request.cookies.get('accessToken')
        console.log('cookie from middleware', cookie);
        if (!cookie) {
            console.log('no cookie')
            return NextResponse.rewrite(new URL('/login', request.url))
        }
        verify(cookie.value, "privateKey")
        console.log('after jwt verify')
        if (request.nextUrl.pathname.startsWith('/about')) {
            console.log('middleware about')
            return NextResponse.rewrite(new URL('/about-2', request.url))
        }

        if (request.nextUrl.pathname.startsWith('/dashboard')) {
            return NextResponse.rewrite(new URL('/dashboard/user', request.url))
        }



    } catch (err) {
        console.log(err)
    }



}

export const config = {
    matcher: ['/about:path*', '/dashboard:path*'],
}