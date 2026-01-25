import type { Chain } from '../types';
import { useLinksByChainId } from '../api';
import { LinkCard } from './LinkCard';
import { Line } from './Line';

interface ChainCardProps {
    chain: Chain;
    spaceId: string;
}

export const ChainCard = ({ chain, spaceId }: ChainCardProps) => {
    const { data: links, isLoading } = useLinksByChainId(spaceId, chain.id);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-[#D1D7E0]">{chain.chainName}</h3>
                <Line />
            </div>

            <div className="flex flex-row flex-wrap gap-2.5">
                {isLoading ? (
                    <p className="text-sm text-gray-400">Loading links...</p>
                ) : (
                    links && links.length > 0 && links.map((link) => <LinkCard key={link.id} link={link} />)
                )}
            </div>
        </div>
    );
};
