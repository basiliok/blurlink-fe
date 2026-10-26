import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useToastStore } from './toast.store';

describe('useToastStore', () => {
    beforeEach(() => {
        useToastStore.setState(useToastStore.getInitialState());
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('starts with an empty toast list', () => {
        expect(useToastStore.getState().toastList).toEqual([]);
    });

    it('adds a toast with an id, a message and a variant', () => {
        // intercept the randomUUID function to return a predictable value for testing
        vi.spyOn(crypto, 'randomUUID').mockReturnValue('00000000-0000-0000-0000-000000000001');

        useToastStore.getState().addToast('Link saved', 'success');

        expect(useToastStore.getState().toastList).toEqual([
            { id: '00000000-0000-0000-0000-000000000001', message: 'Link saved', variant: 'success' },
        ]);
    });

    it('leaves the variant undefined when it is not provided', () => {
        useToastStore.getState().addToast('Link saved');

        expect(useToastStore.getState().toastList[0].variant).toBeUndefined();
    });

    it('keeps the toasts in the order they were added', () => {
        const { addToast } = useToastStore.getState();

        addToast('First');
        addToast('Second');

        expect(useToastStore.getState().toastList.map(({ message }) => message)).toEqual(['First', 'Second']);
    });

    it('removes only the toast with the given id', () => {
        useToastStore.setState({
            toastList: [
                { id: '1', message: 'First' },
                { id: '2', message: 'Second' },
            ],
        });

        useToastStore.getState().removeToast('1');

        expect(useToastStore.getState().toastList).toEqual([{ id: '2', message: 'Second' }]);
    });

    it('keeps the list unchanged when the id does not exist', () => {
        useToastStore.setState({ toastList: [{ id: '1', message: 'First' }] });

        useToastStore.getState().removeToast('unknown');

        expect(useToastStore.getState().toastList).toEqual([{ id: '1', message: 'First' }]);
    });
});
