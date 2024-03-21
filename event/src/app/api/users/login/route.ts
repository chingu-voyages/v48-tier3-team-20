import dbConnect from '@/lib/mongo/index';
import Users from '@/models/User';
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";



export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        console.log(body);
        const user = await Users.find({ email: body.email });

        const match = await bcrypt.compare(body.password, user[0].password);

        if(match){
            //login
            return NextResponse.json({ message: "Login success!" })
        } else {
            console.log("Passwords don't match...")
        }
    } catch (err) {
        console.log(err);
    }
}