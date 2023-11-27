import Image from "next/image";
import NavLink from "./NavLink";

const NavBar = () => {
    return (
        <div className="navbar bg-base-300 text-white pt-3 px-3 lg:px-40 xl:px-64 2xl:px-96">
            <div className="navbar-start">
                <label tabIndex={0} htmlFor="nav-side-drawer" className="btn drawer-button btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul className="menu menu-horizontal px-1 hidden lg:flex text-[14px]">
                    {routes.map((route, i) => <li key={`nav-link-${i}`}><NavLink bold path={route.path} text={route.text} htmlFor={route.htmlFor}/></li>)}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="avatar btn btn-circle btn-neutral w-14 h-14">
                        <div className="w-12 h-12 rounded-full">
                            <Image src='/headshot.jpg' height="50" width="50" alt="Tim Jefferson Headshot" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content bg-base-200 text-base rounded-md mt-1 w-44 z-50">
                        <li>
                            <a className="hover:underline flex justify-between" href="https://github.com/Walrussuit101" target="_blank" rel="noopener noreferrer">
                                GitHub
                                <Image src='/link.svg' className="invert" height="20" width="20" alt={'My GitHub'} />
                            </a>
                        </li>
                        <li>
                            <a className="hover:underline flex justify-between" href="https://www.linkedin.com/in/timothy-jefferson-51a49b181/" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                                <Image src='/link.svg' className="invert" height="20" width="20" alt={'My LinkedIn'} />
                            </a>
                        </li>
                        <li>
                            <a className="hover:underline flex justify-between" href="https://github.com/Walrussuit101/next-portfolio" target="_blank" rel="noopener noreferrer">
                                Source
                                <Image src='/source.svg' className="invert" height="22" width="22" alt={'My LinkedIn'} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const routes = [
    { text: 'home', path: '/' },
    { text: 'projects', path: '/projects', htmlFor: 'projects-side-drawer' },
    { text: 'contact', path: '/contact' }
]

export default NavBar;