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

    if (htmlFor) {
        return (
            <label 
                tabIndex={0} 
                htmlFor={htmlFor} 
                className={`font-medium uppercase ${currentPath?.includes(path) && 'underline'}`}
            >
                { text }
            </label>
        )
    }

    return (
        <Link
            href={path}
            className={`${currentPath === path && 'underline'} font-medium uppercase`}
        >
            { text }
        </Link>
    )
}

export default NavLink;