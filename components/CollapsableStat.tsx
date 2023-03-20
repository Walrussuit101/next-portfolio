import { ReactNode, useEffect, useState } from "react"

interface props {
    statTitle: string
    statValue: string
    statDesc: string
    initiallyOpened?: boolean
    children?: ReactNode
}
const CollapsableStat = ({ statTitle, statValue, statDesc, initiallyOpened, children }: props) => {
    const [forceOpen, setForceOpen] = useState(initiallyOpened ? 'collapse-open' : '');

    useEffect(() => {
        if (initiallyOpened) {
            window.addEventListener('focusin', () => setForceOpen(''));
            return () => window.removeEventListener('focusin', () => setForceOpen(''));
        }
    }, []);

    return (
        <div className="stat">
            <div tabIndex={0} className={`collapse collapse-plus ${ forceOpen }`}>
                <div className="collapse-title p-0 hover:cursor-pointer">
                    <div className="stat-title whitespace-normal">{ statTitle }</div>
                    <div className="stat-value whitespace-normal">{ statValue }</div>
                    <div className="stat-desc whitespace-normal">{ statDesc }</div>
                </div>
                <div className="collapse-content mt-4">
                    { children }
                </div>
            </div>
        </div>
    )
}

export default CollapsableStat;