"use client";


import { LanguageSwitcher } from './LanguageSwitcher';
import { LargeNavBar } from './LargeNavBar';
import { ThemeSwitcher } from './ThemeSwitcher';

/**
 * Renders a bar to change theme and language.
 */
export const MetaBar = () => {
    return (
        <div className="relative w-full h-[60px] px-10 py-[10px] flex justify-between items-center
                        shadow-[0px_4px_3px_rgba(50,50,50,0.25)] dark:shadow-[0px_4px_3px_rgba(10,10,10,0.25)]"
        >
            <ThemeSwitcher />
            <LargeNavBar />
            <LanguageSwitcher />
        </div>
    )
}