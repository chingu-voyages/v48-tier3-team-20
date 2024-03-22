import Cookies from "js-cookie";
import type { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'


export function middleware(req: NextRequest, res: NextResponse) {

    if (req.nextUrl.pathname === "/api/users/login") {
        if (!req.headers ){//.authorization) {
            return null
        }
        console.log(req.headers)

    }
}