import ProjectLink from "./ProjectLink";

interface props {
    children: React.ReactNode
}
const ProjectsDrawer = ({ children }: props) => {
    return (
        <div className="drawer drawer-end">
            <input id="projects-side-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here, nav, content, footer, etc. */}
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="projects-side-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-200 text-base-content text-white">
                    {/* side bar content here */}
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
        title: 'boids',
        link: '/projects/boids'
    },
    {
        title: 'progresa',
        link: 'https://progresa.app'
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