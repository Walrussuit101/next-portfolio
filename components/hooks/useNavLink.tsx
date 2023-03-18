
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, ReactNode } from "react";

const routes = [
    { text: 'home', path: '/' },
    { text: 'contact', path: '/contact' }
]

const useNavLinks = () => {
    const router = useRouter();
    const [linkElements, setLinkElements] = useState<ReactNode[]>([]);

    useEffect(() => {
        const newLinkElements: ReactNode[] = routes.map(route => {
            return (
                <Link 
                    href={route.path} 
                    className={`${route.path === router.route && 'underline'} font-medium`}
                >
                    { route.text.toUpperCase() }
                </Link>
            )
        });

        setLinkElements(newLinkElements);
    }, [router.route]);

    return linkElements;
}

export default useNavLinks;