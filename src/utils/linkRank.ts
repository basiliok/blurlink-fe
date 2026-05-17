import { generateKeyBetween, generateNKeysBetween } from 'fractional-indexing';

export const rankAfter = (prevRank: string | null): string => {
    return generateKeyBetween(prevRank, null);
};

export const rankBefore = (nextRank: string | null): string => {
    return generateKeyBetween(null, nextRank);
};

export const rankBetween = (prevRank: string | null, nextRank: string | null): string => {
    return generateKeyBetween(prevRank, nextRank);
};

export const rankBulkAfter = (prevRank: string | null, count: number): string[] => {
    return generateNKeysBetween(prevRank, null, count);
};

export const sortByRank = <T extends { rank: string; id: string; createdAt?: string }>(items: T[]): T[] => {
    const copy = [...items];
    return copy.sort((a, b) => {
        if (a.rank !== b.rank) return a.rank < b.rank ? -1 : 1;
        if (a.createdAt && b.createdAt && a.createdAt !== b.createdAt) {
            return a.createdAt < b.createdAt ? -1 : 1;
        }
        return a.id < b.id ? -1 : 1;
    });
};
