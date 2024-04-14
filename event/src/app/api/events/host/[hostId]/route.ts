import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo";

export async function GET(
  req: NextRequest,
  { params }: { params: { hostId: string } },
) {
  const { searchParams } = new URL(req.url);
  let n = Number(searchParams.get("n"));
  const type = searchParams.get("type");
  let limit = true;
  let sortOpt = {};
  let filterOpt = {};
  if (!n || isNaN(n)) {
    limit = false;
  }
  if (type === "past") {
    filterOpt = { $lt: new Date() };
    sortOpt = { eventStartDate: -1 };
  } else {
    filterOpt = { $gt: new Date() };
    sortOpt = { eventStartDate: 1 };
  }

  try {
    await dbConnect();

    const events = limit
      ? await Event.find({
          host: params.hostId,
          eventStartDate: filterOpt,
        })
          .sort(sortOpt)
          .limit(n)
      : await Event.find({
          host: params.hostId,
          eventStartDate: filterOpt,
        }).sort(sortOpt);

    if (!events) {
      return NextResponse.json({ data: null, error: "No events" });
    }

    return NextResponse.json({ data: events, error: null });
  } catch (error) {
    const err = error as Error;
    console.log("error caught in /api/events/host/[hostId]:", err);
    const response = NextResponse.json({ data: null, error: err.message });
    return response;
  }
}
