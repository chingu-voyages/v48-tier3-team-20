import dbConnect from '@/lib/mongo/index';
import Users from '@/models/User';
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'



export async function POST(req: Request) {

    const body = await req.json();
    
    if(!body || !body.email || !body.password){
        return NextResponse.json({ success: false, message: "Please provide email and password."})
    }

    try {
        //peepoo@gmail.com
        await dbConnect();
        const user = await Users.find({ email: body.email });
        const match = body.password === user[0].password; //await bcrypt.compare(body.password, user[0].password);
        if(!user){
            return NextResponse.json({message: "No user by that email..."})
        }
        if(match){
            //login
            const payload = JSON.parse(JSON.stringify(user[0]))
            const token = jwt.sign(payload, "privateKey", { expiresIn: '1hr' });
            return NextResponse.json({ token })
        } else {
            return NextResponse.json({ message: "Email or password do not match..."}, {status: 500})
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({message: "Wrong email or password.."})

    }
}