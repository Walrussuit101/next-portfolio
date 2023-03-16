import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import NavDrawer from "../components/NavDrawer";
import PageTitle from "../components/PageTitle";

const Home = () => {
    return (
        <NavDrawer>
            <PageTitle title="Home" />
            <NavBar />
            <Hero mainText="Tim Jefferson" loopTexts={["Web Developer.", "React Enthusiast.", "Software Engineer.", "Hobby Guitarist.", "Phish Lover.", "Dog Dad."]} />

            <div className="flex justify-center my-12" id="about">
                <div className="stats stats-vertical bg-base-300 mx-4 w-full sm:w-[40rem] rounded-md">
                    <div className="badge badge-lg py-4 w-full justify-start md:w-1/2">Professional Experience / Education</div>
                    
                    <div className="stat hover:cursor-pointer hover:bg-base-200">
                        <div className="stat-title">Computer Enterprises Inc.</div>
                        <div className="stat-value whitespace-normal">Developer I</div>
                        <div className="stat-desc">Sept. 22' - Current</div>

                        <div className="stat-value mt-4 whitespace-normal">Associate Developer</div>
                        <div className="stat-desc">June 21' - Sept. 22'</div>
                    </div>

                    <div className="stat text-right hover:cursor-pointer hover:bg-base-200">
                        <div className="stat-title">Henry Schein</div>
                        <div className="stat-value whitespace-normal">Associate IT Field Services Specialist</div>
                        <div className="stat-desc">May 19' - May 21'</div>
                    </div>

                    <div className="stat hover:cursor-pointer hover:bg-base-200">
                        <div className="stat-title">York College of Pennsylvania</div>
                        <div className="stat-value whitespace-normal">BS Computer Science</div>
                        <div className="stat-desc">Fall 17' - Spring 21'</div>
                    </div>
                </div>
            </div>
        </NavDrawer>
    )
}

export default Home;