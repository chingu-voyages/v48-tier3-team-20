import dbConnect from "@/lib/mongo/index";
import Users, { IUsers } from "@/models/User";
import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/authHelper";
import { jwtVerify } from "jose";


//new password is being sent in req along with old password to verify. 
//need to check that old password still matches the user.id in the cookie.
//need to findOneandUpdate with new password.
//use bcrypt for password.

export async function PUT(req: Request) {
    const body = await req.json();
    const token = body.cookies.get("accessToken");
    try {

        await dbConnect();
        const userData = await verifyJwt(token);
        console.log("userDATA",userData)
        //const user = Users.find({userData})


    } catch (err) {
        console.log(err)
    }
}