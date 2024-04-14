import { NextRequest, NextResponse } from "next/server";
import { getAllCategory } from "@/lib/mongo/helper";

export async function GET(req: NextRequest) {
  try {
    const result = await getAllCategory();
    return NextResponse.json({ result });
  } catch (e) {
    return NextResponse.json({ error: "Something went wrong" });
  }
}
