'use client';
import Link from "next/link";
import Hero from "../components/client/Hero";

interface ErrorProps {
    error: Error,
    reset: () => void
}
const RootError = ({ reset }: ErrorProps) => {
    return (
        <div className="min-h-[125vh]">
            <Hero mainText="Something Went Wrong!" loopTexts={["Sorry.", "My Apologies.", ":(", "So Embarrassing..."]}>
                <div className="mt-20 flex flex-col gap-4 items-center">
                    <Link href="/" className="btn uppercase w-52">go home</Link>
                    <div className="divider">OR</div>
                    <button onClick={reset} className="btn uppercase w-52">retry</button>
                </div>
            </Hero>
        </div>
    )
}

export default RootError;