import { describe, it, expect } from 'vitest';
import { bulkSimpleLinkItemSchema } from './CreateLinkModal.schema';

describe('bulkSimpleLinkItemSchema', () => {
    it.each(['https://github.com', 'http://github.com', 'mailto:kevin@example.com'])('accepts %s as url', (url) => {
        const result = bulkSimpleLinkItemSchema.safeParse({ name: 'GitHub', url });

        expect(result.success).toBe(true);
    });

    it.each(['javascript:alert(1)', 'JAVASCRIPT:alert(1)', 'data:text/html,hi', 'github.com'])(
        'rejects %s as url',
        (url) => {
            const result = bulkSimpleLinkItemSchema.safeParse({ name: 'GitHub', url });

            expect(result.error?.issues[0].message).toBe('Invalid URL format');
        },
    );

    it('fails when the name is empty', () => {
        const result = bulkSimpleLinkItemSchema.safeParse({ name: '', url: 'https://github.com' });

        expect(result.error?.issues[0].message).toBe('Name is required');
    });
});
