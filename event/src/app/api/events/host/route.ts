import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose';
import { IUserPayload } from "../../users/login/route";
import dbConnect from "@/lib/mongo";

export async function GET(req: NextRequest) {

  let skey: string = process.env.SECRETKEY!;
  let cookie = req.cookies.get("accessToken")
  const key = new TextEncoder().encode(skey)
  if (!cookie) {
    console.log('no cookie')
    console.log(req.cookies)
    return NextResponse.json({
      status: 400,
      body: { error: 'Data Invalid', details: 'Not Authorized' },
    })
  }

  const { payload, protectedHeader }: { payload: IUserPayload, protectedHeader: any } = await jose.jwtVerify(cookie.value, key, {})

  if (!payload.userId) {
    return NextResponse.json({ error: "Invalid user" })
  }

  await dbConnect()

  const events = await Event.find({ host: payload.userId })
  return NextResponse.json(events)
}

