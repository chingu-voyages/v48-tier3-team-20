import dbConnect from "@/lib/mongo/index";
import Users from "@/models/User";
import { NextResponse } from "next/server";
import Events from "@/models/Event";
import { createMongoEvent } from "@/lib/dummyBackend";

// usage: go to http://localhost:3000/api/events/createDummyEvents?n=1
// the number n will represent the number of dummy events to insert into mongo

export async function GET(request: Request) {
  // NOT FOR PRODUCTION
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({
      error: "NOT FOR PRODUCTION",
    });
  }

  const { searchParams } = new URL(request.url);
  const n = Number(searchParams.get("n"));

  if (isNaN(n) || n < 1 || n > 100) {
    return NextResponse.json({
      message: "Please specify n as a number between 1 and 100",
    });
  }

  try {
    await dbConnect();

    const user = await Users.find({ email: "dummy@host.com" });
    if (user.length === 0 || user[0].isSubscribed === false) {
      throw new Error("Invalid host");
    }
    const hostId = user[0].id;

    // insert one event using save
    // const dummyEvent = createMongoEvent(hostId);
    // const newEvent = await Events.create(dummyEvent);
    // await newEvent.save();

    const dummyEvents = [];
    for (let i = 0; i < n; i++) {
      dummyEvents.push(createMongoEvent(hostId));
    }
    await Events.insertMany(dummyEvents);

    return NextResponse.json({ success: true, dummyEvents });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
