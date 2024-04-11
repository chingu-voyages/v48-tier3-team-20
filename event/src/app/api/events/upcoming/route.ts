import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let limit = true;
  let n = Number(searchParams.get("n"));
  if (!n || isNaN(n)) {
    limit = false;
  }
  console.log(n);
  try {
    await dbConnect();

    const upcomingEvents = limit
      ? await Event.aggregate([
          { $match: { eventStartDate: { $gt: new Date() } } },
          { $sort: { eventStartDate: 1 } },
          { $limit: n },
        ])
      : await Event.aggregate([
          { $match: { eventStartDate: { $gt: new Date() } } },
          { $sort: { eventStartDate: 1 } },
        ]);
    console.log(upcomingEvents);

    return NextResponse.json(upcomingEvents);
  } catch (error) {
    const err = error as Error;
    console.log("error caught:", error);
    console.log(err.name, err.message);
    return NextResponse.json(error);
  }
}
