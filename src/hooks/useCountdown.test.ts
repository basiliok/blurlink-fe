// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCountdown } from './useCountdown';

describe('useCountdown', () => {
    const tick = (seconds: number) => {
        for (let second = 0; second < seconds; second++) {
            act(() => {
                vi.advanceTimersByTime(1000);
            });
        }
    };

    // replace the time functions (setTimeout, setInterval, Date...) with fake ones controlled by vitest
    beforeEach(() => {
        vi.useFakeTimers();
    });

    // restore the real time functions so the fake clock does not stay active after the test
    afterEach(() => {
        vi.useRealTimers();
    });

    it('returns the initial value', () => {
        const { result } = renderHook(() => useCountdown(5));

        expect(result.current).toBe(5);
    });

    it('decreases by one every second', () => {
        const { result } = renderHook(() => useCountdown(5));

        tick(2);

        expect(result.current).toBe(3);
    });

    it('stops at zero', () => {
        const { result } = renderHook(() => useCountdown(3));

        tick(10);

        expect(result.current).toBe(0);
    });

    it('stays at zero when it starts at zero', () => {
        const { result } = renderHook(() => useCountdown(0));

        tick(2);

        expect(result.current).toBe(0);
    });

    it('clears its timer when it unmounts', () => {
        const { unmount } = renderHook(() => useCountdown(5));
        expect(vi.getTimerCount()).toBe(1);

        unmount();

        expect(vi.getTimerCount()).toBe(0);
    });
});
