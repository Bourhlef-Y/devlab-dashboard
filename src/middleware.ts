// Importing necessary modules from 'next/server'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function to handle requests
export function middleware(request: NextRequest) {
    // Logging the path of the request for debugging purposes
    console.log('Middleware triggered for path:', request.nextUrl.pathname);

    // Retrieving the 'isLoggedIn' cookie from the request
    const isLoggedInCookie = request.cookies.get('isLoggedIn');
    console.log('isLoggedInCookie:', isLoggedInCookie);

    // Checking if the 'isLoggedIn' cookie exists and if its value is 'true'
    const isLoggedIn = isLoggedInCookie && isLoggedInCookie.value === 'true';
    console.log('isLoggedIn:', isLoggedIn);

    // If the user is not logged in, redirect to the login page
    if (!isLoggedIn) {
        console.log('Redirecting to /login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If the user is logged in, allow the request to proceed
    return NextResponse.next();
}

// Configuration for the middleware to specify which paths it should apply to
export const config = {
    matcher: [
        '/dashboard/:path*', // Applies to all paths under /dashboard
        '/weapons/:path*',   // Applies to all paths under /weapons
        '/vehicles/:path*',  // Applies to all paths under /vehicles
        '/peds/:path*',      // Applies to all paths under /peds
        '/account/:path*',   // Applies to all paths under /account
        '/tools/:path*',     // Applies to all paths under /tools
        '/controls/:path*',  // Applies to all paths under /controls
    ],
};
