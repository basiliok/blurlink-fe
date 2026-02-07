export interface CreateLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    chainName: string;
}

export interface CreateLinkForm {
    title: string;
    url: string;
}
