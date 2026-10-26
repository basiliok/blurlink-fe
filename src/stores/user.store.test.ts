// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from './user.store';

describe('useUserStore', () => {
    const readStorage = (key: string): unknown => JSON.parse(localStorage.getItem(key) ?? 'null');

    beforeEach(() => {
        useUserStore.setState(useUserStore.getInitialState());
        localStorage.clear();
    });

    it('starts without a user', () => {
        expect(useUserStore.getState()).toMatchObject({ userId: null, email: null });
    });

    it('saves the userId and the email', () => {
        useUserStore.getState().setUser('user-1', 'kevin@example.com');

        expect(useUserStore.getState()).toMatchObject({ userId: 'user-1', email: 'kevin@example.com' });
    });

    it('removes the user when it is cleared', () => {
        useUserStore.setState({ userId: 'user-1', email: 'kevin@example.com' });

        useUserStore.getState().clearUser();

        expect(useUserStore.getState()).toMatchObject({ userId: null, email: null });
    });

    it('persists the user in localStorage', () => {
        useUserStore.getState().setUser('user-1', 'kevin@example.com');

        expect(readStorage('user-storage')).toEqual({
            state: { userId: 'user-1', email: 'kevin@example.com' },
            version: 0,
        });
    });
});
