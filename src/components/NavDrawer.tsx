import NavLink from "./NavLink";

interface props {
    children: React.ReactNode
}
const NavDrawer = (props: props) => {
    return (
        <div className="drawer">
            <input id="nav-side-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here, nav, content, footer, etc. */}
                { props.children }
            </div>
            <div className="drawer-side">
                <label htmlFor="nav-side-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-100 text-base text-white">
                    {/* side bar content here */}
                    {
                        routes.map((route, i) => <li key={`nav-link-${i}`}><NavLink path={route.path} text={route.text} htmlFor={route.htmlFor} /></li>)
                    }
                </ul>
            </div>
        </div>
    )
}

const routes = [
    { text: 'home', path: '/' },
    { text: 'projects', path: '/projects', htmlFor: 'projects-side-drawer' },
    { text: 'contact', path: '/contact' }
]

export default NavDrawer;