"use client";

import { DEFAULT_LOCALE, locales } from '@/locales';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

export interface LinkProps {
    icon: JSX.Element;
    href: string;
    label: string;
}

/**
 * Renders a link represented as an icon for the navbar.
 * 
 * If the current path is the same as the href, the css will highlight it.
 */
export const Link = ({ icon, href, label }: LinkProps) => {
    let pathname = usePathname();

    // To check if we're on an unprefixed route.
    const hasLocale = locales.some(locale => pathname.includes(locale));

    pathname = hasLocale ? pathname : `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;

    const colors = pathname !== href ? "bg-transparent text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" : "bg-black dark:bg-white text-white dark:text-black";

    return (
        <li className="relative h-full aspect-square sm:w-auto">
            <NextLink href={href} className={`relative h-full flex justify-center items-center rounded-md ${colors} sm:px-5`}>
                {icon}
                <p className="hidden sm:flex ml-[10px] relative h-full justify-center items-center">
                    {label}
                </p>
            </NextLink>
        </li>
    )
}
