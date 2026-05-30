import { useState } from 'react';
import { FoldersIcon, PlusIcon } from '../assets/icons';
import { Dropdown } from './Dropdown/Dropdown';
import { CreateChainModal } from './CreateChainModal/CreateChainModal';

// eliminar nextChainPosition cuando implementemos ranks a nivel de chain
interface CreateMenuProps {
    spaceId: string;
    nextChainPosition: number;
}

export const CreateMenu = ({ spaceId, nextChainPosition }: CreateMenuProps) => {
    const [isChainModalOpen, setIsChainModalOpen] = useState(false);

    return (
        <>
            <Dropdown
                trigger={
                    <div className="border-input-border flex h-7 w-7 items-center justify-center rounded-md border hover:bg-[#2D333B]">
                        <PlusIcon size={'1rem'} />
                    </div>
                }
            >
                {(close) => (
                    <button
                        type="button"
                        onClick={() => {
                            close();
                            setIsChainModalOpen(true);
                        }}
                        className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[#D1D7E0] transition-colors hover:bg-[#313841]"
                    >
                        <FoldersIcon size="1.25rem" color="#6b7179" />
                        New Links Group
                    </button>
                )}
            </Dropdown>

            {isChainModalOpen && (
                <CreateChainModal
                    isOpen={isChainModalOpen}
                    onClose={() => setIsChainModalOpen(false)}
                    spaceId={spaceId}
                    position={nextChainPosition}
                />
            )}
        </>
    );
};
