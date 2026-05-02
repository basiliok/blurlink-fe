import { useState, useEffect } from 'react';
import { DESKTOP_QUERY, TABLET_QUERY } from '../constants/responsive';

export type Device = 'mobile' | 'tablet' | 'desktop';

const getDevice = (): Device => {
    if (window.matchMedia(DESKTOP_QUERY).matches) return 'desktop';
    if (window.matchMedia(TABLET_QUERY).matches) return 'tablet';
    return 'mobile';
};

export const useDevice = (): Device => {
    const [device, setDevice] = useState<Device>(getDevice);

    useEffect(() => {
        const handleChange = () => setDevice(getDevice());

        const desktopMediaQueryList = window.matchMedia(DESKTOP_QUERY);
        const tabletMediaQueryList = window.matchMedia(TABLET_QUERY);

        desktopMediaQueryList.addEventListener('change', handleChange);
        tabletMediaQueryList.addEventListener('change', handleChange);
        return () => {
            desktopMediaQueryList.removeEventListener('change', handleChange);
            tabletMediaQueryList.removeEventListener('change', handleChange);
        };
    }, []);

    return device;
};
