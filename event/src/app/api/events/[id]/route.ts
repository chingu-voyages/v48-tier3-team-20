import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import dbConnect from "@/lib/mongo";
import { UpdateEventValidator } from "@/lib/validator";
import { verifyJwt } from "@/lib/authHelper";
import { parseEventFormData } from "@/lib/utils";
import { uploadImageToCloudinary, deleteImage } from "@/lib/cloudinary";
import { CloudinaryResponse, EventCategory, UpdateEvent } from "@/lib/types";

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
  const imgPoster = formData.get("imgPoster") as File;

  const formDataObject = parseEventFormData(formData) as UpdateEvent;
  formDataObject.category = formData.getAll("category") as EventCategory[];
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
    // upload new imgPoster
    const arrayBuffer = await imgPoster.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const results = await uploadImageToCloudinary(buffer, imgPoster.name);
    formDataObject.imgPoster = (results as CloudinaryResponse).url;

    // delete old imgPoster
    const { imgPoster: prevImgPosterUrl } = await Event.findOne({
      _id: id,
    }).select("imgPoster");
    const res = await deleteImage(prevImgPosterUrl);
    if (res.error) {
      console.log(res.error);
    }
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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await dbConnect();
    console.log("event");
    const event = await Event.findOne({ _id: params.id })
      .populate({ path: "participants", select: "username" })
      .exec();
    console.log(event);
    if (!event) {
      return NextResponse.json({ error: "Nothing..." });
    }
    return NextResponse.json({ data: event });
  } catch (error) {
    const err = error as Error;
    console.log("error caught in /api/events/user/[userId]:", err);
    return NextResponse.json({ data: null, error: err.message });
  }
}
