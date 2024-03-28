import { NextResponse } from "next/server";

type Middleware = (request: NextRequest, next: () => Promise<void>) => Promise<NextResponse<any>>;

export function handler(...middleware: Middleware[]) {
  return async function (req: NextRequest) {
    let result: any
    for (let i = 0; i < middleware.length; i++) {
      let nextCalled = false
      const next = async () => {
        nextCalled = true
      }
      result = await middleware[i](req, next)
      if (!nextCalled) {
        break
      }
    }
    if (result) return result;
    throw new Error('No NextResponse')
  }
}