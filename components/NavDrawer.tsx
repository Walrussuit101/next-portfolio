import useNavLinks from "./hooks/useNavLink";

interface props {
    children: React.ReactNode
}
const NavDrawer = (props: props) => {
    const navLinks = useNavLinks();
    
    return (
        <div className="drawer">
            <input id="nav-side-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here, nav, content, footer, etc. */}
                { props.children }
            </div>
            <div className="drawer-side">
                <label htmlFor="nav-side-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-200 text-base-content text-white">
                    {/* side bar content here */}
                    { navLinks.map((navLink, i) => <li key={`nav-link-${i}`}>{ navLink }</li>) }
                </ul>
            </div>
        </div>
    )
}

export default NavDrawer;