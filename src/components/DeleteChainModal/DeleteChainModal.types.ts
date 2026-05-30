import type { Chain } from '../../types';

export interface DeleteChainModalProps {
    isOpen: boolean;
    onClose: () => void;
    chain: Chain;
}
