import { IUserPayload } from "@/app/api/users/login/route";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import Event from "@/models/Event";
import dbConnect from "@/lib/mongo";
import { UpdateEvent } from "@/lib/types";
import { UpdateEventValidator } from "@/lib/validator";

export async function DELETE(req: NextRequest, content: any) {
  let skey: string = process.env.SECRETKEY!;
  let cookie = req.cookies.get("accessToken")
  const key = new TextEncoder().encode(skey)
  if (!cookie) {
    console.log('no cookie')
    return NextResponse.json({
      body: { error: 'Invalid User' },
    }, { status: 400 })
  }

  const { payload, protectedHeader }: { payload: IUserPayload, protectedHeader: any } = await jose.jwtVerify(cookie.value, key, {})
  if (!payload.userId) {
    return NextResponse.json({ error: "Invalid User" })
  }
  const id = content.params.id
  await dbConnect();
  const event = await Event.findOneAndDelete({ _id: id, host: payload.userId })
  if (!event) {
    return NextResponse.json({ error: "Event Not Found" })
  }
  return NextResponse.json({ success: "Event Deleted" })
}

export async function PUT(req: NextRequest, content: any) {
  const id = content.params.id
  const body: UpdateEvent = await req.json();
  const validate = UpdateEventValidator.safeParse(body);
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
  if (!payload) {
    return NextResponse.json({ error: "User not subscribed" })
  }
  await dbConnect();

  const updatedEvent = await Event.findOneAndUpdate({ _id: id, host: payload.userId }, body, { new: true })

  if (updatedEvent) {
    return NextResponse.json(updatedEvent);
  }

  return NextResponse.json({ error: "Nothing..." })
}
