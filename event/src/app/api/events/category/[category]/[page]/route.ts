import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { category: string, page: number } }) {

  try {
    console.log("GET REQUEST")
    await dbConnect();

    const limit = 2
    const currPage = params.page
    console.log(currPage)
    const events = await Event.find({ category: params.category }).skip((currPage - 1) * limit).limit(limit)
    if (!events || events.length === 0) {
      return NextResponse.json({ error: "No events in db" });
    }
    return NextResponse.json({ message: "Successfully joined", data: events });
  } catch (error) {
    const err = error as Error;
    console.log("error caught:", error);
    console.log(err.name, err.message);
    return NextResponse.json(error);
  }
}