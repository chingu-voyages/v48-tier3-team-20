import { NextRequest, NextResponse } from "next/server";
import { getTrending } from "@/lib/mongo/helper";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let n = Number(searchParams.get("n"));
  if (!n || isNaN(n)) {
    n = 0;
  }
  try {
    const trendingEvents = await getTrending(n);

    return NextResponse.json({ data: trendingEvents });
  } catch (error) {
    const err = error as Error;
    console.log("error caught:", error);
    console.log(err.name, err.message);
    return NextResponse.json(error);
  }
}
