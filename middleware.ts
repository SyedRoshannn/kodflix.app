import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // Define public routes
    const isPublicRoute =
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname.startsWith("/api/") ||
        pathname.startsWith("/_next/") ||
        pathname === "/favicon.ico";

    // If user is NOT authenticated and tries to access a protected route
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If user IS authenticated and tries to access login/signup, redirect to home
    if (token && (pathname === "/login" || pathname === "/signup")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
