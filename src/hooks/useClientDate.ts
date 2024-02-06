import { useEffect, useState } from "react"

export const useClientDate = () => {
    const [date, setDate] = useState<Date | null>(null);

    useEffect(() => {
        setDate(new Date());
    }, []);

    return date;
}