import Link from "next/link";
import { useRouter } from "next/router";

const projects = [
    {
        title: 'nhl api Wrapper',
        link: '/projects/nhl-api-wrapper'
    }
]

interface props {
    children: React.ReactNode
}
const ProjectsDrawer = ({ children }: props) => {
    const router = useRouter();
    const currentRoute = router.route;

    return (
        <div className="drawer drawer-end">
            <input id="projects-side-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here, nav, content, footer, etc. */}
                { children }
            </div>
            <div className="drawer-side">
                <label htmlFor="projects-side-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-200 text-base-content text-white">
                    {/* side bar content here */}
                    { 
                        projects.map(project => {
                            return (
                                <li>
                                    <Link href={ project.link } className={`uppercase ${currentRoute === project.link && 'underline'}`}>{ project.title }</Link>
                                </li>
                            )
                        }) 
                    }
                </ul>
            </div>
        </div>
    )
}

export default ProjectsDrawer;