import { useState, useEffect, useCallback } from 'react';
import { DESKTOP_QUERY } from '../constants/responsive';

export const useIsDesktop = (): boolean => {
    const [isDesktop, setIsDesktop] = useState<boolean>(window.matchMedia(DESKTOP_QUERY).matches);

    const handleChange = useCallback((e: MediaQueryListEvent) => setIsDesktop(e.matches), []);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(DESKTOP_QUERY);
        mediaQueryList.addEventListener('change', handleChange);

        return () => mediaQueryList.removeEventListener('change', handleChange);
    }, [handleChange]);

    return isDesktop;
};
