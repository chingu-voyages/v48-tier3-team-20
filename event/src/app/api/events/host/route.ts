import dbConnect from "@/lib/mongo";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  
  await dbConnect()
  const hosts = await User.find({ isSubscribed: true })

  return NextResponse.json(hosts)

}