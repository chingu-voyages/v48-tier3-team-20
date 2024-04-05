import dbConnect from "@/lib/mongo/index";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/authHelper";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const token = body.cookies.get("accessToken");
    try {
        await dbConnect();
        const userData = await verifyJwt(token);
        console.log("userDATA", userData)
        if (userData.data) {
            const userId = userData.data.userId;
            const salt: string = await bcrypt.genSalt(10);
            const hashedPassword: string = await bcrypt.hash(body.newPassword, salt);
            const user = User.findOneAndUpdate({ _id: userId }, {password: hashedPassword});
            return NextResponse.json({message: "Password changed!", data: user})
        }
    } catch (err) {
        console.log(err)
    }
}