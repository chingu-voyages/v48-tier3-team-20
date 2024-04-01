import dbConnect from "@/lib/mongo/index";
import Users, { IUsers } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req:Request, {
    params,
  }: {
    params: { username: string };
  }){
    console.log(params)
    try{
        await dbConnect();
        const publicData = await Users.findOne({username: params.username}).select("interest username email profile_pic bio")

        return NextResponse.json({message: "Public data", data: publicData})

    } catch(err){
        console.log(err)
    }
}