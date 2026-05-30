import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Loading } from '../Loading/Loading';
import { useCreateChain } from '../../api';
import type { CreateChainModalProps } from './CreateChainModal.types';
import { createChainFormSchema } from './CreateChainModal.schema';
import { Line } from '../Line';

export const CreateChainModal = ({ isOpen, onClose, spaceId, position }: CreateChainModalProps) => {
    const [chainName, setChainName] = useState('');

    const { mutate: createChain, isPending } = useCreateChain();

    const { success: isValid } = createChainFormSchema.safeParse({ chainName });

    const handleClose = () => {
        if (isPending) return;
        setChainName('');
        onClose();
    };

    const handleCreate = () => {
        if (!isValid || isPending) return;

        createChain(
            {
                spaceId,
                chainName: chainName.trim(),
                position,
                width: 300,
                height: 400,
                linkStyle: 'classic',
                linkDirection: 'horizontal',
                linkSize: 'large',
                note: '',
            },
            {
                onSuccess: () => {
                    setChainName('');
                    onClose();
                },
            },
        );
    };

    return (
        <Modal title="NEW GROUP" isOpen={isOpen} onClose={handleClose}>
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
                        onClick={handleCreate}
                        disabled={isPending || !isValid}
                        className="flex cursor-pointer items-center gap-2 rounded-[0.375rem] bg-[#238636] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#29903b] active:bg-[#1a7f2e] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending && <Loading size={'1rem'} />}
                        {isPending ? 'Creating...' : 'Create Group'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
