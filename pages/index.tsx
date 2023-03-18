import CollapsableStat from "../components/CollapsableStat";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import NavDrawer from "../components/NavDrawer";
import PageTitle from "../components/PageTitle";

const ExpEdu = [
    {
        title: 'Computer Enterprises Inc.',
        value: 'Developer I',
        desc: "Sept. 22' - Current",
        children: <ul className="list-disc">
            <li>Built a React application in TypeScript for users to review biometric data classified via an algorithm</li>
            <li>Developed an ahead of time image generator written in C# (.net 6) to serve images of biometric data to a React application via AWS S3 storage</li>
            <li>Dissected, learned, and successfully contributed to a legacy ASP.NET system to integrate new applications into said system</li>
        </ul>
    },
    {
        title: 'Computer Enterprises Inc.',
        value: 'Associate Developer',
        desc: "June 21' - Sept. 22'",
        children: <ul className="list-disc">
            <li>Contributed to medical reporting software written in Node, ran via AWS Lambda, resulting in multiple new report types for the client</li>
            <li>Designed automated processes using AWS SQS/Lambda to update reports</li>
            <li>Converted entire codebase to TypeScript and added a testing framework using Jest</li>
            <li>Participated in an agile environment with a small team via backlog grooming, sprint planning, retrospectives, and requirement gathering</li>
        </ul>
    },
    {
        title: 'Henry Schein',
        value: 'Associate IT Field Services Specialist',
        desc: "May 19' - May 21'",
        children: <ul className="list-disc">
            <li>Built a bill of lading creation website for employees to use in warehouses across North America</li>
            <li>Replaced and redesigned a ticketing website used by the maintenance team in Denver, PA</li>
            <li>Gained knowledge of networking tools and principles used in warehouses</li>
            <li>Created various smaller scale web applications for warehouse and inter team use</li>
        </ul>
    },
    {
        title: 'York College of Pennsylvania',
        value: 'BS Computer Science',
        desc: "Fall 17' - Spring 21'",
        children: <>
            <span className="text-lg block">Senior Software Project I & II</span>
            {/* parent collapse loses focus on <a> click, so preventDefautl on focus and manually open new tab*/}
            <a onClick={e => { e.preventDefault(); window.open("https://github.com/YCP-Swarm-Robotics-Capstone-2020-2021", '_blank')}} className="link text-sm">Repositories</a>
            <ul className="list-disc mt-1 pl-6">
                <li>Designed and implemented the backend and frontend for a wiki system</li>
                <li>Built a TCP server that allows users to configure object recognition software</li>
                <li>Maintained a SCRUM style sprint plan based on user stories from clients</li>
                <li>Containerized frontend and backend using Docker for local development</li>
            </ul>
        </>
    }
]

const Home = () => {
    return (
        <NavDrawer>
            <PageTitle title="Home" />
            <NavBar />
            <Hero mainText="Tim Jefferson" loopTexts={["Web Developer.", "React Enthusiast.", "Software Engineer.", "Hobby Guitarist.", "Phish Lover.", "Dog Dad."]} />

            <div className="flex justify-center my-28">
                <div className="stats stats-vertical bg-base-300 mx-4 w-full md:w-[50rem] rounded-md drop-shadow">
                    <div className="badge badge-lg py-4 w-full justify-start md:w-1/2">Professional Experience / Education</div>
                    {
                        ExpEdu.map(expEdu => <CollapsableStat key={expEdu.value} statTitle={expEdu.title} statValue={expEdu.value} statDesc={expEdu.desc}>{expEdu.children}</CollapsableStat>)
                    }
                </div>
            </div>
            <Footer />
        </NavDrawer>
    )
}

export default Home;