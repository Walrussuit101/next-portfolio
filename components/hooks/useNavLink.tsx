
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, ReactNode } from "react";

const routes = [
    { text: 'home', path: '/' },
    { text: 'projects', path: '/projects', htmlFor: 'projects-side-drawer' },
    { text: 'contact', path: '/contact' }
]

const useNavLinks = () => {
    const router = useRouter();
    const [linkElements, setLinkElements] = useState<ReactNode[]>([]);

    useEffect(() => {
        const newLinkElements: ReactNode[] = routes.map(route => {
            if (route.htmlFor) {
                return (
                    <label 
                        tabIndex={0} 
                        htmlFor={ route.htmlFor } 
                        className={`font-medium uppercase ${router.route.includes(route.path) && 'underline'}`}
                    >
                        { route.text }
                    </label>
                )
            }
            
            if (route.path) {
                return (
                    <Link
                        href={route.path}
                        className={`${route.path === router.route && 'underline'} font-medium uppercase`}
                    >
                        { route.text }
                    </Link>
                )
            }
        });

        setLinkElements(newLinkElements);
    }, [router.route]);

    return linkElements;
}

export default useNavLinks;