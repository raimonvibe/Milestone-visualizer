import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // If the path is /success and there's no session_id query parameter,
  // redirect to the home page
  if (path === "/success" && !request.nextUrl.searchParams.has("session_id")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/success"],
}

