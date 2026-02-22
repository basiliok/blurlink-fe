import { useState } from 'react';
import type { Chain } from '../../types';
import { useLinksByChainId } from '../../api';
import { SimpleLinkCard } from '../SimpleLinkCard';
import './ChainCard.css';
import { PlusIcon, TrashIcon } from '../../assets/icons';
import { CreateLinkModal } from './CreateLinkModal/CreateLinkModal';
import { MultiLinkCard } from '../MultiLinkCard';

interface ChainCardProps {
    chain: Chain;
    spaceId: string;
}

export const ChainCard = ({ chain, spaceId }: ChainCardProps) => {
    const { data: links, isLoading } = useLinksByChainId(spaceId, chain.id);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col overflow-hidden rounded-[0.375rem] border border-[#3d444d]">
                <div className="flex h-8 flex-row items-center justify-between border-b border-[#3d444d] px-2.5 py-1">
                    <div>
                        <p className="text-sm text-[#D1D7E0]">{chain.chainName.toUpperCase()}</p>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-1 text-[#9198A1]">
                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex h-6 w-6 cursor-pointer items-center justify-center hover:text-[#D1D7E0]"
                        >
                            <PlusIcon size={'1.125rem'} />
                        </button>
                        <button
                            type="button"
                            className="flex h-6 w-6 cursor-pointer items-center justify-center hover:text-[#D1D7E0]"
                        >
                            <TrashIcon size={'1.125rem'} />
                        </button>
                    </div>
                </div>

                <div className="auto-grid p-2.5">
                    {/* TO DO: modificar esto a una version mas legible, cuando se complete MultiLinkCard */}
                    <MultiLinkCard />
                    {isLoading ? (
                        <p className="text-sm text-gray-400">Loading links...</p>
                    ) : (
                        links &&
                        links.length > 0 &&
                        links.map((link) => {
                            if (link.type === 'simple') {
                                return <SimpleLinkCard key={link.id} link={link} />;
                            }
                        })
                    )}
                </div>
            </div>

            <CreateLinkModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                chainName={chain.chainName}
                spaceId={spaceId}
                chainId={chain.id}
            />
        </>
    );
};
