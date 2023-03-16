import Link from "next/link";
import Hero from "../components/Hero"

const NotFound = () => {
    return (
        <Hero mainText="Not Found" loopTexts={["Sorry.", "My Apologies.", ":(", "So Embarassing..."]}>
            <Link href="/" className="btn mt-10 uppercase">go home</Link>
        </Hero>
    )
}

export default NotFound;