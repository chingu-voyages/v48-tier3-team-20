import dbConnect from "@/lib/mongo/index";
import Users from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/authHelper";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const token = await req.cookies.get("accessToken");
  if (!token) {
    return NextResponse.json({ message: "No token" });
  }
  try {
    const data = await verifyJwt(token.value);
    if (!data.data) {
      return NextResponse.json({ message: "no data" });
    }
    await dbConnect();

    const publicData = await Users.findOne({ _id: data.data.userId }).select(
      "username email bio interests profil_pic name",
    );

    return NextResponse.json({ message: "Public data", data: publicData });
  } catch (error) {
    const err = error as Error;
    console.log("error caught:", error);
    console.log(err.name, err.message);
    return NextResponse.json(error);
  }
}
