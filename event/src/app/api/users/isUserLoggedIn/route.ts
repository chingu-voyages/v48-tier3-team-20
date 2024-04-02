import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/authHelper";




export default async function GET(req:Request){

    //body should be returning a token string I believe.
    const body = await req.json();

    if(!body.token){
        return NextResponse.json({message: "Not logged in"})
    }
    try{
        const userData = await verifyJwt(body.token);
        return NextResponse.json({message: "user verified", data: userData})

    } catch(err){
        console.log(err)
    }

}

