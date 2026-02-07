import type { ReactNode } from 'react';

export interface ModalProps {
    title?: string;
    isOpen: boolean;
    children: ReactNode;
    maxWidth?: string;
    onClose: () => void;
}
