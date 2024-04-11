import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongo";
import { verifyJwt } from "@/lib/authHelper";
import Event from "@/models/Event";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { searchParams } = new URL(req.url);
  let n = Number(searchParams.get("n"));
  const type = searchParams.get("type");
  let limit = true;
  let sortOpt = {};
  if (!n || isNaN(n)) {
    limit = false;
  }
  if (type === "past") {
    sortOpt = { $lt: new Date() };
  } else {
    sortOpt = { $gt: new Date() };
  }

  const cookie = req.cookies.get("accessToken");

  if (!cookie) {
    return NextResponse.json({ error: "User not logged in", data: null });
  }

  try {
    const { data, error } = await verifyJwt(cookie.value);

    if (!data || error) {
      throw new Error("Invalid or expired JWT");
    }

    await dbConnect();

    const events = limit
      ? await Event.find({
          participants: params.userId,
          eventStartDate: sortOpt,
        }).limit(n)
      : await Event.find({
          participants: params.userId,
          eventStartDate: sortOpt,
        });

    if (!events) {
      return NextResponse.json({ data: null, error: "No events" });
    }

    return NextResponse.json({ data: events, error: null });
  } catch (error) {
    const err = error as Error;
    console.log("error caught in /api/events/user/[userId]:", err);
    const response = NextResponse.json({ data: null, error: err.message });
    return response;
  }
}
