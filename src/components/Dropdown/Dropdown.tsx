import { useRef, useState, useEffect } from 'react';
import type { DropdownProps } from './Dropdown.types';

export const Dropdown = ({ trigger, children }: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const close = () => setOpen(false);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button type="button" onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
                {trigger}
            </button>
            {open && (
                <div
                    style={{ animation: 'slide-in-bottom 0.2s ease-out both' }}
                    className="absolute top-8 right-0 z-50 w-56 rounded-xl border border-[#3D444D] bg-[#29303a] p-2 shadow-2xl"
                >
                    <div className="flex flex-col gap-2">
                        {typeof children === 'function' ? children(close) : children}
                    </div>
                </div>
            )}
        </div>
    );
};
