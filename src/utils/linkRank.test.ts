import { describe, it, expect } from 'vitest';
import { rankAfter, rankBefore, rankBetween, rankBulkAfter, sortByRank } from './linkRank';

describe('rankAfter', () => {
    it('returns a rank when there is no previous rank', () => {
        expect(rankAfter(null)).not.toBe('');
    });

    it('returns a rank greater than the previous one', () => {
        expect(rankAfter('a0') > 'a0').toBe(true);
    });
});

describe('rankBefore', () => {
    it('returns a rank lower than the next one', () => {
        expect(rankBefore('a1') < 'a1').toBe(true);
    });
});

describe('rankBetween', () => {
    it('returns a rank between the previous and the next one', () => {
        const rank = rankBetween('a0', 'a1');

        expect(rank > 'a0').toBe(true);
        expect(rank < 'a1').toBe(true);
    });
});

describe('rankBulkAfter', () => {
    it('returns as many ranks as requested', () => {
        expect(rankBulkAfter('a0', 3)).toHaveLength(3);
    });

    it('returns ranks greater than the previous one in ascending order', () => {
        const [first, second, third] = rankBulkAfter('a0', 3);

        expect(first > 'a0').toBe(true);
        expect(second > first).toBe(true);
        expect(third > second).toBe(true);
    });
});

describe('sortByRank', () => {
    const item = (id: string, rank: string, createdAt?: string) => ({ id, rank, createdAt });
    const ids = (items: { id: string }[]) => items.map(({ id }) => id);

    it('sorts items by rank', () => {
        const items = [item('1', 'a2', '2026-01-01'), item('2', 'a0', '2026-01-03'), item('3', 'a1', '2026-01-02')];

        const result = sortByRank(items);

        expect(ids(result)).toEqual(['2', '3', '1']);
    });

    it('sorts by createdAt when ranks are equal', () => {
        const items = [item('1', 'a0', '2026-01-02'), item('2', 'a0', '2026-01-01')];

        const result = sortByRank(items);

        expect(ids(result)).toEqual(['2', '1']);
    });

    it('sorts by id when rank and createdAt are equal', () => {
        const items = [item('2', 'a0', '2026-01-01'), item('1', 'a0', '2026-01-01')];

        const result = sortByRank(items);

        expect(ids(result)).toEqual(['1', '2']);
    });

    it('sorts by id when createdAt is missing', () => {
        const items = [item('2', 'a0', '2026-01-01'), item('1', 'a0')];

        const result = sortByRank(items);

        expect(ids(result)).toEqual(['1', '2']);
    });

    it('does not modify the original array', () => {
        const items = [item('1', 'a1'), item('2', 'a0')];
        const original = [...items];

        const result = sortByRank(items);

        expect(items).toEqual(original);
        expect(result).not.toBe(items);
    });

    it('returns an empty array when there are no items', () => {
        expect(sortByRank([])).toEqual([]);
    });
});
