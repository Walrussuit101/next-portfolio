import useTypewriter from "./hooks/useTypewriter";

const Hero = () => {
    const text = useTypewriter(["Web Developer.", "React Enthusiast.", "Software Engineer.", "Hobby Guitarist.", "Phish Lover.", "Dog Dad."]);

    return (
        <>
            <div className="hero min-h-hero bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Tim Jefferson</h1>
                        <p className="py-6 text-xl h-[22px]">{ text }</p>
                    </div>
                </div>
            </div>
            <div className="triangle border-t-base-200" />
        </>
    )
}

export default Hero;