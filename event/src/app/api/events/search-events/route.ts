import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextApiRequest } from "next";
import { NextResponse } from 'next/server';

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    try{
        await dbConnect();
        await Event.createIndexes();

        const queryEvents = await Event.find({
            $or:[
                { name: {$regex: q, $options: "i"}},
                { description: {$regex: q, $options: "i"}},
            ],
        })

        if(queryEvents[0]){
            return NextResponse.json({message: "results found..", data: queryEvents})
        }
        return NextResponse.json({message: "No results found..."})

    } catch(err){
        console.log(err)
    }
}