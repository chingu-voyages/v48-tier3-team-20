import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod'
import * as jose from 'jose';
import { IUserPayload } from "../../users/login/route";

export const EventSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  slug: z.string().optional(),
  description: z.string(),
  location: z.string(),
  imgPoster: z.string(),
  category: z.array(z.string()),
  eventStartDate: z.string().pipe(z.coerce.date()),
  eventEndDate: z.string().optional(),
  lastDateToJoin: z.string().pipe(z.coerce.date()),
  maximumParticipants: z.number(),
  participants: z.array(z.string())
})

export type IEvent = z.infer<typeof EventSchema>


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

  console.log(payload);

  if (!payload.userId) {
    return NextResponse.json({ error: "Invalid user" })
  }

  const events = await Event.find({ host: payload.userId })
  return NextResponse.json(events)
}

