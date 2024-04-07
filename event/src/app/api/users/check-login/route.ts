import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/authHelper";
import type { NextRequest } from "next/server";



export async function GET(request: NextRequest) {
    const cookie = request.cookies.get("accessToken");

    if (!cookie) {
        return NextResponse.json({ error: "User not logged in", data: null });
    }

    try {
        const { data, error } = await verifyJwt(cookie.value);

        if (!data || error) {
            throw new Error("Invalid or expired JWT");
        }

        return NextResponse.json({ data, error: null });
    } catch (error) {
        const err = error as Error;
        console.log("error caught in /api/users:", err);
        const response = NextResponse.json({ isLogin: false });
        response.cookies.delete("accessToken");
        return response;
    }
}
