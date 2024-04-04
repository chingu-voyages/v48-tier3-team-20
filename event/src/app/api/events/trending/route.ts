import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const trendingEvents = await Event.aggregate([
    { $match: { "eventEndDate": { $gt: new Date() } } },
    { $addFields: { "participantCount": { "$size": '$participants' } } },
    { $sort: { "participantCount": -1 } },
    { $limit: 3 }
  ]);

  return NextResponse.json(trendingEvents)
}