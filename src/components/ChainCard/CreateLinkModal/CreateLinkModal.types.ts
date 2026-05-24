import type { LinkFormItem } from '../../../types';

export interface CreateLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    chainName: string;
    spaceId: string;
    chainId: string;
    lastRank: string | null;
}

export type LinkSlots = [
    LinkFormItem | null,
    LinkFormItem | null,
    LinkFormItem | null,
];

export type LinkRowStatus = 'empty' | 'valid' | 'invalid';

export interface LinkRowProps {
    index: number;
    onLinkRowChange: (
        index: number,
        payload: {
            link: LinkFormItem;
            status: LinkRowStatus;
        },
    ) => void;
}
