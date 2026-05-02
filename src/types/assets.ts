import type { SVGProps } from 'react';

export interface IconInterface extends Omit<SVGProps<SVGSVGElement>, 'color'> {
    color?: string;
    size?: number | string;
    title?: string;
}
