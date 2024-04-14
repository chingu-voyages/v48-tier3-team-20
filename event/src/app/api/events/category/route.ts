import { FULL_CATEGORIES } from "@/lib/constants";
import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    let result: {} = {};
    for (let category of FULL_CATEGORIES) {
      const events = await Event.aggregate([
        { $match: { category: category } },
        { $addFields: { participantCounts: { $size: "$participants" } } },
        { $sort: { participantCounts: -1 } },
        { $limit: 3 },
      ]);

      if (!events) {
        continue;
      }
      result = { ...result, [category]: events };
    }
    return NextResponse.json({ result });
  } catch (e) {
    return NextResponse.json({ error: "Something went wrong" });
  }
}
