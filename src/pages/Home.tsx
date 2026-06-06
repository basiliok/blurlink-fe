import { useSpace, useChainsBySpaceId, useNotesBySpaceId } from '../api';
import { ChainCard, CreateMenu, Line, Loading, UserMenu } from '../components';
import { FileTextIcon, ListIcon } from '../assets/icons';
import { useDevice } from '../hooks';

export const Home = () => {
    const isDesktop = useDevice() === 'desktop';

    const { data: spaces, isLoading: spaceLoading, error: spaceError } = useSpace();
    const space = spaces?.[0] ?? null;

    const { data: chains, isLoading: chainsLoading } = useChainsBySpaceId(space?.id);
    const { data: notes, isLoading: notesLoading } = useNotesBySpaceId(space?.id);

    const isLoading = spaceLoading || chainsLoading || notesLoading;

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

    // eliminar cuando implementemos ranks a nivel de chain
    const sortedChains = chains?.sort((a, b) => a.position - b.position) || [];
    const nextChainPosition = (sortedChains[sortedChains.length - 1]?.position ?? 0) + 1;

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
                    <CreateMenu spaceId={space.id} nextChainPosition={nextChainPosition} />

                    <div className="h-6">
                        <Line orientation="vertical" />
                    </div>

                    <UserMenu />
                </div>
            </header>

            <main className="h-[calc(100%-4rem)] overflow-y-auto bg-[#212830]">
                <div className={`flex flex-col gap-4 ${isDesktop ? 'mx-auto max-w-400 px-12 py-6' : 'p-3.5'}`}>
                    {notes && notes.length > 0 && (
                        <div className="flex flex-col gap-2 rounded-lg border border-[#3D444D] bg-[#151B23] p-4 shadow-md">
                            <div className="flex items-center gap-2 text-[#8B949E]">
                                <FileTextIcon size="1.25rem" />
                                <span className="text-sm font-medium">Notes</span>
                            </div>
                            <Line />
                            <div className="flex flex-col gap-4">
                                {notes.map((note) => (
                                    <div key={note.id} className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-[#D1D7E0]">{note.title}</span>
                                        <p className="min-h-10 font-mono text-sm leading-relaxed whitespace-pre-wrap text-[#D1D7E0]">
                                            {note.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {sortedChains.length > 0 &&
                        sortedChains.map((chain) => <ChainCard key={chain.id} chain={chain} spaceId={space.id} />)}
                </div>
            </main>
        </div>
    );
};
