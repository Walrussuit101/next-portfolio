import useNavLinks from "./hooks/useNavLink";

const NavBar = () => {
    const navLinks = useNavLinks();

    return (
        <div className="navbar bg-base-300 text-white pt-3 px-3 lg:px-40 xl:px-64 2xl:px-96">
            <div className="navbar-start">
                <label tabIndex={0} htmlFor="nav-side-drawer" className="btn drawer-button btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul className="menu menu-horizontal px-1 hidden lg:flex text-[14px]">
                    {navLinks.map((navLink, i) => <li key={`nav-link-${i}`}>{navLink}</li>)}
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="avatar btn btn-circle w-14 h-14">
                        <div className="w-12 h-12 rounded-full">
                            <img src="/headshot.jpg" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content bg-base-200 rounded-md mt-1 w-44">
                        <li>
                            <a className="hover:underline" href="https://github.com/Walrussuit101" target="_blank" rel="noopener noreferrer">
                                GitHub
                                <img src="link.svg" className="invert ml-16" height="20" width="20" />
                            </a>
                        </li>
                        <li>
                            <a className="hover:underline" href="https://www.linkedin.com/in/timothy-jefferson-51a49b181/" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                                <img src="link.svg" className="invert ml-[3.15rem]" height="20" width="20" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar;