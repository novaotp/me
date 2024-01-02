import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE } from "./locales";

const unprefixedRoutes = [
    "/",
    "/work",
    "/about",
    "/contact"
];

const middleware = async (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;

    // Unprefixed routes use the default locale under the hood.
    if (unprefixedRoutes.includes(pathname)) {
        return NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url));
    }

    // Hide the default locale by redirecting to an unprefixed route.
    if (pathname.startsWith(`/${DEFAULT_LOCALE}/`) || pathname === `/${DEFAULT_LOCALE}` ) {
        if (pathname === `/${DEFAULT_LOCALE}`) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        const newPathname = pathname.split("/").slice(2).join("/");
        return NextResponse.redirect(new URL(`/${newPathname}`, request.url))
    }

    return NextResponse.next();
}

export default middleware;