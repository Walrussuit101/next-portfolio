'use client';
import { useAtom } from "jotai"
import { alertsAtom } from "./atoms"
import { useEffect } from "react";

const AlertsToast = () => {
    const [alerts, setAlerts] = useAtom(alertsAtom);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlerts(prev => prev.slice(1)); // remove oldest alert, which is at the front of array
        }, 5000);

        return () => clearTimeout(timer);
    }, [alerts]);

    return (
        <div className="toast toast-end toast-bottom">
            {
                alerts.map((alert, i) => {
                    return (
                        <div role="alert" className={`alert ${alert.type}`} key={`alert-${i}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{alert.message}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AlertsToast;