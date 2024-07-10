import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
    console.log('Middleware triggered for path:', request.nextUrl.pathname);

    const isLoggedInCookie = request.cookies.get('isLoggedIn');
    console.log('isLoggedInCookie:', isLoggedInCookie);

    const isLoggedIn = isLoggedInCookie && isLoggedInCookie.value === 'true';
    console.log('isLoggedIn:', isLoggedIn);

    if (!isLoggedIn) {
        console.log('Redirecting to /login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/weapons/:path*',
        '/vehicles/:path*',
        '/peds/:path*',
        '/profile/:path*',
        '/settings/:path*',
        '/logout/:path*',
        '/tools/:path*',
        '/controls/:path*',
    ],
};