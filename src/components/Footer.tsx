'use client';
import { useClientDate } from "../hooks/useClientDate";

const Footer = () => {
    const clientDate = useClientDate();

    return (
        <>
            <div className="triangle-up border-b-base-300" />
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                <div className="flex gap-1 flex-wrap justify-center">
                    <span>Copyright © Tim Jefferson</span>
                    <div className={`w-8 h-5 ${!clientDate && 'skeleton bg-base-200 rounded'}`}>
                        {clientDate && clientDate.getFullYear()}
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;