import { FoldersIcon, PlusIcon } from '../assets/icons';
import { Dropdown } from './Dropdown/Dropdown';

export const CreateMenu = () => {
    return (
        <Dropdown
            trigger={
                <div className="border-input-border flex h-7 w-7 items-center justify-center rounded-md border hover:bg-[#2D333B]">
                    <PlusIcon size={'1rem'} />
                </div>
            }
        >
            <button
                type="button"
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[#D1D7E0] transition-colors hover:bg-[#313841]"
            >
                <FoldersIcon size="1.25rem" color="#6b7179" />
                New Links Group
            </button>
        </Dropdown>
    );
};
