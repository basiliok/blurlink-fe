interface GenericIconProps {
    name: string | null;
    size?: 'small' | 'small2' | 'medium';
    radius?: 'round' | 'small' | 'none';
    bgTransparent?: boolean;
}

const sizeClasses = {
    small: 'h-6 w-6 text-xs', // 24px
    small2: 'h-[1.5625rem] w-[1.5625rem] text-sm', // 25px
    medium: 'h-[2.375rem] w-[2.375rem] text-sm', // 38px
};

const radiusClasses = {
    round: 'rounded-full',
    small: 'rounded',
    none: '',
};

export const GenericIcon = ({ name, size = 'medium', radius = 'small', bgTransparent = false }: GenericIconProps) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    const bgClass = bgTransparent ? 'bg-[#3D444D]/60' : 'bg-[#3D444D]';

    return (
        <div
            className={`flex items-center justify-center font-medium text-[#D1D7E0] ${bgClass} ${sizeClasses[size]} ${radiusClasses[radius]}`}
        >
            {initial}
        </div>
    );
};
