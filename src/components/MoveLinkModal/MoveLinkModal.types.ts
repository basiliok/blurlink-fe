import type { SimpleLink } from '../../types';

export interface MoveLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    link: SimpleLink;
}
