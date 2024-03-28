import dbConnect from "@/lib/mongo/index";
import User, { Users } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { createJwt, UserJWTPayload } from "@/lib/authHelper";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const user: Users | null = await User.findOne({ email: body.email }).exec();

    if (!user) {
      return NextResponse.json(
        { message: "No user by that email..." },
        { status: 400 },
      );
    }

    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      return NextResponse.json(
        { message: "Email or password do not match..." },
        { status: 400 },
      );
    }

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
