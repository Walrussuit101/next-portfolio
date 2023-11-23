import { Metadata } from "next";
import Content from './content.mdx';
import Hero from "../../../components/client/Hero";

export const metadata: Metadata = {
    title: 'Tim Jefferson | NHL API Wrapper'
}

const links = [
    {
        link: 'https://github.com/Walrussuit101/nhl-api-wrapper',
        title: 'Repository'
    },
    {
        link: 'https://www.npmjs.com/package/nhl-api-wrapper',
        title: 'NPM'
    }
]

const NhlApiWrapper = () => {
    return (
        <>
            <Hero loopTexts={[]} mainText="NHL API Wrapper">
                {
                    links.map((link, i) => <p key={`project-link-${i}`}><a className="link" href={link.link} target="_blank">{link.title}</a></p>)
                }
            </Hero>
            <div className="flex justify-center my-28 px-4 md:px-28 lg:px-44 xl:px-96">
                <div className="markdown-content">
                    <Content />
                </div>
            </div>
        </>
    )
}

export default NhlApiWrapper;