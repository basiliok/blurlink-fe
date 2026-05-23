import type { ReactNode } from 'react';

export type TooltipPlacement =
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end';

export type TooltipSize = 'small' | 'normal';

export interface TooltipProps {
    message: string;
    children: ReactNode;
    placement?: TooltipPlacement;
    maxWidth?: number;
    arrow?: boolean;
    offset?: number;
    className?: string;
    triggerClassName?: string;
    transitionDuration?: number;
    size?: TooltipSize;
}
