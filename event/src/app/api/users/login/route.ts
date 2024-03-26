import dbConnect from '@/lib/mongo/index';
import Users, { IUsers } from '@/models/User';
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from 'next/headers'
import { SignJWT } from 'jose';

export interface IPayload{
    userId : string;
    isSubscribed : boolean;
}

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const user: IUsers = await Users.findOne({ email: body.email }).exec();
    
    if (!user) {
        console.log("NO user")
        return NextResponse.json({ message: "No user by that email..." }, { status: 500 })
    }

    try {
        const match = await bcrypt.compare(body.password, user.password);
        if (match) {
            //login
            // const payload = JSON.parse(JSON.stringify(user._id))
            const payload : IPayload = {
                userId: user._id,
                isSubscribed: user.isSubscribed
            }
            let skey: string = process.env.SECRETKEY!;

            const key = new TextEncoder().encode(skey)

            const token = await new SignJWT(payload)
                .setProtectedHeader({
                    alg: 'HS256'
                })
                .setExpirationTime("1hr")
                .sign(key);



            cookies().set("accessToken", token, { secure: true, httpOnly: true });
            console.log("token creation", token);

            return NextResponse.json({ success: true });

        } else {
            return NextResponse.json({ message: "Email or password do not match..." }, { status: 400 })
        }

    } catch (error) {
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