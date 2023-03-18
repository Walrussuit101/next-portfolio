import { ReactNode } from "react";
import useTypewriter from "./hooks/useTypewriter";

interface HeroProps {
    mainText: string
    loopTexts: string[]
    children?: ReactNode
}
const Hero = ({ mainText, loopTexts, children }: HeroProps) => {
    const text = useTypewriter(loopTexts);

    return (
        <>
            <div className="hero min-h-hero bg-base-300">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">{ mainText }</h1>
                        <p className="py-6 text-xl lg:text-2xl h-[22px]">{ text }</p>
                        { children }
                    </div>
                </div>
            </div>
            <div className="triangle-down border-t-base-300" />
        </>
    )
}

export default Hero;