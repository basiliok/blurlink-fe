import { useState } from 'react';
import type { Chain } from '../../types';
import { useLinksByChainId } from '../../api';
import { SimpleLinkCard } from '../SimpleLinkCard/SimpleLinkCard';
import './ChainCard.css';
import { PlusIcon, TrashIcon } from '../../assets/icons';
import { CreateLinkModal } from './CreateLinkModal/CreateLinkModal';
//import { MultiLinkCard } from '../MultiLinkCard';

interface ChainCardProps {
    chain: Chain;
    spaceId: string;
}

export const ChainCard = ({ chain, spaceId }: ChainCardProps) => {
    const { data: links, isLoading } = useLinksByChainId(spaceId, chain.id);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const loadingMessage = () => (
        <div className="rounded-[0.375rem] bg-[#1E252D] p-2">
            <p className="text-center text-sm text-gray-400">Loading links...</p>
        </div>
    );

    const emptyMessage = () => (
        <div className="rounded-[0.375rem] bg-[#1E252D] p-2">
            <p className="text-center text-sm text-gray-400">No links yet. Start by creating one!</p>
        </div>
    );

    return (
        <>
            <div className="flex flex-col overflow-hidden">
                <div className="flex h-7 flex-row items-center justify-between px-2">
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-sm font-[500] text-[#D1D7E0]">{chain.chainName.toUpperCase()}</p>
                        {links && (
                            <>
                                <span className="text-sm text-[#6E7681]">·</span>
                                <span className="text-sm text-[#6E7681]">{links?.length ?? 0} links</span>
                            </>
                        )}
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2 text-[#9198A1]">
                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex h-6 w-6 cursor-pointer items-center justify-center hover:text-[#D1D7E0] active:text-[#9198A1]"
                        >
                            <PlusIcon size={'1.375rem'} />
                        </button>
                        <button
                            type="button"
                            className="flex h-6 w-6 cursor-pointer items-center justify-center hover:text-[#D1D7E0] active:text-[#9198A1]"
                        >
                            <TrashIcon size={'1.375rem'} />
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    loadingMessage()
                ) : links && links.length > 0 ? (
                    <div className="auto-grid rounded-[0.375rem] bg-[#1E252D] p-2">
                        {/* TO DO: modificar esto a una version mas legible, cuando se complete MultiLinkCard */}
                        {/* <MultiLinkCard /> */}
                        {links.map((link) => {
                            if (link.type === 'simple') {
                                return <SimpleLinkCard key={link.id} link={link} />;
                            }
                        })}
                    </div>
                ) : (
                    emptyMessage()
                )}
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
