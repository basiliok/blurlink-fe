import { useState } from 'react';
import { Modal } from '../../Modal/Modal';
import { Line } from '../../Line';
import { Loading } from '../../Loading/Loading';
import { TrashIcon } from '../../../assets/icons';
import { useDeleteSimpleLink, useUpdateSimpleLink } from '../../../api';
import { LinkIcon } from '../../LinkIcon';
import { SubIcon } from '../../SubIcon';
import { IconPicker } from '../../IconPicker/IconPicker';
import { SubIconPicker } from '../../SubIconPicker/SubIconPicker';
import type { EditLinkModalProps } from './EditLinkModal.types';

export const EditLinkModal = ({ isOpen, onClose, link }: EditLinkModalProps) => {
    const [name, setName] = useState<string>(link.name);
    const [url, setUrl] = useState<string>(link.url);
    const [icon, setIcon] = useState<string>(link.icon);
    const [subIcon, setSubIcon] = useState<string>(link.subIcon);

    const { mutate: updateSimpleLink, isPending: isUpdating } = useUpdateSimpleLink();
    const { mutate: deleteSimpleLink, isPending: isDeleting } = useDeleteSimpleLink();
    const isPending = isUpdating || isDeleting;

    const clearForm = () => {
        setName(link.name);
        setUrl(link.url);
        setIcon(link.icon);
        setSubIcon(link.subIcon);
    };

    const handleClose = () => {
        if (isPending) return;
        clearForm();
        onClose();
    };

    const handleDelete = () => {
        deleteSimpleLink(
            {
                linkId: link.id,
                body: { chainId: link.chainId },
            },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    const handleSave = () => {
        updateSimpleLink(
            {
                linkId: link.id,
                body: {
                    chainId: link.chainId,
                    name: name.trim(),
                    url: url.trim(),
                    note: link.note,
                    rank: link.rank,
                    icon: icon,
                    subIcon: subIcon,
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
        <Modal title={`Edit - ${link.name}`} isOpen={isOpen} onClose={handleClose}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-2">
                    <div className="border-input-border bg-background flex h-18.75 w-18.75 items-center justify-center rounded-md border">
                        <div className="relative">
                            <LinkIcon name={name} iconName={icon} size="large" />
                            <SubIcon color={subIcon} />
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col rounded-[0.375rem] border border-[#3d444d] bg-[#0d1117]">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                </div>

                <IconPicker value={icon} onChange={setIcon} />

                <SubIconPicker value={subIcon} onChange={setSubIcon} />

                <div className="flex justify-between border-t border-[#3d444d] pt-4">
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="flex cursor-pointer items-center gap-2 rounded-[0.375rem] border border-[#6e2020] px-4 py-2 text-sm text-[#f85149] transition-colors hover:bg-[#3d0f0f] active:bg-[#4d1515] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isDeleting && <Loading size="1rem" />}
                        <TrashIcon size="1rem" />
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>

                    <div className="flex gap-2">
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
                            disabled={isPending}
                            className="flex cursor-pointer items-center gap-2 rounded-[0.375rem] bg-[#238636] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#29903b] active:bg-[#1a7f2e] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending && <Loading size={'1rem'} />}
                            {isPending ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
