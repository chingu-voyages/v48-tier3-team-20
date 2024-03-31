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
      body: { error: 'Data Invalid', details: validate.error },
    }, { status: 400 }
    )
  }

  let skey: string = process.env.SECRETKEY!;
  let cookie = req.cookies.get("accessToken")
  const key = new TextEncoder().encode(skey)
  if (!cookie) {
    console.log('no cookie')
    return NextResponse.json({
      body: { error: 'Unauthorized', details: 'User is not authenticated. Please login' },
    }, { status: 401 })
  }

  const { payload, protectedHeader }: { payload: IUserPayload, protectedHeader: any } = await jose.jwtVerify(cookie.value, key, {})
  if (!payload.isSubscribed) {
    return NextResponse.json({ error: "Unauthorized", details: "User is not subscribed to the service. Subscription is required to access this feature." }, { status: 401 })
  }

  await dbConnect();

  if (!body.slug) {
    body.slug = body.name.split(' ').join('-')
  }

  const isExist = await Event.exists({
    $or: [
      { name: body.name },
      { slug: body.slug }
    ]
  });

  if (isExist) {
    return NextResponse.json({ error: "Duplicate Entry", details: "The provided name or slug already exists. Please use a unique name or slug." }, { status: 409 })
  }
  const event = await Event.create({ ...body, host: payload.userId });
  return NextResponse.json(event);
}