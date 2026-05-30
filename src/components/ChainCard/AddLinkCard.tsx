import { PlusIcon } from '../../assets/icons';

interface AddLinkCardProps {
    onClick: () => void;
}

export const AddLinkCard = ({ onClick }: AddLinkCardProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="border-input-border flex cursor-pointer items-center justify-center rounded-[0.375rem] border border-dashed text-[#44474b] transition-colors hover:border-[#8c9096] hover:bg-[#2a333d] hover:text-[#8c9096]"
        >
            <PlusIcon size="1.75rem" />
        </button>
    );
};
