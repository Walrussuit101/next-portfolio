import "../global.css";
import { Metadata } from "next";
import { ReactNode } from "react";
import NavBar from "../components/server/NavBar";
import ProjectsDrawer from "../components/server/ProjectsDrawer";
import NavDrawer from "../components/server/NavDrawer";
import Footer from "../components/server/Footer";

export const metadata: Metadata = {
    description: 'Tim Jefferson | Web Developer, React Enthusiast, Phish Lover.',
    icons: {
        icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌵</text></svg>"
    }
}

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html>
            <head>
                <link rel="stylesheet" href="https://unpkg.com/dracula-prism/dist/css/dracula-prism.css" />
            </head>
            <body>
                <ProjectsDrawer>
                    <NavDrawer>
                        <NavBar />
                        {children}
                        <Footer />
                    </NavDrawer>
                </ProjectsDrawer>
            </body>
        </html>
    )
}

export default RootLayout;