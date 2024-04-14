import dbConnect from "@/lib/mongo/index";
import Users from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { username: string };
  },
) {
  try {
    await dbConnect();
    const publicData = await Users.findOne({
      username: params.username,
    }).select("interest username email profile_pic bio fullname _id");
 
    return NextResponse.json({ message: "Public data", data: publicData });
  } catch (error) {
    const err = error as Error;
    console.log("error caught:", error);
    console.log(err.name, err.message);
    return NextResponse.json(error);
  }
}
