import { CATEGORIES } from "@/lib/constants";
import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    let result: {} = {}
    for (let i in CATEGORIES) {
      const events = await Event.aggregate([{ $match: { "category": CATEGORIES[i] } }])
        .addFields({ "length": { "$size": '$participants' } })
        .sort({ "length": -1 })
        .limit(3)
      if (!events) {
        continue
      }
      result = { ...result, [CATEGORIES[i]]: events }
    }
    return NextResponse.json({ result })
  } catch (e) {
    return NextResponse.json({ error: "Something went wrong" })
  }
}
