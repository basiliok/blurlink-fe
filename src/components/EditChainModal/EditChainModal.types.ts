import type { Chain } from '../../types';

export interface EditChainModalProps {
    isOpen: boolean;
    onClose: () => void;
    chain: Chain;
}
