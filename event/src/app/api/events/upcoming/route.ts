import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
    try {
        await dbConnect();
        const upcomingEvents = await Event.find().sort({ _id: -1 }).limit(3)

        if(!upcomingEvents) {
           return NextResponse.json({ error: "No events.." })
        }

        return NextResponse.json(upcomingEvents)
        
    } catch(error) {
        const err = error as Error
        return NextResponse.json(err)
    }    
}