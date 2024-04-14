import { NextResponse } from "next/server";
import { searchEvents } from "@/lib/mongo/helper";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ Error: "No query" });
  }

  try {
    const queryEvents = await searchEvents(q);

    if (queryEvents[0]) {
      return NextResponse.json({
        message: "results found..",
        data: queryEvents,
      });
    }
    return NextResponse.json({ message: "No results found..." });
  } catch (error) {
    const err = error as Error;
    console.log("error caught in /api/events/search:", err);
    const response = NextResponse.json({ Error: err.message });
    return response;
  }
}
