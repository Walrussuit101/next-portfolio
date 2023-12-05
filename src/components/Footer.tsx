'use client';
import { useEffect, useState } from "react";

const Footer = () => {
    const [year, setYear] = useState(-1);
    const isYearSet = year !== -1;

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, [])

    return (
        <>
            <div className="triangle-up border-b-base-300" />
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <div className="flex gap-1 flex-wrap justify-center">
                    <span>Copyright © Tim Jefferson</span>
                    <div className={`w-8 h-5 ${!isYearSet && 'skeleton bg-base-200 rounded'}`}>
                        {isYearSet && year}
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;