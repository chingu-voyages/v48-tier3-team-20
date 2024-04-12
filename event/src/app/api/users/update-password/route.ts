import dbConnect from "@/lib/mongo/index";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/authHelper";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
    const body = await req.json();
    console.log(body)
    const cookie = req.cookies.get("accessToken");
    if (!cookie) {
        return NextResponse.json({message: "no cookie"})
    }

    try {
        await dbConnect();
        const {data, error} = await verifyJwt(cookie.value);
        console.log("userDATA", data)
        if (data) {
            const userId = data.userId;
            const salt: string = await bcrypt.genSalt(10);
            const hashedPassword: string = await bcrypt.hash(body.newPassword, salt);
            const user = await User.findOneAndUpdate({ _id: userId }, {password: hashedPassword});
            console.log(user)
            if(!user){
                throw new Error("User not found.")
            }
            return NextResponse.json({message: "Password changed!"})
        }
    } catch (error) {
        const err = error as Error;
        console.log("error caught in /api/users/update-password:", err);
        const response = NextResponse.json({ Error: err.message });
        return response;
    }
}