import type { Link } from '../types';
import { GenericIcon } from './GenericIcon';
import { getDomain } from '../utils/url';

interface LinkCardProps {
    link: Link;
}

export const LinkCard = ({ link }: LinkCardProps) => {
    return (
        <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-input-border flex w-53 flex-row gap-2.5 rounded-lg border p-2 transition-colors hover:bg-[#2a333d]"
        >
            <GenericIcon name={link.title} size="medium" />
            <div className="flex flex-col overflow-hidden">
                <span className="truncate text-[1rem] leading-[1.25rem] font-[500] text-[#D1D7E0]">{link.title}</span>
                <span className="truncate text-[0.875rem] leading-[1.125rem] font-[400] text-[#9198A1]">
                    {getDomain(link.url)}
                </span>
            </div>
        </a>
    );
};
