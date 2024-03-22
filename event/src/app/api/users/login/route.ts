import dbConnect from '@/lib/mongo/index';
import Users from '@/models/User';
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const user = await Users.findOne({ email: body.email }).exec();
    //peepoo@gmail.com

    if (!user) {
        console.log("NO user")
        return NextResponse.json({ message: "No user by that email..." }, { status: 500 })
    }

    try {
        const match = await bcrypt.compare(body.password, user.password);
        if (match) {
            //login
            const payload = JSON.parse(JSON.stringify(user._id))
            const token = jwt.sign(payload, "privateKey");
            cookies().set("accessToken", token);
            return NextResponse.json({ success: true });

        } else {
            return NextResponse.json({ message: "Email or password do not match..." }, { status: 500 })
        }
    // }
    // catch (err) {
    //     console.log(err.message);
    //     return NextResponse.json({ message: "Wrong email or password.." })
    // }
}    catch (error) {
        console.log('error caught:', error);
        const err = error as Error;
        console.log(err.name, err.message);

        let errMsg = err.message;

        return Response.json({ error: errMsg }, { status: 400 });
    }
}


// fullname
// "bcrypt-hash-gensalt-10"
// username
// "tsra"
// email
// "test@gm.com"
// password
// "$2b$10$80PB8Qe8k2ijfOQtPxCfneM6MQGiIKm1/0O5Wvp3ffJfQp78nYBze"
// isSubscribed
// false