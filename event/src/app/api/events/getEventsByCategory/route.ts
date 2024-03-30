import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

// workflow:
// check auth and get user id from mongo
// get event from mongo and sort into lists by category
// send data to client

export async function GET(request: NextRequest) {

  try {
    
    await dbConnect();

    const event = await Event.find({});
   
    if (!event) {
      return NextResponse.json({ error: "No events in db" });
    }
    return NextResponse.json({ message: "Successfully joined", data: event });
  } catch (error) {
    const err = error as Error;
    console.log("error caught:", error);
    console.log(err.name, err.message);
    return NextResponse.json(error);
  }
}
