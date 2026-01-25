import { useSpace, useChainsBySpaceId } from '../api';
import { ChainCard, GenericIcon } from '../components';
import { useUserStore } from '../stores/user.store';

export const Home = () => {
    const email = useUserStore((state) => state.email);

    const { data: spaces, isLoading: spaceLoading, error: spaceError } = useSpace();
    const space = spaces?.[0];

    const { data: chains, isLoading: chainsLoading } = useChainsBySpaceId(space?.id);

    const isLoading = spaceLoading || chainsLoading;

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="text-lg text-gray-600">Loading...</div>
            </div>
        );
    }

    if (spaceError || !space) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="text-lg text-red-600">Error loading space</div>
            </div>
        );
    }

    const sortedChains = chains?.sort((a, b) => a.position - b.position) || [];

    return (
        <div className="h-full w-full">
            <header className="border-input-border h-16 border-b bg-[#151B23] px-6 py-4">
                <div className="flex items-center justify-between text-[#D1D7E0]">
                    <h1 className="text-2xl font-bold">{space.name}</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-sm">{email}</span>
                        <GenericIcon name={email} size="small" radius="round" />
                    </div>
                </div>
            </header>

            <main className="h-[calc(100%-4rem)] bg-[#212830]">
                <div className="flex flex-col gap-8 p-8">
                    {sortedChains.length > 0 &&
                        sortedChains.map((chain) => <ChainCard key={chain.id} chain={chain} spaceId={space.id} />)}
                </div>
            </main>
        </div>
    );
};
