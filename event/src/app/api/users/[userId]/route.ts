import { NextRequest, NextResponse } from "next/server";
import User, { IUser, PublicUser } from "@/models/User";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";
import { verifyJwt } from "@/lib/authHelper";
import Event from "@/models/Event";

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

