'use client';
import { ReactNode } from "react";
import useTypewriter from "../../hooks/useTypewriter";

interface HeroProps {
    mainText: string
    loopTexts: string[]
    mainTextToolTip?: string
    children?: ReactNode
}
const Hero = ({ mainText, loopTexts, mainTextToolTip, children }: HeroProps) => {
    const text = loopTexts.length > 0 ? useTypewriter(loopTexts) : '';

    const mainTextElement = <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">{mainText}</h1>

    return (
        <>
            <div className="hero min-h-hero bg-base-300">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        { mainTextToolTip && <div className="tooltip text-2xl" data-tip={mainTextToolTip}>{ mainTextElement }</div> }
                        { !mainTextToolTip && mainTextElement }
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