"use client";

import { Link } from "./Link";
import { useParams } from "next/navigation";
import { useDictionary } from "@/hooks/useDictionary";

/**
 * Renders a navbar in the metabar if the width is larger than `1024px`.
 */
export const LargeNavBar = () => {
    const locale = useParams().lang as string;
    const dictionary = useDictionary(locale);

    return (
        <nav className="hidden lg:block relative h-full">
            <ul className="relative h-full flex justify-center items-center">
                <Link href={`/${locale}`} label={dictionary.navigation.home} />
                <Link href={`/${locale}/work`} label={dictionary.navigation.work} />
                <Link href={`/${locale}/blog`} label={dictionary.navigation.blog} />
                <Link href={`/${locale}/contact`} label={dictionary.navigation.contact} />
            </ul>
        </nav>
    )
}