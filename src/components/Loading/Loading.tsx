import type { FC } from 'react';
import './Loading.css';
import { SpinnerGapIcon } from '../../assets/icons';

interface LoadingProps {
    size?: number | string;
    color?: string;
    className?: string;
}

export const Loading: FC<LoadingProps> = ({ size = '2rem', color = 'currentColor', className = '' }) => {
    return (
        <div className={`inline-flex items-center justify-center ${className}`}>
            <span className="animate-spin-steps">
                <SpinnerGapIcon size={size} color={color} />
            </span>
        </div>
    );
};
