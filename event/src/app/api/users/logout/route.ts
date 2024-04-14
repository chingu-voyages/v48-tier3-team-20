import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  cookies().delete("accessToken");
  return NextResponse.json({ message: "accessToken cookie deleted" });
}
