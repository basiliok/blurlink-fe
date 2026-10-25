import { describe, it, expect } from 'vitest';
import { editChainFormSchema } from './EditChainModal.schema';

describe('editChainFormSchema', () => {
    it('fails when the name is empty', () => {
        const result = editChainFormSchema.safeParse({ chainName: '' });

        expect(result.error?.issues[0].message).toBe('Name is required');
    });

    it('fails when the name only has spaces', () => {
        const result = editChainFormSchema.safeParse({ chainName: '   ' });

        expect(result.error?.issues[0].message).toBe('Name is required');
    });

    it('trims the spaces around the name', () => {
        const result = editChainFormSchema.safeParse({ chainName: ' Work ' });

        expect(result.data).toEqual({ chainName: 'Work' });
    });
});
