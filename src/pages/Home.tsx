import { useSpace, useChainsBySpaceId } from '../api';
import { ListIcon } from '../assets/icons/ListIcon';
import { ChainCard, GenericIcon, Line } from '../components';
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
            <header className="border-input-border flex h-16 items-center justify-between border-b bg-[#151B23] px-6 py-3 text-[#D1D7E0]">
                <div className="flex flex-row items-center gap-4">
                    <ListIcon />
                    <h1 className="text-2xl font-bold">{space.name}</h1>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm">{email}</span>
                    <GenericIcon name={email} size="small" radius="round" />
                </div>
            </header>

            <main className="h-[calc(100%-4rem)] overflow-y-auto bg-[#212830]">
                <div className="flex flex-col gap-4 p-3.5">
                    {space.note && (
                        <div className="flex flex-col gap-2 rounded-lg border border-[#3D444D] bg-[#151B23] p-4 shadow-md">
                            <div className="flex items-center gap-2">
                                <svg
                                    className="h-4 w-4 text-[#8B949E]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <span className="text-sm font-medium text-[#8B949E]">Notas</span>
                            </div>
                            <Line />
                            <p className="min-h-10 font-mono text-sm leading-relaxed whitespace-pre-wrap text-[#D1D7E0]">
                                {space.note}
                            </p>
                        </div>
                    )}
                    {sortedChains.length > 0 &&
                        sortedChains.map((chain) => <ChainCard key={chain.id} chain={chain} spaceId={space.id} />)}
                </div>
            </main>
        </div>
    );
};
