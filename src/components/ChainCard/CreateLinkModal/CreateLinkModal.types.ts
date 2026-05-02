import type { BulkSimpleLinkItem } from '../../../types';

export interface CreateLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    chainName: string;
    spaceId: string;
    chainId: string;
}

export type LinkSlots = [
    BulkSimpleLinkItem | null,
    BulkSimpleLinkItem | null,
    BulkSimpleLinkItem | null,
    BulkSimpleLinkItem | null,
];

export type LinkRowStatus = 'empty' | 'valid' | 'invalid';

export interface LinkRowProps {
    index: number;
    onLinkRowChange: (
        index: number,
        payload: {
            link: BulkSimpleLinkItem;
            status: LinkRowStatus;
        },
    ) => void;
}
