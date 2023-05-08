'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface props {
    title: string
    link: string
}
const ProjectLink = ({ title, link }: props) => {
    const path = usePathname();

    const closeProjectsDrawer = () => {
        const drawer = document.getElementById('projects-side-drawer') as HTMLInputElement | null;
        if (drawer) drawer.checked = false;
    }

    return (
        <li onClick={closeProjectsDrawer}>
            <Link href={link} rel="noreferrer" target={link[0] !== '/' ? '_blank' : ''} className={`uppercase ${path === link && 'underline'}`}>
                {title}
            </Link>
        </li>
    )
}

export default ProjectLink;