import { describe, it, expect } from 'vitest';
import { decodeJwt } from './jwt';

describe('decodeJwt', () => {
    const createToken = (payload: object) =>
        `header.${Buffer.from(JSON.stringify(payload)).toString('base64url')}.signature`;

    it('returns the userId and email from the payload', () => {
        const token = createToken({ userId: 'user-1', email: 'kevin@example.com' });

        expect(decodeJwt(token)).toEqual({ userId: 'user-1', email: 'kevin@example.com' });
    });

    it('ignores the other fields of the payload', () => {
        const token = createToken({
            userId: 'user-1',
            email: 'kevin@example.com',
            iss: 'blurlink',
            iat: 1760000000,
            exp: 1760003600,
        });

        expect(decodeJwt(token)).toEqual({ userId: 'user-1', email: 'kevin@example.com' });
    });

    it('decodes payloads that contain the base64url characters - and _', () => {
        const token = createToken({ userId: 'user-1', email: 'k~ev?indev@example.com' });

        expect(decodeJwt(token)).toEqual({ userId: 'user-1', email: 'k~ev?indev@example.com' });
    });

    it.each([
        ['has no payload', 'abc'],
        ['has an invalid payload', 'a.%%%.c'],
    ])('throws when the token %s', (_, token) => {
        expect(() => decodeJwt(token)).toThrow();
    });
});
