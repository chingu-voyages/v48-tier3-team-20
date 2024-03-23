import User, { Users } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import dbConnect from "@/lib/mongo";

export async function POST(request: NextRequest): Promise<NextResponse> {

    await dbConnect();
    
    try {
        const reqBody = await request.json();
        const { fullname, email, username, password, isSubscribed }: {fullname: string, email: string, username: string, password: string, isSubscribed: boolean } = reqBody;
       
        const user: Users | null = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already exists with that email" }, { status: 400 });
        }
        
        const salt: string = await bcryptjs.genSalt(10);
        const hashedPassword: string = await bcryptjs.hash(password, salt);

        const newUser: Users = new User({
            fullname,
            email,
            username,
            password: hashedPassword,            
            isSubscribed            
        });

        const savedUser: Users = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
