import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import z, { unknown } from 'zod'
import * as jose from 'jose';
import { IUserPayload } from "../../users/login/route";
import { CATEGORIES } from "@/lib/constants";
import { handler } from "../../middleware/handler";

export const EventSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string().optional(),
  description: z.string(),
  location: z.string(),
  imgPoster: z.string(),
  category: z.array(z.enum(CATEGORIES)),
  eventStartDate: z.string().pipe(z.coerce.date()),
  eventEndDate: z.string().pipe(z.coerce.date()).optional(),
  lastDateToJoin: z.string().pipe(z.coerce.date()),
  maximumParticipants: z.number(),
  host: z.string(),
  participants: z.array(z.string())
})
export type IEvent = z.infer<typeof EventSchema>
const createEventSchema = EventSchema.omit({ _id: true })

export const isAuthenticated = async (req: NextRequest): Promise<{ authenticated: boolean, userId?: string, isSubscribed: boolean }> => {
  let skey: string = process.env.SECRETKEY!;
  let cookie = req.cookies.get("accessToken")
  const key = new TextEncoder().encode(skey)
  let authenticated = false
  let userId = ''
  let isSubscribed = false
  if (!cookie) {
    console.log('no cookie')
    return { authenticated, userId, isSubscribed }
  }
  const { payload, protectedHeader }: { payload: IUserPayload, protectedHeader: any } = await jose.jwtVerify(cookie.value, key, {})
  if (!payload.userId) {
    return { authenticated, isSubscribed }
  }
  authenticated = true
  userId = payload.userId
  if (!payload.isSubscribed) {
    return { authenticated, userId, isSubscribed }
  }
  isSubscribed = true
  return { authenticated, userId, isSubscribed }
}

export const sendResponse = async (status: number, message: string, data?: any) => {
  return NextResponse.json({
    status,
    body: { message, data }
  })
}

export async function POST(req: NextRequest) {
  const { authenticated, userId, isSubscribed } = await isAuthenticated(req)
  if (!authenticated || !isSubscribed || !userId) {
    return sendResponse(400, 'Not Authorized')
  }
  const body: IEvent = await req.json();
  const validate = createEventSchema.safeParse(body);
  if (!validate.success) {
    return sendResponse(400, validate.error.message)
  }
  if (!body.slug) {
    body.slug = body.name.split(' ').join('-')
  }
  try {
    await dbConnect();
    const isExist = await Event.exists({
      $or: [
        { name: body.name },
        { slug: body.slug }
      ]
    });
    if (isExist) {
      return sendResponse(400, 'Event with this name/slug already exist')
    }
    const event = await Event.create(body);
    return sendResponse(200, 'Create Event Success', event)
  } catch (e) {
    const error = e as Error
    return sendResponse(400, error.message)
  }
}

// export async function GET(req: NextRequest) {
//   const { authenticated, userId, isSubscribed } = await isAuthenticated(req)
//   if (!authenticated || !isSubscribed || !userId) {
//     return sendResponse(400, 'Not Authorized')
//   }
//   try {
//     const events = await Event.find({ host: userId })
//     return NextResponse.json(events)
//   } catch (e) {
//     const error = e as Error
//     return sendResponse(400, error.message)
//   }
// }


// Middleware
export const checkAuth = async (req: NextRequest, next: () => Promise<void>) => {
  let skey: string = process.env.SECRETKEY!;
  let cookie = req.cookies.get("accessToken")
  const key = new TextEncoder().encode(skey)
  if (!cookie) {
    console.log('no cookie')
    return sendResponse(400, "nothing")
  }
  const { payload, protectedHeader }: { payload: IUserPayload, protectedHeader: any } = await jose.jwtVerify(cookie.value, key, {})
  if (!payload.userId) {
    return sendResponse(400, "nothing")

  }
  if (!payload.isSubscribed) {
    return sendResponse(400, "nothing")
  }
  req.user = payload
  next()
  return sendResponse(200, "nothing")

}
// Controller
export const getAllEventsByHost = async (req: NextRequest) => {
  try {
    const events = await Event.find({
      host: req.user.userId
    })
    return NextResponse.json(events)
  } catch (e) {
    const error = e as Error
    return sendResponse(400, error.message)
  }
}

export const GET = handler(
  checkAuth,
  getAllEventsByHost
)


export async function PUT(req: NextRequest) {
  const { authenticated, isSubscribed, userId } = await isAuthenticated(req)
  if (!authenticated || !isSubscribed || !userId) {
    return sendResponse(400, 'Not Authorized')
  }
  const body: IEvent = await req.json();
  const validate = EventSchema.safeParse(body);
  if (!validate.success) {
    return sendResponse(400, validate.error.message)
  }
  try {
    await dbConnect();
    const updatedEvent = await Event.findOneAndUpdate({ _id: body._id, host: userId }, body, { new: true })
    if (updatedEvent) {
      return sendResponse(200, 'success', updatedEvent)
    }
    return sendResponse(400, 'nothing')
  } catch (e) {
    const error = e as Error
    return sendResponse(500, error.message)
  }
}