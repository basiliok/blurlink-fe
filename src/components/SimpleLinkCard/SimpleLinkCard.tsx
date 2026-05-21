import { useState } from 'react';
import type { SimpleLink } from '../../types';
import { LinkIcon } from '../LinkIcon';
import { getDisplayUrl } from '../../utils/url';
import { DotsThreeVerticalIcon } from '../../assets/icons';
import { EditLinkModal } from './EditLinkModal/EditLinkModal';

interface SimpleLinkProps {
    link: SimpleLink;
    isFaded?: boolean;
}

export const SimpleLinkCard = ({ link, isFaded = false }: SimpleLinkProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const opacityClass = isFaded ? 'opacity-60' : '';

    return (
        <>
            <div className={`border-input-border flex flex-row rounded-[0.375rem] border ${opacityClass}`}>
                <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 flex-row gap-2.5 overflow-hidden pt-2 pr-1 pb-2 pl-2 transition-colors hover:bg-[#2a333d]"
                >
                    <LinkIcon name={link.name} iconName={link.icon} />
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <span className="truncate text-[1rem] leading-[1.25rem] font-[500] text-[#D1D7E0]">
                            {link.name}
                        </span>
                        <span className="truncate text-[0.8rem] leading-[1.125rem] font-[400] text-[#9198A1]">
                            {getDisplayUrl(link.url)}
                        </span>
                    </div>
                </a>
                <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex w-6 cursor-pointer items-center justify-center text-[#44474b] transition-colors hover:bg-[#2a333d] hover:text-[#D1D7E0] active:bg-[#3a4550]"
                >
                    <DotsThreeVerticalIcon size="1.5rem" />
                </button>
            </div>

            <EditLinkModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} link={link} />
        </>
    );
};
