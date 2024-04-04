import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo";

export async function GET(req: NextRequest, { params }: { params: { hostId: string }; }) {

  await dbConnect()
  const events = await Event.find({ host: params.hostId })
  if (events.length === 0) {
    return NextResponse.json("user is not a host")
  }
  return NextResponse.json(events)
}

