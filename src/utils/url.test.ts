import { describe, it, expect } from 'vitest';
import { getDisplayUrl } from './url';

describe('getDisplayUrl', () => {
    it('returns only the host when the URL has no path', () => {
        expect(getDisplayUrl('https://github.com/')).toBe('github.com');
    });

    it('removes the www prefix', () => {
        expect(getDisplayUrl('https://www.github.com')).toBe('github.com');
    });

    it('keeps subdomains other than www', () => {
        expect(getDisplayUrl('https://docs.github.com/')).toBe('docs.github.com');
    });

    it('shortens the path to its first character', () => {
        expect(getDisplayUrl('https://github.com/kevin/repo')).toBe('github.com/k...');
    });

    it('treats a query string as a path', () => {
        expect(getDisplayUrl('https://google.com?q=test')).toBe('google.com/...');
    });

    it.each(['github.com/kevin', 'not a url'])('returns "%s" unchanged when it is not a valid URL', (input) => {
        expect(getDisplayUrl(input)).toBe(input);
    });
});
