'use client';
import Link from "next/link"
import { usePathname } from "next/navigation"

interface props {
    text: string
    path: string
    htmlFor?: string
}
const NavLink = ({ text, path, htmlFor }: props) => {
    const currentPath = usePathname();

    const closeNavDrawer = () => {
        const drawer = document.getElementById('nav-side-drawer') as HTMLInputElement | null;
        if (drawer) drawer.checked = false;
    }

    if (htmlFor) {
        return (
            <label
                onClick={closeNavDrawer}
                tabIndex={0}
                htmlFor={htmlFor}
                className={`font-medium uppercase ${currentPath?.includes(path) && 'underline'}`}
            >
                {text}
            </label>
        )
    }

    return (
        <Link
            onClick={closeNavDrawer}
            href={path}
            className={`${currentPath === path && 'underline'} font-medium uppercase`}
        >
            {text}
        </Link>
    )
}

export default NavLink;