import { useEffect } from "react"

const useEventListener = <T extends keyof WindowEventMap> (event: T, action: (e: WindowEventMap[T]) => any) => {
    useEffect(() => {
        window.addEventListener(event, action);
        return () => window.removeEventListener(event, action);
    }, []);
}

export default useEventListener;