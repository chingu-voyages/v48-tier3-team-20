import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Event";
import dbConnect from "@/lib/mongo";
import { CreateEventValidator } from "@/lib/validator";
import { verifyJwt } from "@/lib/authHelper";
import { parseEventFormData } from "@/lib/utils";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { CloudinaryResponse, CreateEvent, EventCategory } from "@/lib/types";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const formDataObject = parseEventFormData(formData) as CreateEvent;

  formDataObject.category = formData.getAll("category") as EventCategory[];
  const validate = CreateEventValidator.safeParse(formDataObject);

  const imgPoster = formData.get("imgPoster") as File;

  if (!validate.success) {
    console.log(validate.error);
    return NextResponse.json(
      {
        body: { error: "Data Invalid", details: validate.error },
      },
      { status: 400 },
    );
  }

  const accessToken = req.cookies.get("accessToken");
  if (!accessToken) {
    return NextResponse.json({ error: "no auth token" });
  }

  const { data, error } = await verifyJwt(accessToken.value);
  if (error !== null) {
    return NextResponse.json(error);
  }

  await dbConnect();

  if (!formDataObject.slug) {
    formDataObject.slug = formDataObject.name.split(" ").join("-");
  }

  const isExist = await Event.exists({
    $or: [{ name: formDataObject.name }, { slug: formDataObject.slug }],
  });

  if (isExist) {
    return NextResponse.json(
      {
        error: "Duplicate Entry",
        details:
          "The provided name or slug already exists. Please use a unique name or slug.",
      },
      { status: 409 },
    );
  }

  if (imgPoster) {
    const arrayBuffer = await imgPoster.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const results = await uploadImageToCloudinary(buffer, imgPoster.name);
    formDataObject.imgPoster = (results as CloudinaryResponse).url;
  }

  const event = await Event.create({ ...formDataObject, host: data.userId });
  return NextResponse.json(event);
}
