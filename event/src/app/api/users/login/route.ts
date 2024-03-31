import dbConnect from '@/lib/mongo/index';
import Users, { IUsers } from '@/models/User';
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from 'next/headers'
import { SignJWT } from 'jose';
import { JwtPayload } from 'jsonwebtoken';
import { createJwt, UserJWTPayload } from "@/lib/authHelper";

// to update with authHelper later

export interface IUserPayload extends JwtPayload {
    userId: string;
    isSubscribed: boolean;
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const user: IUsers = await Users.findOne({ email: body.email }).exec();

    if (!user) {
      return NextResponse.json(
        { message: "No user by that email..." },
        { status: 400 },
      );
    }


    try {
        const match = await bcrypt.compare(body.password, user.password);
        if (match) {
            // login
            // const payload = JSON.parse(JSON.stringify(user._id))
            const userPayload: IUserPayload = {
                userId: user._id,
                isSubscribed: user.isSubscribed
            }
            let skey: string = process.env.SECRETKEY!;

            const key = new TextEncoder().encode(skey)
            
            const token = await new SignJWT(userPayload)
                .setProtectedHeader({
                    alg: 'HS256'
                })
                .setExpirationTime("1hr")
                .sign(key);



            cookies().set("accessToken", token, { secure: true, httpOnly: true });
            console.log("token creation", token);

            return NextResponse.json({ success: true });

    const payload: UserJWTPayload = {
      userId: user._id as string,
      isSubscribed: user.isSubscribed,
    };

    const token = await createJwt(payload);

    cookies().set("accessToken", token, { secure: true, httpOnly: true });
    console.log("token creation", token);

    return NextResponse.json({ message: "Successfully logged in" });
  } catch (error) {
    const err = error as Error;
    console.log("error caught in api/users/login:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
