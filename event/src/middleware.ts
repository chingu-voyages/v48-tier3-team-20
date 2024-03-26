import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import * as jose from 'jose';


export async function middleware(request: NextRequest) {
    let skey : string = process.env.SECRETKEY!;
    let cookie = request.cookies.get("accessToken")
    const key = new TextEncoder().encode(skey)

    console.log("MIDDLEWARE START")
    console.log("cookie", cookie)
    
    try {
        console.log("Beginning of the try middleware")
        if (!cookie) {
            console.log('no cookie')
            return NextResponse.rewrite(new URL('/login', request.url))
        }
        const { payload, protectedHeader } = await jose.jwtVerify(cookie.value, key, {
           
          })
          //in chat right now
          console.log("protectedheader", protectedHeader)
          console.log("payload",payload)

        console.log('after jwt verify')
        if (request.nextUrl.pathname.startsWith('/about')) {
            console.log('middleware about')
            return NextResponse.rewrite(new URL('/', request.url))
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