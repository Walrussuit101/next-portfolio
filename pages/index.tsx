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
        </NavDrawer>
    )
}

export default Home;