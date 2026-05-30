import { useState, useEffect } from 'react';

export const useCountdown = (seconds: number): number => {
    const [count, setCount] = useState(seconds);

    useEffect(() => {
        if (count <= 0) return;
        const timer = setInterval(() => setCount((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [count]);

    return count;
};
