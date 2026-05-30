import { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { Chain } from '../../types';
import { useLinksByChainId } from '../../api';
import { SimpleLinkCard } from '../SimpleLinkCard/SimpleLinkCard';
import './ChainCard.css';
import { PencilSimpleIcon, TrashIcon } from '../../assets/icons';
import { CreateLinkModal } from './CreateLinkModal/CreateLinkModal';
import { EditChainModal } from '../EditChainModal/EditChainModal';
import { AddLinkCard } from './AddLinkCard';
import { DraggableLinkCard } from './DraggableLinkCard';
import { useChainLinkReorder } from './useChainLinkReorder';

interface ChainCardProps {
    chain: Chain;
    spaceId: string;
}

export const ChainCard = ({ chain, spaceId }: ChainCardProps) => {
    const { data: links, isLoading } = useLinksByChainId(spaceId, chain.id);
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
    const [isEditChainModalOpen, setIsEditChainModalOpen] = useState(false);

    const { sortedSimples, dragTriggers, draggedLink, getDropIndicator, handlers } = useChainLinkReorder(
        chain.id,
        links,
    );

    const loadingMessage = () => (
        <div className="rounded-[0.375rem] bg-[#1E252D] p-2">
            <p className="text-center text-sm text-gray-400">Loading links...</p>
        </div>
    );

    return (
        <>
            <div className="flex flex-col overflow-hidden">
                <div className="flex h-7 flex-row items-center justify-between px-2">
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-sm font-[500] text-[#D1D7E0]">{chain.chainName.toUpperCase()}</p>
                        {links && (
                            <>
                                <span className="text-sm text-[#6E7681]">·</span>
                                <span className="text-sm text-[#6E7681]">{links?.length ?? 0} links</span>
                            </>
                        )}
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2 text-[#9198A1]">
                        <button
                            type="button"
                            onClick={() => setIsEditChainModalOpen(true)}
                            className="flex h-6 w-6 cursor-pointer items-center justify-center hover:text-[#D1D7E0] active:text-[#9198A1]"
                        >
                            <PencilSimpleIcon size={'1.375rem'} />
                        </button>
                        <button
                            type="button"
                            className="flex h-6 w-6 cursor-pointer items-center justify-center hover:text-[#D1D7E0] active:text-[#9198A1]"
                        >
                            <TrashIcon size={'1.375rem'} />
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    loadingMessage()
                ) : (
                    <DndContext sensors={dragTriggers} {...handlers}>
                        <div className="auto-grid rounded-[0.375rem] bg-[#1E252D] p-2">
                            {sortedSimples.map((link) => (
                                <DraggableLinkCard
                                    key={link.id}
                                    link={link}
                                    dropIndicator={getDropIndicator(link.id)}
                                />
                            ))}
                            <AddLinkCard onClick={() => setIsCreateLinkModalOpen(true)} />
                        </div>
                        <DragOverlay>{draggedLink && <SimpleLinkCard link={draggedLink} isFaded={true} />}</DragOverlay>
                    </DndContext>
                )}
            </div>
            {isCreateLinkModalOpen && (
                <CreateLinkModal
                    isOpen={isCreateLinkModalOpen}
                    onClose={() => setIsCreateLinkModalOpen(false)}
                    chainName={chain.chainName}
                    spaceId={spaceId}
                    chainId={chain.id}
                    lastRank={sortedSimples[sortedSimples.length - 1]?.rank ?? null}
                />
            )}
            {isEditChainModalOpen && (
                <EditChainModal
                    isOpen={isEditChainModalOpen}
                    onClose={() => setIsEditChainModalOpen(false)}
                    chain={chain}
                />
            )}
        </>
    );
};
