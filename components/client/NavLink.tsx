'use client';
import Link from "next/link"
import { usePathname } from "next/navigation"

interface props {
    text: string
    path: string
    bold?: boolean
    htmlFor?: string
}
const NavLink = ({ text, path, bold, htmlFor }: props) => {
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
                className={`uppercase ${bold && 'font-medium'} ${currentPath?.includes(path) && 'underline'}`}
            >
                {text}
            </label>
        )
    }

    return (
        <Link
            onClick={closeNavDrawer}
            href={path}
            className={`${currentPath === path && 'underline'} ${bold && 'font-medium'} uppercase`}
        >
            {text}
        </Link>
    )
}

export default NavLink;