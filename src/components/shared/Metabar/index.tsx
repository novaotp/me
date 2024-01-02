"use client";

import { locales } from "@/locales";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

/**
 * Renders a bar to change theme and language.
 */
export const MetaBar = () => {
    const pathname = usePathname();

    // To check if we're on an unprefixed route.
    const hasLocale = locales.some(locale => pathname.includes(locale));

    // Adjust slice if the route is unprefixed.
    const pathnameWithoutLocale = pathname.split("/").slice(hasLocale ? 2 : 1).join("/"); // 2 because 0 is empty and 1 is the locale

    return (
        <div className="relative w-full h-[60px] shadow-[0px_4px_3px_rgba(50,50,50,0.25)]">
            <Link href={`/de-DE/${pathnameWithoutLocale}`}>Switch to german</Link>
            <Link href={`/en-US/${pathnameWithoutLocale}`}>Switch to english</Link>
            <Link href={`/fr-CH/${pathnameWithoutLocale}`}>Switch to french</Link>
        </div>
    )
}