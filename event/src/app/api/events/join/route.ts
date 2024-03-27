import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// todo: add types
// todo: refactor shared code

// workflow:
// check auth and get user id from mongo
// get event from mongo and check participants list
// add to list if not in list

export async function PUT(request: NextRequest) {
  const skey: string = process.env.SECRETKEY!;
  const cookie = request.cookies.get("accessToken");
  const key = new TextEncoder().encode(skey);

  if (!cookie) {
    return NextResponse.json({
      status: 400,
      body: { error: "Please login, to redirect to login page" },
    });
  }

  try {
    await dbConnect();

    const { payload } = await jose.jwtVerify(cookie.value, key, {});

    console.log("payload", payload);

    if (!payload.userid) {
      return NextResponse.json({ error: "Invalid user" });
    }

    const user = await User.findById(payload.userid);

    console.log("user", user);

    if (!user) {
      return NextResponse.json({ error: "No such user in db" });
    }

    const { eventId } = await request.json();

    // eventId for testing
    // const eventId = "6602d50fffeaf0f99e6ce171";

    const event = await Event.findById(eventId);

    console.log("event", event);

    if (!event) {
      return NextResponse.json({ error: "No such event in db" });
    }

    if (event.participants.includes(payload.userid)) {
      return NextResponse.json({ message: "User already in list" });
    }

    await Event.findByIdAndUpdate(eventId, {
      participants: [...event.participants, payload.userid],
    });

    return NextResponse.json({ message: "Successfully joined" });
  } catch (error) {
    const err = error as Error;
    console.log("error caught:", error);
    console.log(err.name, err.message);
    return NextResponse.json(error);
  }
}
