'use client';
import { useRef } from "react";
import ProjectLink from "./ProjectLink";

/*
    Drawer will be on the right when mobile (< lg screens),
    will be left when on desktop (>=lg screens),
    this lines up with the navbar hamburger breakpoints
*/

interface props {
    children: React.ReactNode
}
const ProjectsDrawer = ({ children }: props) => {
    const drawerRef = useRef<HTMLInputElement | null>(null);

    const mobileGoBackToNavDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.checked = false;
            const navDrawer = document.getElementById("nav-side-drawer") as HTMLInputElement | null;
            if (navDrawer) navDrawer.checked = true;
        }
    }

    return (
        <div className="drawer">
            <input ref={drawerRef} id="projects-side-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here, nav, content, footer, etc. */}
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="projects-side-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base text-white">
                    {/* side bar content here */}
                    <li className="lg:hidden w-full">
                        <a className="uppercase w-full" onClick={mobileGoBackToNavDrawer}>
                            <svg height={24} width={24} fill="#FFFFFF" strokeLinecap="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fillRule="nonzero" />
                            </svg>
                            back
                        </a>
                    </li>
                    {
                        projects.map((project, i) => <ProjectLink key={`project-${i}`} title={project.title} link={project.link} />)
                    }
                </ul>
            </div>
        </div>
    )
}

const projects = [
    {
        title: 'Hot Metal Gaming',
        link: 'https://hotmetal.gg'
    },
    {
        title: 'progresa',
        link: 'https://progresa.app'
    },
    {
        title: 'boids',
        link: '/projects/boids'
    },
    {
        title: 'pokedex',
        link: '/projects/pokedex'
    },
    {
        title: 'paytonroberts.com',
        link: 'https://paytonroberts.com'
    },
    {
        title: 'nhl api Wrapper',
        link: '/projects/nhl-api-wrapper'
    },
    {
        title: 'typing test',
        link: '/projects/typing-test'
    }
];

export default ProjectsDrawer;