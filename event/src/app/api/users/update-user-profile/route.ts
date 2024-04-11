import dbConnect from "@/lib/mongo/index";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/authHelper";



//Right now only updates BIO and interests. Not sure if we should allow email or name to be changed too. 
export async function PUT(req: NextRequest) {
    const body = await req.json();
    const cookie = req.cookies.get("accessToken");
    if (!cookie) {
        return NextResponse.json({message: "no cookie"})
    }

    try {
        console.log("updating user...")
        await dbConnect();
        const {data, error} = await verifyJwt(cookie.value);
        if (data) {
            const newBio = body.newBio;
            const newInterests = body.newInterests;
            const userId = data.userId;
            const newName = body.newName;
            const user = await User.findOneAndUpdate({ _id: userId }, {bio: newBio, interests: newInterests, fullname: newName});
            console.log("new user info", user.fullname)
            if(!user){
                throw new Error("User not found.")
            }
            return NextResponse.json({message: "Bio changed!"})
        }
    } catch (error) {
        const err = error as Error;
        console.log("error caught in /api/users/update-password:", err);
        const response = NextResponse.json({ Error: err.message });
        return response;
    }
}