import { isAvailableSvg } from '../constants/svgs';
import { GenericIcon } from './GenericIcon';
import { SvgIcon } from './SvgIcon';

interface LinkIconProps {
    name: string | null;
    iconName?: string;
    size?: 'small' | 'small2' | 'medium';
    radius?: 'round' | 'small' | 'none';
    bgTransparent?: boolean;
}

export const LinkIcon = ({
    name,
    iconName,
    size = 'medium',
    radius = 'small',
    bgTransparent = false,
}: LinkIconProps) => {
    if (iconName && isAvailableSvg(iconName)) {
        return <SvgIcon icon={iconName} />;
    }

    return <GenericIcon name={name} size={size} radius={radius} bgTransparent={bgTransparent} />;
};
