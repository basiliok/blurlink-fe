export interface CreateLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    chainName: string;
    spaceId: string;
    chainId: string;
}

export interface CreateLinkForm {
    title: string;
    url: string;
}
