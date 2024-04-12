import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let limit = true;
  let n = Number(searchParams.get("n"));
  if (!n || isNaN(n)) {
    limit = false;
  }
  try {
    await dbConnect();

    const trendingEvents = limit
      ? await Event.aggregate([
          { $match: { eventStartDate: { $gt: new Date() } } },
          { $addFields: { participantCount: { $size: "$participants" } } },
          { $sort: { participantCount: -1 } },
          { $limit: n },
        ])
      : await Event.aggregate([
          { $match: { eventStartDate: { $gt: new Date() } } },
          { $addFields: { participantCount: { $size: "$participants" } } },
          { $sort: { participantCount: -1 } },
        ]);
    console.log(trendingEvents);

    return NextResponse.json(trendingEvents);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
