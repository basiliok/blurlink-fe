import { useRef, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSpace, useChainsBySpaceId } from '../api';
import { ListIcon } from '../assets/icons/ListIcon';
import { ChainCard, GenericIcon, Line, Loading } from '../components';
import { useAuthStore } from '../stores/auth.store';
import { useUserStore } from '../stores/user.store';
import { FileTextIcon, SignOutIcon } from '../assets/icons';

export const Home = () => {
    const email = useUserStore((state) => state.email);
    const clearUser = useUserStore((state) => state.clearUser);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const queryClient = useQueryClient();

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        clearAuth();
        clearUser();
        queryClient.clear();
        localStorage.removeItem('blurlink-cache');
    };

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
            <header className="border-input-border flex h-16 items-center justify-between border-b bg-[#151B23] px-6 py-3 text-[#D1D7E0]">
                <div className="flex flex-row items-center gap-4">
                    <ListIcon />
                    <h1 className="text-2xl font-bold">{space.name}</h1>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm">{email}</span>
                    <div className="relative" ref={menuRef}>
                        <button type="button" onClick={() => setMenuOpen((prev) => !prev)} className="cursor-pointer">
                            <GenericIcon name={email} size="small" radius="round" />
                        </button>
                        {/* sacar como componente */}
                        {menuOpen && (
                            <div className="absolute right-0 z-50 mt-2 w-44 rounded-lg border border-[#3D444D] bg-[#1C2128] shadow-lg">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-[#D1D7E0] hover:bg-[#2D333B]"
                                >
                                    <SignOutIcon size="1.25rem" />
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="h-[calc(100%-4rem)] overflow-y-auto bg-[#212830]">
                <div className="flex flex-col gap-4 p-3.5">
                    {space.note && (
                        <div className="flex flex-col gap-2 rounded-lg border border-[#3D444D] bg-[#151B23] p-4 shadow-md">
                            <div className="flex items-center gap-2 text-[#8B949E]">
                                <FileTextIcon size="1.25rem" />
                                <span className="text-sm font-medium">Notas</span>
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
