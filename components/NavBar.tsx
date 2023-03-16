import useNavLinks from "./hooks/useNavLink";

const NavBar = () => {
    const navLinks = useNavLinks();

    return (
        <div className="navbar absolute z-50 drop-shadow bg-transparent text-white px-3 lg:px-40 xl:px-64 2xl:px-96">
            <div className="navbar-start">
                <label tabIndex={0} htmlFor="nav-side-drawer" className="btn drawer-button btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul className="menu menu-horizontal px-1 hidden lg:flex text-[14px]">
                    { navLinks.map((navLink, i) => <li key={`nav-link-${i}`}>{navLink}</li>) }
                </ul>
            </div>
            <div className="navbar-end">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src="/headshot.jpg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;