import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import dbConnect from "@/lib/mongo";
import { UpdateEventValidator } from "@/lib/validator";
import { verifyJwt } from "@/lib/authHelper";
import { parseEventFormData, uploadImageToCloudinary } from "@/lib/utils";
import { CloudinaryResponse, UpdateEvent } from "@/lib/types";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  let cookie = req.cookies.get("accessToken");
  if (!cookie) {
    return NextResponse.json({ error: "no auth token" });
  }

  const { data, error } = await verifyJwt(cookie.value);
  if (error !== null) {
    return NextResponse.json({ error: "auth token invalid" });
  }

  const id = params.id;
  await dbConnect();
  const event = await Event.findOneAndDelete({ _id: id, host: data.userId });
  if (!event) {
    return NextResponse.json({ error: "Event Not Found" });
  }
  return NextResponse.json({ success: "Event Deleted" });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const formData = await req.formData();
  console.log(formData);
  const imgPoster = formData.get("imgPoster") as File;

  // unable to send array via formData for category
  // temp changed to category: z.string() in validator.ts
  const formDataObject = parseEventFormData(formData) as UpdateEvent;
  const validate = UpdateEventValidator.safeParse(formDataObject);

  if (!validate.success) {
    console.log(validate.error);
    return NextResponse.json(
      {
        body: { error: "Data Invalid", details: validate.error },
      },
      { status: 400 },
    );
  }

  let cookie = req.cookies.get("accessToken");
  if (!cookie) {
    return NextResponse.json({ error: "no auth token" });
  }

  const { data, error } = await verifyJwt(cookie.value);

  if (error !== null) {
    return NextResponse.json(error);
  }

  await dbConnect();

  if (imgPoster) {
    const arrayBuffer = await imgPoster.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("PUT /api/event/[id] imgPoster buffer", buffer);
    // const results = await uploadImageToCloudinary(buffer, imgPoster.name);
    // formDataObject.imgPoster = (results as CloudinaryResponse).url;
  }

  const updatedEvent = await Event.findOneAndUpdate(
    { _id: id, host: data.userId },
    formDataObject,
    { new: true },
  );

  if (updatedEvent) {
    return NextResponse.json(updatedEvent);
  }

  return NextResponse.json({ error: "Nothing..." });
}

export async function GET(req: NextRequest, content: any) {
  const id = content.params.id;
  // const body: IEvent = await req.json();
  // const validate = EventSchema.safeParse(body);
  // if (!validate.success) {
  //   return NextResponse.json({
  //     status: 400,
  //     body: { error: 'Data Invalid', details: validate.error },
  //   })
  // }

  await dbConnect();
  const event = await Event.findOne({ _id: id });
  if (event) {
    return NextResponse.json({ data: event });
  }
  return NextResponse.json({ error: "Nothing..." });
}
