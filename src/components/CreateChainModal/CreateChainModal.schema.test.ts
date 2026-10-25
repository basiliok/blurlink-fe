import { describe, it, expect } from 'vitest';
import { createChainFormSchema } from './CreateChainModal.schema';

describe('createChainFormSchema', () => {
    it('fails when the name is empty', () => {
        const result = createChainFormSchema.safeParse({ chainName: '' });

        expect(result.error?.issues[0].message).toBe('Name is required');
    });

    it('fails when the name only has spaces', () => {
        const result = createChainFormSchema.safeParse({ chainName: '   ' });

        expect(result.error?.issues[0].message).toBe('Name is required');
    });

    it('trims the spaces around the name', () => {
        const result = createChainFormSchema.safeParse({ chainName: ' Work ' });

        expect(result.data).toEqual({ chainName: 'Work' });
    });
});
