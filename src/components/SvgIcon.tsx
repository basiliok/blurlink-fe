import type { AvailableSvg } from '../constants/svgs';

interface SvgIconProps {
    icon: AvailableSvg;
    size?: 'small' | 'small2' | 'small3' | 'medium' | 'large';
    radius?: 'round' | 'small' | 'none';
}

const sizeClasses = {
    small: 'h-6 w-6', // 24px
    small2: 'h-[1.5625rem] w-[1.5625rem]', // 25px
    small3: 'h-7 w-7', // 28px
    medium: 'h-[2.375rem] w-[2.375rem]', // 38px
    large: 'h-12 w-12', // 48px
};

const radiusClasses = {
    round: 'rounded-full',
    small: 'rounded',
    none: '',
};

export const SvgIcon = ({ icon, size = 'medium', radius = 'small' }: SvgIconProps) => {
    return (
        <img
            src={`/${icon}.svg`}
            alt={icon}
            className={`${sizeClasses[size]} ${radiusClasses[radius]} object-contain`}
        />
    );
};
