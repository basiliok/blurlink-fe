// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { matchMedia, setMedia, cleanup } from 'mock-match-media';
import { useDevice } from './useDevice';

describe('useDevice', () => {
    const setScreenWidth = (width: number) => {
        setMedia({ width });
    };

    beforeEach(() => {
        vi.stubGlobal('matchMedia', matchMedia);
    });

    afterEach(() => {
        cleanup();
        vi.unstubAllGlobals();
    });

    it.each([
        ['desktop', 1024],
        ['tablet', 600],
        ['mobile', 400],
    ])('returns %s on a %ipx wide screen', (device, width) => {
        setScreenWidth(width);

        const { result } = renderHook(() => useDevice());

        expect(result.current).toBe(device);
    });

    it('updates the device when the screen is resized', () => {
        setScreenWidth(600);
        const { result } = renderHook(() => useDevice());

        act(() => {
            setScreenWidth(1024);
        });

        expect(result.current).toBe('desktop');
    });

    it('stops listening to screen changes when it unmounts', () => {
        setScreenWidth(400);
        const { unmount } = renderHook(() => useDevice());
        unmount();
        const matchMediaSpy = vi.spyOn(window, 'matchMedia');

        setScreenWidth(1024);

        expect(matchMediaSpy).not.toHaveBeenCalled();
    });
});
