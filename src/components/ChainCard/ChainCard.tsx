import type { Chain } from '../../types';
import { useLinksByChainId } from '../../api';
import { LinkCard } from '../LinkCard';
import './ChainCard.css';

interface ChainCardProps {
    chain: Chain;
    spaceId: string;
}

export const ChainCard = ({ chain, spaceId }: ChainCardProps) => {
    const { data: links, isLoading } = useLinksByChainId(spaceId, chain.id);

    return (
        <div className="flex flex-col overflow-hidden rounded-[0.375rem] border border-[#3d444d]">
            <div className="flex flex-row border-b border-[#3d444d] px-2.5 py-1">
                <p className="text-sm text-[#D1D7E0]">{chain.chainName.toUpperCase()}</p>
            </div>

            <div className="auto-grid p-2.5">
                {isLoading ? (
                    <p className="text-sm text-gray-400">Loading links...</p>
                ) : (
                    links && links.length > 0 && links.map((link) => <LinkCard key={link.id} link={link} />)
                )}
            </div>
        </div>
    );
};
