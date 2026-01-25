import type { TokenPayload } from '../types';

export const decodeJwt = (token: string): TokenPayload => {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return { userId: decoded.userId, email: decoded.email };
};
