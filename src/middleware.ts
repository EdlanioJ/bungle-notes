import { type NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const headers = new Headers(req.headers)

  headers.set('x-pathname', req.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers,
    },
  })
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|icon|opengraph-image|favicon.ico).*)',
  ],
}
