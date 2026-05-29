import type { ReactNode } from 'react';

export interface DropdownProps {
    trigger: ReactNode;
    children: ReactNode | ((close: () => void) => ReactNode);
}
