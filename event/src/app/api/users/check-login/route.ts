import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/authHelper";




export default async function GET(req:Request){

    //body should be returning a token string I believe.
    const body = await req.json();
    const token = body.cookies.get("accessToken");
    if(!token){
        return NextResponse.json({message: "Not logged in"})
    }
    try{
        const userData = await verifyJwt(token);
        return NextResponse.json({message: "user verified", data: userData.data})

    } catch(err){
        console.log(err)
    }

}

