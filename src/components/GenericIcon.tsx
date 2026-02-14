interface AvatarProps {
    name: string | null;
    size?: 'small' | 'medium';
    radius?: 'round' | 'small';
}

const sizeClasses = {
    small: 'h-6 w-6 text-xs',
    medium: 'h-[2.375rem] w-[2.375rem] text-sm',
};

const radiusClasses = {
    round: 'rounded-full',
    small: 'rounded',
};

export const GenericIcon = ({ name, size = 'medium', radius = 'small' }: AvatarProps) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    return (
        <div
            className={`flex items-center justify-center bg-[#3D444D] font-medium text-[#D1D7E0] ${sizeClasses[size]} ${radiusClasses[radius]}`}
        >
            {initial}
        </div>
    );
};
