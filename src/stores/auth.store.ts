import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (token: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            isAuthenticated: false,
            setAuth: (token) => set({ token, isAuthenticated: true }),
            clearAuth: () => set({ token: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
        },
    ),
);
