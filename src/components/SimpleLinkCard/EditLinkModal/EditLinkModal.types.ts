import type { SimpleLink } from '../../../types';

export interface EditLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    spaceId: string;
    link: SimpleLink;
}
