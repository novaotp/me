"use client";

import LightModeIcon from '@mui/icons-material/WbSunnyRounded';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import { useTheme } from "next-themes";

/**
 * Renders a theme switcher button to alternate between `light` and `dark` mode.
 */
export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    const handleSwitchTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <div className="relative h-full aspect-square lg:w-[120px] flex justify-start items-center">
            <button onClick={handleSwitchTheme} className="relative h-full aspect-square flex justify-center items-center">
                {theme === "light" ? <LightModeIcon /> : <DarkModeIcon />}
            </button>
        </div>
    )
}