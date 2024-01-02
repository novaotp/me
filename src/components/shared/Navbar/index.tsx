import { Link } from "./Link";
import { linkData } from "./linkData";

/**
 * Renders a mobile navbar.
 */
export const Navbar = () => {
    return (
        <nav className="relative w-full h-20 shadow-[0px_-4px_3px_rgba(50,50,50,0.25)]">
            <ul className="relative w-full h-full py-5 flex justify-evenly items-center">
                { linkData.map(({ href, icon, label }, index) => <Link key={index} href={href} icon={icon} label={label} />) }
            </ul>
        </nav>
    )
}
