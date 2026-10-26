import type { TokenPayload } from '../types';

export const decodeJwt = (token: string): TokenPayload => {
    const payload = token.split('.')[1];
    const base64Payload = payload.replaceAll('-', '+').replaceAll('_', '/');
    const decoded = JSON.parse(atob(base64Payload));
    return { userId: decoded.userId, email: decoded.email };
};
