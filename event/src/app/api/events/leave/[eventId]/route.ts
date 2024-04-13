import dbConnect from "@/lib/mongo";
import Event, { Events } from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/authHelper";
import User from "@/models/User";

// workflow:
// check auth and get user id from mongo
// get event from mongo and check participants list
// remove from list if still in list

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
    return NextResponse.json(
      {
        body: { error: "Please login, to redirect to login page" },
      },
      { status: 400 },
    );
  }

  try {
    await dbConnect();

    const { data, error } = await verifyJwt(cookie.value);
    if (!data || error) {
      throw new Error(error);
    }

    const leave: Events | null = await Event.findByIdAndUpdate(
      params.eventId,
      {
        $pull: { participants: data.userId },
      },
      { new: true },
    )
      .populate({ path: "participants", model: User, select: "username" })
      .exec();

    if (!leave) {
      throw new Error("No such event found");
    }

    return NextResponse.json({ data: leave });
  } catch (error) {
    const err = error as Error;
    console.log("error caught in api/events/leave/[eventid]:", err);
    return NextResponse.json({ error: err.message });
  }
}
