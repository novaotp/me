"use client";

import { DEFAULT_LOCALE, locales } from '@/locales';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

export interface LinkProps {
    href: string;
    label: string;
}

/**
 * Renders a link for the nav section of the metabar.
 * 
 * If the current path is the same as the href, the css will underline it.
 */
export const Link = ({ href, label }: LinkProps) => {
    let pathname = usePathname();

    // To check if we're on an unprefixed route.
    const hasLocale = locales.some(locale => pathname.includes(locale));

    pathname = hasLocale ? pathname : `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;

    const colors = pathname !== href ? "border-transparent hover:border-black dark:hover:border-white" : "border-black dark:border-white";

    return (
        <li className="relative h-full w-[120px] flex justify-center items-center">
            <NextLink href={href} className={`relative h-full flex justify-center items-center border-b-2 text-black dark:text-white ${colors}`}>
                {label}
            </NextLink>
        </li>
    )
}
