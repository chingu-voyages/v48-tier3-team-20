import { NextRequest, NextResponse } from "next/server";
import User, { IUser, PublicUser } from "@/models/User";
import Event from "@/models/Event";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";
import { verifyJwt } from "@/lib/authHelper";
import { parseUserFormData, uploadImageToCloudinary } from "@/lib/utils";
import { UpdateUserValidator } from "@/lib/validator";
import { CloudinaryResponse } from "@/lib/types";

export async function GET(req: NextRequest, {params}: {params: {userId: string} }) {
  
  const userId = params.userId

  const token = req.cookies.get('accessToken')

  let result 

  if(token){
    result = await verifyJwt(token.value)  
  }

  await dbConnect();

  if(!mongoose.isValidObjectId(userId)) {
    return NextResponse.json("Invalid userId")
  }

  if(!token || result == undefined || result.error !== null) {
    const user = await User.findById(userId).select('-password') as PublicUser | null  
  
    if(user) {    
        return NextResponse.json(user)
    } 
    
    return NextResponse.json({ error: "no such user exists" })
  } 

  if(result.data.userId === userId) {

    const events = await Event.aggregate([{ $match : {"participants" : userId} }])    
    const user = await User.findById(userId) as IUser | null  
  
    console.log(userId)

    if(user) {    
        return NextResponse.json({user, events})
    } 
    
    return NextResponse.json({ error: "no such user exists" })
  }
  
  const user = await User.findById(userId).select('-password') as PublicUser | null

  return NextResponse.json(user)

}

export async function PUT(req: NextRequest, { params, }: { params: { userId: string }; }) {

  const id = params.userId
  const formData = await req.formData()
  const profile_pic = formData.get('profile_pic') as File

  const formDataObject = parseUserFormData(formData) 
  const validate = UpdateUserValidator.safeParse(formDataObject);

  if (!validate.success) {
    return NextResponse.json({
      body: { error: 'Data Invalid', details: validate.error },
    }, { status: 400 })
  }

  let cookie = req.cookies.get("accessToken")
  if (!cookie) {
    return NextResponse.json({ error: 'no auth token' })
  }

  const { data, error } = await verifyJwt(cookie.value)

  if (error !== null) {
    return NextResponse.json(error)
  }

  if(data.userId !== id) {
    return NextResponse.json({error : "Unauthorized user.."})
  } 

  await dbConnect();

  if (profile_pic) {
    const arrayBuffer = await profile_pic.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer)
    const results = await uploadImageToCloudinary(buffer, profile_pic.name)
    formDataObject.profile_pic = (results as CloudinaryResponse).url
  }

  const updatedUser = await User.findOneAndUpdate({ _id: id }, formDataObject, { new: true })

  if (updatedUser) {
    return NextResponse.json(updatedUser);
  }

  return NextResponse.json({ error: "Error.." })
}


