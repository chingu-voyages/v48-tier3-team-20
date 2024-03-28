import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// workflow:
// check auth and get user id from mongo
// get event from mongo and sort into lists by category
// send data to client

export async function GET(request: NextRequest) {
    console.log("VERY FIRST")
    /*
  const skey: string = process.env.SECRETKEY!;
  const cookie = request.cookies.get("accessToken");
  const key = new TextEncoder().encode(skey);
  console.log("Cookie?", cookie)
  if (!cookie) {
    return NextResponse.json({
      status: 400,
      body: { error: "Please login, to redirect to login page" },
    });
  }
*/
  try {
    await dbConnect();

    // const { payload } = await jose.jwtVerify(cookie.value, key, {});

    // console.log("payload", payload);

    // if (!payload.userid) {
    //   return NextResponse.json({ error: "Invalid user" });
    // }

    // const user = await User.findById(payload.userid);

    // console.log("user", user);

    // if (!user) {
    //   return NextResponse.json({ error: "No such user in db" });
    // }

    //const { eventId } = await request.json();

    console.log("test test")
    const event = await Event.find({});

    console.log("event", event);

    if (!event) {
      return NextResponse.json({ error: "No events in db" });
    }
    
    return NextResponse.json({ message: "Successfully joined" });
  } catch (error) {
    const err = error as Error;
    console.log("error caught:", error);
    console.log(err.name, err.message);
    return NextResponse.json(error);
  }
}
