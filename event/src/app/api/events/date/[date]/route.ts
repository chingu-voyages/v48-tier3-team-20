/* specific date GET request */

import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {date: Date} }) {

    try {
        const eventStartDate = new Date (params.date)        
        const nextDate = new Date(params.date).setHours(23,59,59,999)
    
        await dbConnect();
        
        const events = await Event.find({ "eventStartDate" : {$gt:  eventStartDate, $lt: nextDate}})
        
        if(!events || events.length === 0) {
            return NextResponse.json({ error: "No events.." })
        }

        return NextResponse.json(events)

    } catch (error) {
        const err = error as Error;
        return NextResponse.json(err)
    }
  
  }