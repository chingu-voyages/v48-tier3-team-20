import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";

//assuming params is search?q={query}
export async function GET(req: Request, {params}: {params: {searchEvent: string}}) {
    const query = params.searchEvent.match(/=(.*)/);
    
    try{
        await dbConnect();

    } catch(err){
        console.log(err)
    }
}