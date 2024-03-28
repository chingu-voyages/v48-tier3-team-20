import dbConnect from "@/lib/mongo";
import Event, { Events } from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/authHelper";

// workflow:
// check auth and get user id from mongo
// get event from mongo and check participants list
// add to list if not in list

// eventId for testing
// const eventId = "6602d50fffeaf0f99e6ce171";

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: { eventId: string };
  },
) {
  const cookie = request.cookies.get("accessToken");

  if (!cookie) {
    return NextResponse.json({
      status: 400,
      body: { error: "Please login, to redirect to login page" },
    });
  }

  try {
    await dbConnect();

    const { data, error } = await verifyJwt(cookie.value);
    if (!data || error) {
      return NextResponse.json({ error });
    }

    const join: Events | null = await Event.findByIdAndUpdate(params.eventId, {
      $push: { participants: data.userId },
    });

    if (!join) {
      return NextResponse.json({ message: "No such event found" });
    }

    return NextResponse.json({ message: "Successfully joined the event" });
  } catch (error) {
    const err = error as Error;
    console.log("error caught in api/events/join/[eventid]:", err);
    return NextResponse.json({ error: "Something went wrong..." });
  }
}
