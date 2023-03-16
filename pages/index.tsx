import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import NavDrawer from "../components/NavDrawer";

const Home = () => {
    return (
        <NavDrawer>
            <NavBar />
            <Hero mainText="Tim Jefferson" loopTexts={["Web Developer.", "React Enthusiast.", "Software Engineer.", "Hobby Guitarist.", "Phish Lover.", "Dog Dad."]} />
        </NavDrawer>
    )
}

export default Home;