"use client";

import HomeIcon from '@mui/icons-material/HomeWorkRounded';
import WorkIcon from '@mui/icons-material/WorkRounded';
import AboutIcon from '@mui/icons-material/AccountCircleRounded';
import ContactIcon from '@mui/icons-material/MailRounded';

import { useParams } from "next/navigation";
import { Link } from "./Link";
import { useDictionary } from "@/hooks/useDictionary";

/**
 * Renders a mobile navbar.
 */
export const Navbar = () => {
    const locale = useParams().lang as string;
    const dictionary = useDictionary(locale);

    return (
        <nav className="relative w-full h-20 shadow-[0px_-4px_3px_rgba(50,50,50,0.25)] dark:shadow-[0px_-4px_3px_rgba(10,10,10,0.25)]">
            <ul className="relative w-full h-full py-5 flex justify-evenly items-center">
                <Link href={`/${locale}`} icon={<HomeIcon />} label={dictionary.navigation.home} />
                <Link href={`/${locale}/work`} icon={<WorkIcon />} label={dictionary.navigation.work} />
                <Link href={`/${locale}/about`} icon={<AboutIcon />} label={dictionary.navigation.about} />
                <Link href={`/${locale}/contact`} icon={<ContactIcon />} label={dictionary.navigation.contact} />
            </ul>
        </nav>
    )
}
