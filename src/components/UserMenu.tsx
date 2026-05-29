import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../stores/auth.store';
import { useUserStore } from '../stores/user.store';
import { SignOutIcon } from '../assets/icons';
import { Dropdown } from './Dropdown/Dropdown';
import { GenericIcon } from './GenericIcon';
import { Line } from './Line';

export const UserMenu = () => {
    const email = useUserStore((state) => state.email);
    const clearUser = useUserStore((state) => state.clearUser);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const queryClient = useQueryClient();

    const handleLogout = () => {
        clearAuth();
        clearUser();
        queryClient.clear();
        localStorage.removeItem('blurlink-cache');
    };

    return (
        <Dropdown trigger={<GenericIcon name={email} size="small3" radius="round" />}>
            <div className="px-2 py-1.5">
                <span className="text-sm text-[#989ea7]">{email}</span>
            </div>

            <Line />

            <button
                type="button"
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[#D1D7E0] hover:bg-[#2D333B]"
            >
                <SignOutIcon size="1.25rem" />
                Sign out
            </button>
        </Dropdown>
    );
};
