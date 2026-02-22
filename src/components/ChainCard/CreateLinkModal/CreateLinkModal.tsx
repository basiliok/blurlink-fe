import { useState } from 'react';
import { Modal } from '../../Modal/Modal';
import { Line } from '../../Line';
import type { CreateLinkModalProps } from './CreateLinkModal.types';
import { Loading } from '../../Loading/Loading';
import { useCreateBulkLinks } from '../../../api';

export const CreateLinkModal = ({ isOpen, onClose, chainName, spaceId, chainId }: CreateLinkModalProps) => {
    const [title, setTitle] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const { mutate: createBulkLinks, isPending } = useCreateBulkLinks();

    const clearForm = () => {
        setTitle('');
        setUrl('');
    };

    const handleClose = () => {
        if (isPending) return;
        clearForm();
        onClose();
    };

    const handleSave = () => {
        const links = [{ title: title.trim(), url: url.trim() }];

        createBulkLinks(
            {
                spaceId,
                chainId,
                links,
            },
            {
                onSuccess: () => {
                    clearForm();
                    onClose();
                },
            },
        );
    };

    return (
        <Modal title={`New Link - ${chainName}`} isOpen={isOpen} onClose={handleClose}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col rounded-[0.375rem] border border-[#3d444d] bg-[#0d1117]">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 text-sm text-[#f0f6fc] focus:outline-none"
                    />
                    <Line />
                    <input
                        type="text"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-3 py-2 text-sm text-[#9198A1] focus:outline-none"
                    />
                </div>

                <div className="flex justify-end gap-2 border-t border-[#3d444d] pt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isPending}
                        className="cursor-pointer rounded-[0.375rem] border border-[#3d444d] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#3d444d] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isPending}
                        className="flex cursor-pointer items-center gap-2 rounded-[0.375rem] bg-[#238636] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#29903b] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending && <Loading size={'1rem'} />}
                        {isPending ? 'Creando...' : 'Crear link'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};
