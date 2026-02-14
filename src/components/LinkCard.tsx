import type { Link } from '../types';
import { GenericIcon } from './GenericIcon';
import { getDomain } from '../utils/url';
import { DotsThreeVerticalIcon } from '../assets/icons';

interface LinkCardProps {
    link: Link;
}

export const LinkCard = ({ link }: LinkCardProps) => {
    return (
        <div className="border-input-border flex flex-row rounded-[0.375rem] border">
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 flex-row gap-2.5 overflow-hidden pt-2 pr-1 pb-2 pl-2 transition-colors hover:bg-[#2a333d]"
            >
                <GenericIcon name={link.title} size="medium" />
                <div className="flex flex-1 flex-col overflow-hidden">
                    <span className="truncate text-[1rem] leading-[1.25rem] font-[500] text-[#D1D7E0]">
                        {link.title}
                    </span>
                    <span className="truncate text-[0.8rem] leading-[1.125rem] font-[400] text-[#9198A1]">
                        {getDomain(link.url)}
                    </span>
                </div>
            </a>
            <button
                type="button"
                className="flex w-6 cursor-pointer items-center justify-center text-[#44474b] transition-colors hover:bg-[#2a333d] hover:text-[#D1D7E0]"
            >
                <DotsThreeVerticalIcon size="1.5rem" />
            </button>
        </div>
    );
};
