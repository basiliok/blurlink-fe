import type { ReactNode } from 'react';

export interface ModalProps {
    title?: string;
    customTitle?: ReactNode;
    isOpen: boolean;
    children: ReactNode;
    maxWidth?: string;
    onClose: () => void;
}
