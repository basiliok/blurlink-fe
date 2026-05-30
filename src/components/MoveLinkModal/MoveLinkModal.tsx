import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Modal } from '../Modal/Modal';
import { Loading } from '../Loading/Loading';
import { CheckCircleIcon } from '../../assets/icons';
import { useChainsBySpaceId, useMoveLink } from '../../api';
import { sortByRank, rankAfter } from '../../utils/linkRank';
import type { LinkItem } from '../../types';
import type { MoveLinkModalProps } from './MoveLinkModal.types';

export const MoveLinkModal = ({ isOpen, onClose, link }: MoveLinkModalProps) => {
    const { data: chains } = useChainsBySpaceId(link.spaceId);
    const queryClient = useQueryClient();
    const { mutate: moveLink, isPending } = useMoveLink();

    const [targetChainId, setTargetChainId] = useState<string | null>(null);

    const targetChains = (chains ?? [])
        .filter((chain) => chain.id !== link.chainId)
        .sort((a, b) => a.position - b.position);

    const handleClose = () => {
        if (isPending) return;
        setTargetChainId(null);
        onClose();
    };

    const handleMove = () => {
        if (!targetChainId || isPending) return;

        const targetLinks = queryClient.getQueryData<LinkItem[]>(['links', targetChainId]) ?? [];
        const sorted = sortByRank(targetLinks);
        const rank = rankAfter(sorted[sorted.length - 1]?.rank ?? null);

        moveLink(
            {
                linkId: link.id,
                body: {
                    spaceId: link.spaceId,
                    fromChainId: link.chainId,
                    toChainId: targetChainId,
                    rank,
                },
            },
            {
                onSuccess: () => {
                    setTargetChainId(null);
                    onClose();
                },
            },
        );
    };

    return (
        <Modal title={`Move - ${link.name}`} isOpen={isOpen} onClose={handleClose} maxWidth="max-w-120">
            <div className="flex flex-col gap-4">
                {targetChains.length === 0 ? (
                    <p className="text-sm text-[#9198A1]">There are no other groups to move this link to.</p>
                ) : (
                    <div className="flex max-h-72 flex-col gap-2 overflow-y-auto">
                        {targetChains.map((chain) => {
                            const isSelected = chain.id === targetChainId;
                            return (
                                <button
                                    key={chain.id}
                                    type="button"
                                    onClick={() => setTargetChainId(chain.id)}
                                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-[0.375rem] border px-3 py-2 text-sm transition-colors ${
                                        isSelected
                                            ? 'border-[#316dca] bg-[#1c2a44] text-[#f0f6fc]'
                                            : 'border-[#3d444d] text-[#D1D7E0] hover:bg-[#2D333B]'
                                    }`}
                                >
                                    <span className="truncate">{chain.chainName}</span>
                                    {isSelected && <CheckCircleIcon size="1.1rem" color="#4493f8" />}
                                </button>
                            );
                        })}
                    </div>
                )}

                <div className="flex justify-end gap-2 border-t border-[#3d444d] pt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isPending}
                        className="cursor-pointer rounded-[0.375rem] border border-[#3d444d] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#3d444d] active:bg-[#4a525b] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleMove}
                        disabled={!targetChainId || isPending}
                        className="flex cursor-pointer items-center gap-2 rounded-[0.375rem] bg-[#238636] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#29903b] active:bg-[#1a7f2e] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending && <Loading size={'1rem'} />}
                        {isPending ? 'Moving...' : 'Move'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
