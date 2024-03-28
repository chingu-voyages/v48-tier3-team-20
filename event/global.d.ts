import { IUserPayload } from "@/app/api/users/login/route";
import { NextRequest as OriginalNextRequest } from "next/server";


declare global {
  declare interface NextRequest extends OriginalNextRequest {
    user: IUserPayload
  }
}