import { useQueryClient } from '@tanstack/react-query';
import { queryPersister } from '../config/queryPersister';
import { useToast } from '../stores/toast.store';
import { useUserStore } from '../stores/user.store';
import { useSpace } from '../api';

export const DevTools = () => {
    if (!import.meta.env.DEV) return null;
    return <DevToolsContent />;
};

const DevToolsContent = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const userId = useUserStore((state) => state.userId);
    const email = useUserStore((state) => state.email);
    // eliminar esto cuando space se guarde en el local storage
    const { data: spaces } = useSpace();
    const spaceId = spaces?.[0]?.id;

    const handleRefresh = async () => {
        await queryPersister.removeClient();
        queryClient.clear();
        toast.success('Cache cleared');
    };

    const handleCopyId = async () => {
        if (!userId) return;
        await navigator.clipboard.writeText(userId);
        toast.success('User ID copied');
    };

    const handleCopySpaceId = async () => {
        if (!spaceId) return;
        await navigator.clipboard.writeText(spaceId);
        toast.success('Space ID copied');
    };

    return (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3 rounded-lg border border-[#3D444D] bg-[#1C2128] p-3 text-[#D1D7E0] shadow-2xl">
            <div className="flex flex-col gap-2 text-xs">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] tracking-wide text-[#8B949E]">EMAIL</span>
                    <span>{email ?? '—'}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] tracking-wide text-[#8B949E]">USER ID</span>
                    <button
                        type="button"
                        onClick={handleCopyId}
                        disabled={!userId}
                        title="Click to copy"
                        className="cursor-pointer text-left font-mono text-[#D1D7E0] hover:text-[#58a6ff]"
                    >
                        {userId ?? '—'}
                    </button>
                </div>
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] tracking-wide text-[#8B949E]">SPACE ID</span>
                    <button
                        type="button"
                        onClick={handleCopySpaceId}
                        disabled={!spaceId}
                        title="Click to copy"
                        className="cursor-pointer text-left font-mono text-[#D1D7E0] hover:text-[#58a6ff]"
                    >
                        {spaceId ?? '—'}
                    </button>
                </div>
            </div>

            <button
                type="button"
                onClick={handleRefresh}
                className="cursor-pointer rounded-md border border-[#3D444D] bg-[#21262d] px-3 py-1.5 text-xs font-medium text-[#D1D7E0] transition-colors hover:bg-[#2D333B]"
            >
                Refresh data
            </button>
        </div>
    );
};
