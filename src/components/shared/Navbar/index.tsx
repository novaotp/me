import { Link } from "./Link";
import { linkData } from "./linkData";

/**
 * Renders a mobile navbar.
 */
export const Navbar = () => {
    return (
        <nav className="relative w-full h-20">
            <ul className="relative w-full h-full py-5 flex justify-evenly items-center">
                { linkData.map(({ href, icon, label }, index) => <Link key={index} href={href} icon={icon} label={label} />) }
            </ul>
        </nav>
    )
}
