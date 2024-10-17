// Importing necessary modules from 'next/server'
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function to handle requests
export function middleware(request: NextRequest) {
    // Supprimez toute logique de vérification d'authentification
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
