import dbConnect from "@/lib/mongo";
import Event from "@/models/Event";
import { NextApiRequest } from "next";
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest) {
    const { q } = req.query;


    try{
        await dbConnect();
        

    } catch(err){
        console.log(err)
    }
}