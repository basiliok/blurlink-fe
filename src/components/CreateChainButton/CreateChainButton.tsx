import { useState } from 'react';
import { PlusIcon } from '../../assets/icons';
import { CreateChainModal } from '../CreateChainModal/CreateChainModal';
import type { CreateChainButtonProps } from './CreateChainButton.types';

export const CreateChainButton = ({ spaceId, nextChainPosition }: CreateChainButtonProps) => {
    const [isChainModalOpen, setIsChainModalOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsChainModalOpen(true)}
                aria-label="New group"
                className="border-input-border flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border hover:bg-[#2D333B]"
            >
                <PlusIcon size="1rem" />
            </button>

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
