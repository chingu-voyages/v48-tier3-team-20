import dbConnect from '@/lib/mongo/index';
import Users from '@/models/User';
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


export async function POST(req: Request) {
        await dbConnect();
        const body = await req.json();
        const user = await Users.findOne({ email: body.email }).exec();
        //peepoo@gmail.com

        if (!user) {
            console.log("NO user")
            return NextResponse.json({ message: "No user by that email..." }, {status: 500})
        }

    try {
        const match = body.password === user.password; //await bcrypt.compare(body.password, user[0].password);
        if (match) {
            //login
            const payload = JSON.parse(JSON.stringify(user._id))
            const token = jwt.sign(payload, "privateKey");
            return NextResponse.json({ "token": token });
         
        } else {
            return NextResponse.json({ message: "Email or password do not match..." }, { status: 500 })
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Wrong email or password.." })

    }
}