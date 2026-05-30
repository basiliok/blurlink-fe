import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Loading } from '../Loading/Loading';
import { useUpdateChain } from '../../api';
import { editChainFormSchema } from './EditChainModal.schema';
import { Line } from '../Line';
import type { EditChainModalProps } from './EditChainModal.types';

export const EditChainModal = ({ isOpen, onClose, chain }: EditChainModalProps) => {
    const [chainName, setChainName] = useState(chain.chainName);

    const { mutate: updateChain, isPending } = useUpdateChain();

    const { success: isValid } = editChainFormSchema.safeParse({ chainName });
    const trimmedName = chainName.trim();
    const hasChanges = trimmedName !== chain.chainName;
    const canSave = isValid && hasChanges && !isPending;

    const handleClose = () => {
        if (isPending) return;
        setChainName(chain.chainName);
        onClose();
    };

    const handleSave = () => {
        if (!canSave) return;

        updateChain(
            {
                chainId: chain.id,
                body: {
                    spaceId: chain.spaceId,
                    chainName: trimmedName,
                    position: chain.position,
                    width: chain.width,
                    height: chain.height,
                    linkStyle: chain.linkStyle,
                    linkDirection: chain.linkDirection,
                    linkSize: chain.linkSize,
                    note: chain.note,
                },
            },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    return (
        <Modal title="EDIT GROUP" isOpen={isOpen} onClose={handleClose}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="chain-name" className="text-size-2 text-[#9198A1]">
                        Name
                    </label>
                    <div className="rounded-[0.375rem] border border-[#3d444d] bg-[#0d1117]">
                        <input
                            id="chain-name"
                            type="text"
                            placeholder="My links group"
                            value={chainName}
                            onChange={(e) => setChainName(e.target.value)}
                            autoComplete="off"
                            className="w-full px-3 py-2 text-sm text-[#f0f6fc] focus:outline-none"
                        />
                    </div>
                </div>
                <Line />
                <div className="flex justify-end gap-2">
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
                        onClick={handleSave}
                        disabled={!canSave}
                        className="flex cursor-pointer items-center gap-2 rounded-[0.375rem] bg-[#238636] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#29903b] active:bg-[#1a7f2e] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending && <Loading size={'1rem'} />}
                        {isPending ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
