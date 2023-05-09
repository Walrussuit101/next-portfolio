import Link from "next/link";
import Hero from "../../components/client/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tim Jefferson | Not Found'
};

const NotFound = () => {
    return (
        <div className="min-h-[125vh]">
            <Hero mainText="Not Found" loopTexts={["Sorry.", "My Apologies.", ":(", "So Embarrassing..."]}>
                <Link href="/" className="btn mt-10 uppercase">go home</Link>
            </Hero>
        </div>
    )
}

export default NotFound;