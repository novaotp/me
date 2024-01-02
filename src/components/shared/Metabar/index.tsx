"use client";

import { useLocale } from "@/hooks/useLocale";
import { locales } from "@/locales";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LightModeIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import { useTheme } from "next-themes";

/**
 * Renders a bar to change theme and language.
 */
export const MetaBar = () => {
    const { theme, setTheme } = useTheme();

    const pathname = usePathname();

    // To check if we're on an unprefixed route.
    const hasLocale = locales.some(locale => pathname.includes(locale));

    // Adjust slice if the route is unprefixed.
    const pathnameWithoutLocale = pathname.split("/").slice(hasLocale ? 2 : 1).join("/"); // 2 because 0 is empty and 1 is the locale

    const handleSwitchTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <div className="relative w-full h-[60px] px-10 py-[10px] shadow-[0px_4px_3px_rgba(50,50,50,0.25)] dark:shadow-[0px_4px_3px_rgba(10,10,10,0.25)] flex justify-between items-center">
            <button onClick={handleSwitchTheme} className="relative h-full aspect-square flex justify-center items-center">
                { theme === "light" ? <LightModeIcon /> : <DarkModeIcon /> }
            </button>
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
        </div>
    )
}