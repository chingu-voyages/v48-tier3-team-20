import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";
import z from 'zod'
import * as jose from 'jose';
import { IPayload } from "../../users/login/route";

const EventSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  location: z.string(),
  imgPoster: z.string(),
  category: z.array(z.string()),
  eventStartDate: z.string().pipe(z.coerce.date()),
  eventEndDate: z.string().optional(),
  lastDateToJoin: z.string().pipe(z.coerce.date()),
  maximumParticipants: z.number(),
  host: z.string(),
  participants: z.array(z.string())
})

type IEvent = z.infer<typeof EventSchema>

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
      body: { error: 'Data Invalid', details: 'Not Authorized'},
    })
  }
  
  const { payload, protectedHeader } : {payload : IPayload, protectedHeader: any} = await jose.jwtVerify(cookie.value, key, {})

  if(!payload.isSubscribed){
    return NextResponse.json({ error: "User not subscribed" })
  }
  await dbConnect();

  const isExist = await Event.findOne({ name: body.name })
  if (isExist) {
    return NextResponse.json({ error: "Name is already exist" })
  }
  const event = await Event.create(body);
  return NextResponse.json(validate);
}

export async function GET(req: NextRequest) {
  
  let skey: string = process.env.SECRETKEY!;
  let cookie = req.cookies.get("accessToken")
  const key = new TextEncoder().encode(skey)
  if (!cookie) {
    console.log('no cookie')
    console.log(req.cookies)
    return NextResponse.json({
      status: 400,
      body: { error: 'Data Invalid', details: 'Not Authorized'},
    })
  }
  
  const { payload, protectedHeader } : {payload : IPayload, protectedHeader: any} = await jose.jwtVerify(cookie.value, key, {})

  console.log(payload);
  

  if(!payload.userId){
    return NextResponse.json({ error: "Invalid user" }) 
  } 

  const events = await Event.find({ host: payload.userId })
  return NextResponse.json(events)
}
