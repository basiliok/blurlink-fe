// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './auth.store';

describe('useAuthStore', () => {
    const readStorage = (key: string): unknown => JSON.parse(localStorage.getItem(key) ?? 'null');

    beforeEach(() => {
        useAuthStore.setState(useAuthStore.getInitialState());
        localStorage.clear();
    });

    it('starts without a token', () => {
        expect(useAuthStore.getState()).toMatchObject({ token: null, isAuthenticated: false });
    });

    it('saves the token and marks the user as authenticated', () => {
        useAuthStore.getState().setAuth('token-123');

        expect(useAuthStore.getState()).toMatchObject({ token: 'token-123', isAuthenticated: true });
    });

    it('removes the token when the auth is cleared', () => {
        useAuthStore.setState({ token: 'token-123', isAuthenticated: true });

        useAuthStore.getState().clearAuth();

        expect(useAuthStore.getState()).toMatchObject({ token: null, isAuthenticated: false });
    });

    it('persists the auth state in localStorage', () => {
        useAuthStore.getState().setAuth('token-123');

        expect(readStorage('auth-storage')).toEqual({
            state: { token: 'token-123', isAuthenticated: true },
            version: 0,
        });
    });
});
