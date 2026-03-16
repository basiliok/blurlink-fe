import type { SimpleLink } from '../../../types';

export interface EditLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    link: SimpleLink;
}
