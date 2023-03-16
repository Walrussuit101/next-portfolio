import Link from "next/link";
import Hero from "../components/Hero"
import PageTitle from "../components/PageTitle";

const NotFound = () => {
    return (
        <>
            <PageTitle title="Not Found" />
            <Hero mainText="Not Found" loopTexts={["Sorry.", "My Apologies.", ":(", "So Embarrassing..."]}>
                <Link href="/" className="btn mt-10 uppercase">go home</Link>
            </Hero>
        </>
    )
}

export default NotFound;