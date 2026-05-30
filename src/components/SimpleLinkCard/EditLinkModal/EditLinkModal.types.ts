import type { SimpleLink } from '../../../types';

export interface EditLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRequestMove: () => void;
    link: SimpleLink;
}
