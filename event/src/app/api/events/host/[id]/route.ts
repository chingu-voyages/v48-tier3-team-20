import { IUserPayload } from "@/app/api/users/login/route";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import Event, { Events } from "@/models/Event";
import dbConnect from "@/lib/mongo";

export async function GET(req: NextRequest, content: any) {

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
  console.log(payload);

  if (!payload.userId) {
    return NextResponse.json({ error: "Invalid user" })
  }

  const id = content.params.id
  console.log(id)
  await dbConnect();
  const event: Events | null = await Event.findById(id)
  if (event?.host.equals(payload.userId)) {
    return NextResponse.json(event)
  }
  return NextResponse.json({ error: "you are not the host! or event doesn't exist" })
}

export async function DELETE(req: NextRequest, content: any) {
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
    return NextResponse.json({ error: "Invalid user" })
  }
  const id = content.params.id
  await dbConnect();
  const event: Events | null = await Event.findById(id)
  if (!event) {
    return NextResponse.json({ error: "Event doesn't exist" })
  }
  if (!event.host.equals(payload.userId)) {
    return NextResponse.json({ error: "Not Authorized" })
  }
  await Event.findByIdAndDelete(id)
  return NextResponse.json({ success: "Event Deleted" }) 
}