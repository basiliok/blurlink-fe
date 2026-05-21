import type { AvailableSvg } from '../constants/svgs';

interface SvgIconProps {
    icon: AvailableSvg;
    size?: 'small' | 'small2' | 'medium';
    radius?: 'round' | 'small' | 'none';
}

const sizeClasses = {
    small: 'h-6 w-6', // 24px
    small2: 'h-[1.5625rem] w-[1.5625rem]', // 25px
    medium: 'h-[2.375rem] w-[2.375rem]', // 38px
};

const radiusClasses = {
    round: 'rounded-full',
    small: 'rounded',
    none: '',
};

export const SvgIcon = ({ icon, size = 'medium', radius = 'small' }: SvgIconProps) => {
    return (
        <div className={`flex items-center justify-center ${sizeClasses[size]} ${radiusClasses[radius]}`}>
            <img src={`/${icon}.svg`} alt={icon} className="h-full w-full" />
        </div>
    );
};
