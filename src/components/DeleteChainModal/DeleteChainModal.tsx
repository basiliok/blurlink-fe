import { Modal } from '../Modal/Modal';
import { Loading } from '../Loading/Loading';
import { TrashIcon } from '../../assets/icons';
import { useDeleteChain } from '../../api';
import { useCountdown } from '../../hooks';
import { DELETE_DELAY_SECONDS } from '../../constants';
import type { DeleteChainModalProps } from './DeleteChainModal.types';

export const DeleteChainModal = ({ isOpen, onClose, chain }: DeleteChainModalProps) => {
    const { mutate: deleteChain, isPending } = useDeleteChain();

    const countdown = useCountdown(DELETE_DELAY_SECONDS);
    const isLocked = countdown > 0;

    const handleClose = () => {
        if (isPending) return;
        onClose();
    };

    const handleDelete = () => {
        if (isPending || isLocked) return;

        deleteChain(
            {
                chainId: chain.id,
                body: { spaceId: chain.spaceId },
            },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    return (
        <Modal title="Delete group" isOpen={isOpen} onClose={handleClose} maxWidth="max-w-130">
            <div className="flex flex-col gap-5 p-1">
                <p className="text-sm leading-relaxed text-[#D1D7E0]">
                    Are you sure you want to delete the group{' '}
                    <span className="font-[500] text-[#f85149] uppercase">{chain.chainName}</span>? All of its links
                    will be deleted too. This action cannot be undone.
                </p>

                <div className="flex justify-center gap-2">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isPending}
                        className="w-full cursor-pointer rounded-[0.375rem] border border-[#3d444d] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#3d444d] active:bg-[#4a525b]"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isPending || isLocked}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[0.375rem] border border-[#6e2020] px-4 py-2 text-sm text-[#f85149] transition-colors hover:bg-[#3d0f0f] active:bg-[#4d1515] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? <Loading size="1rem" /> : <TrashIcon size="1rem" />}
                        {isPending ? 'Deleting...' : isLocked ? `Delete (${countdown})` : 'Delete'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
