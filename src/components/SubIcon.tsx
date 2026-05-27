import { isAvailableSubIcon, subIconColorClasses } from '../constants/subIcons';

interface SubIconProps {
    color: string;
}

export const SubIcon = ({ color }: SubIconProps) => {
    if (!isAvailableSubIcon(color) || color === 'none') return null;

    const { bg, border } = subIconColorClasses[color];

    return (
        <span
            aria-hidden
            className={`absolute -top-0.5 -left-0.5 h-1 w-1 rounded-full border ${bg} ${border}`}
        />
    );
};
