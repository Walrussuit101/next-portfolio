import Head from "next/head";
import { ReactNode } from "react";
import { ProjectMdxMeta } from "../types";
import Footer from "./Footer";
import Hero from "./Hero";
import NavBar from "./NavBar";
import NavDrawer from "./NavDrawer";
import PageTitle from "./PageTitle";

interface props {
    meta: ProjectMdxMeta
    children?: ReactNode
}
const ProjectMdxLayout = ({ children, meta }: props) => {
    return (
        <NavDrawer>
            <PageTitle title={meta.title} />
            <NavBar />
            <Hero loopTexts={[]} mainText={meta.title}>
                {
                    meta.links.map((link, i) => <p key={`project-link-${i}`}><a className="link" href={link.link} target="_blank">{link.title}</a></p>)
                }
            </Hero>
            <div className="flex justify-center my-28 px-4 md:px-28 lg:px-44 xl:px-96">
                <div className="markdown-content">
                    { children }
                </div>
            </div>
            <Footer />
        </NavDrawer>
    )
}

export default ProjectMdxLayout;