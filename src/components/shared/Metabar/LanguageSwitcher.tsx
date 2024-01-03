"use client";

import { locales } from "@/locales";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

/**
 * Renders a link for each language.
 * 
 * Supports :
 * - English (default)
 * - French
 * - German
 */
export const LanguageSwitcher = () => {
    const pathname = usePathname();

    // To check if we're on an unprefixed route.
    const hasLocale = locales.some(locale => pathname.includes(locale));

    // Adjust slice if the route is unprefixed.
    const pathnameWithoutLocale = pathname.split("/").slice(hasLocale ? 2 : 1).join("/"); // 2 because 0 is empty and 1 is the locale

    return (
        <div className="relative h-full flex">
            <Link href={`/de-DE/${pathnameWithoutLocale}`} className="relative h-full aspect-square flex justify-center items-center border border-black dark:border-gray-400 border-r-0 rounded-l-md">
                <Image
                    src="/flags/germany.svg"
                    width={25}
                    height={25}
                    alt="Germany Flag"
                />
            </Link>
            <Link href={`/en-US/${pathnameWithoutLocale}`} className="relative h-full aspect-square flex justify-center items-center border border-black dark:border-gray-400 border-r-0">
                <Image
                    src="/flags/usa.svg"
                    width={25}
                    height={25}
                    alt="USA Flag"
                />
            </Link>
            <Link href={`/fr-CH/${pathnameWithoutLocale}`} className="relative h-full aspect-square flex justify-center items-center border border-black dark:border-gray-400 rounded-r-md">
                <Image
                    src="/flags/france.svg"
                    width={25}
                    height={25}
                    alt="France Flag"
                />
            </Link>
        </div>
    )
}