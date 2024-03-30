import { IUserPayload } from "@/app/api/users/login/route";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import Event, { Events } from "@/models/Event";
import dbConnect from "@/lib/mongo";
import { EventSchema, IEvent } from "./host/route";

export async function POST(req: NextRequest) {

  const body: IEvent = await req.json();
  const validate = EventSchema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json({
      status: 400,
      body: { error: 'Data Invalid', details: validate.error },
    })
  }

  let skey: string = process.env.SECRETKEY!;
  let cookie = req.cookies.get("accessToken")
  const key = new TextEncoder().encode(skey)
  if (!cookie) {
    console.log('no cookie')
    return NextResponse.json({
      status: 400,
      body: { error: 'Data Invalid', details: 'Not Authorized' },
    })
  }

  const { payload, protectedHeader }: { payload: IUserPayload, protectedHeader: any } = await jose.jwtVerify(cookie.value, key, {})
  if (!payload.userId) {
    return NextResponse.json({ error: "User not subscribed" })
  }
  await dbConnect();

  const isExist = await Event.findOne({ name: body.name })
  if (isExist) {
    return NextResponse.json({ error: "Name is already exist" })
  }
  const event = await Event.create({ ...body, host: payload.userId });
  return NextResponse.json(event);
}