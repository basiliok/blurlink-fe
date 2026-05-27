import { useState } from 'react';
import { Modal } from '../../Modal/Modal';
import type { CreateLinkModalProps, LinkRowStatus, LinkSlots } from './CreateLinkModal.types';
import { Loading } from '../../Loading/Loading';
import { useCreateBulkLinks } from '../../../api';
import { WarningCircleIcon } from '../../../assets/icons';
import { LinkRow } from './LinkRow';
import type { LinkFormItem, BulkSimpleLinkItem } from '../../../types';
import { useDevice } from '../../../hooks';
import { rankBulkAfter } from '../../../utils/linkRank';

export const CreateLinkModal = ({ isOpen, onClose, chainName, spaceId, chainId, lastRank }: CreateLinkModalProps) => {
    const [linkSlots, setLinkSlots] = useState<LinkSlots>([null, null, null]);
    const isMobile = useDevice() === 'mobile';

    const { mutate: createBulkLinks, isPending } = useCreateBulkLinks();

    const onLinkRowChange = (index: number, { link, status }: { link: LinkFormItem; status: LinkRowStatus }): void => {
        if (status === 'valid') {
            setLinkSlots((prev) => {
                const updatedLinks: LinkSlots = [...prev];
                updatedLinks[index] = link;
                return updatedLinks;
            });
        } else {
            setLinkSlots((prev) => {
                const updatedLinks: LinkSlots = [...prev];
                updatedLinks[index] = null;
                return updatedLinks;
            });
        }
    };

    const validLinks: LinkFormItem[] = linkSlots.filter((link) => link !== null);
    const validLinksCount = validLinks.length;

    const handleClose = () => {
        if (isPending) return;
        onClose();
    };

    const handleSave = () => {
        if (validLinksCount === 0) return;

        const ranks = rankBulkAfter(lastRank, validLinksCount);
        const linksWithRank: BulkSimpleLinkItem[] = validLinks.map((link, i) => ({
            ...link,
            rank: ranks[i],
            subIcon: 'none',
        }));

        createBulkLinks(
            {
                spaceId,
                chainId,
                links: linksWithRank,
            },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    const getCreateButtonLabel = (count: number): string => {
        if (count <= 1) {
            return 'Create links';
        } else {
            return `Create ${count} links`;
        }
    };

    const titleContent = (
        <div className="flex flex-row items-center gap-2">
            <p className="text-sm font-[500] text-[#D1D7E0]">NEW LINKS</p>
            <span className="text-sm text-[#6E7681]">·</span>
            <span className="text-sm text-[#6E7681]">{chainName.toUpperCase()}</span>
        </div>
    );

    return (
        <Modal customTitle={titleContent} isOpen={isOpen} onClose={handleClose}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex w-full flex-row gap-2">
                        <div className="w-14">
                            <span className="text-size-2 ps-2 text-[#9198A1]">Icon</span>
                        </div>
                        <div className="flex w-[calc(100%-6.5rem)]">
                            <div className="flex-5">
                                <span className="text-size-2 ps-2 text-[#9198A1]">Name</span>
                            </div>
                            <div className="w-1"></div>
                            <div className="flex-6">
                                <span className="text-size-2 ps-2 text-[#9198A1]">URL</span>
                            </div>
                        </div>
                        <div className="flex w-8 items-center justify-center">
                            <span className="text-size-2 text-[#9198A1]">Status</span>
                        </div>
                    </div>
                    <LinkRow index={0} onLinkRowChange={onLinkRowChange} />
                    <LinkRow index={1} onLinkRowChange={onLinkRowChange} />
                    <LinkRow index={2} onLinkRowChange={onLinkRowChange} />
                </div>

                <div
                    className={`flex items-center ${isMobile ? 'justify-end' : 'justify-between'} border-t border-[#3d444d] pt-4`}
                >
                    {!isMobile && (
                        <div className="text-size-1 flex items-center gap-2 text-[#858b92]">
                            <WarningCircleIcon size="1.25rem" className="rotate-180" />
                            <span>Only valid rows will be created.</span>
                        </div>
                    )}

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
                            disabled={isPending || validLinksCount === 0}
                            className="flex cursor-pointer items-center rounded-[0.375rem] bg-[#238636] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#29903b] active:bg-[#1a7f2e] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending ? <Loading size={'1rem'} /> : getCreateButtonLabel(validLinksCount)}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
