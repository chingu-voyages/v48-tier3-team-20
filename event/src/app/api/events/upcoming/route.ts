import { NextRequest, NextResponse } from "next/server";
import { getUpcoming } from "@/lib/mongo/helper";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let n = Number(searchParams.get("n"));
  if (!n || isNaN(n)) {
    n = 0;
  }

  try {
    const upcomingEvents = getUpcoming(n);

    return NextResponse.json({ data: upcomingEvents });
  } catch (error) {
    const err = error as Error;
    console.log("error caught:", error);
    console.log(err.name, err.message);
    return NextResponse.json(error);
  }
}
