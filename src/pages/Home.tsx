import { useSpace, useChainsBySpaceId } from '../api';
import { ListIcon } from '../assets/icons/ListIcon';
import { ChainCard, Line, Loading, UserMenu } from '../components';
import { FileTextIcon, PlusIcon } from '../assets/icons';
import { useDevice } from '../hooks';

export const Home = () => {
    const isDesktop = useDevice() === 'desktop';

    const { data: spaces, isLoading: spaceLoading, error: spaceError } = useSpace();
    const space = spaces?.[0] ?? null;

    const { data: chains, isLoading: chainsLoading } = useChainsBySpaceId(space?.id);

    const isLoading = spaceLoading || chainsLoading;

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loading color="#D1D7E0" />
            </div>
        );
    }

    if (spaceError || !space) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-lg text-red-600">Error loading space</div>
            </div>
        );
    }

    const sortedChains = chains?.sort((a, b) => a.position - b.position) || [];

    return (
        <div className="h-full w-full">
            <header
                className={`border-input-border flex h-16 items-center justify-between border-b bg-[#151B23] py-3 text-[#D1D7E0] ${isDesktop ? 'px-12' : 'px-6'}`}
            >
                <div className="flex flex-row items-center gap-4">
                    <ListIcon />
                    <h1 className="text-2xl font-bold">{space.name}</h1>
                </div>

                <div className="flex h-full items-center gap-3">
                    <button
                        type="button"
                        className="border-input-border flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border hover:bg-[#2D333B]"
                    >
                        <PlusIcon size={'1rem'} />
                    </button>

                    <div className="h-6">
                        <Line orientation="vertical" />
                    </div>

                    <UserMenu />
                </div>
            </header>

            <main className="h-[calc(100%-4rem)] overflow-y-auto bg-[#212830]">
                <div className={`flex flex-col gap-4 ${isDesktop ? 'mx-auto max-w-400 px-12 py-6' : 'p-3.5'}`}>
                    {space.note && (
                        <div className="flex flex-col gap-2 rounded-lg border border-[#3D444D] bg-[#151B23] p-4 shadow-md">
                            <div className="flex items-center gap-2 text-[#8B949E]">
                                <FileTextIcon size="1.25rem" />
                                <span className="text-sm font-medium">Notes</span>
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
