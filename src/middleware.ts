import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isApiRoute = (pathname: string) => {
    return pathname.startsWith('/api');
}

const isReferer = (referer: string) => {
    return referer.startsWith(process.env.NEXT_PUBLIC_HOST_VALIDO as string);
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // if (isApiRoute(pathname) && !isReferer(request.headers.get('referer') as string)){
    //    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL_REDIRECT as string)
    // }
    // if (isApiRoute(pathname)){
    //    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL_REDIRECT as string)
    // }
    return NextResponse.next()
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - static (static files)
       * - favicon.ico (favicon file)
       */
      '/((?!static|favicon.ico).*)',
    ],
  }