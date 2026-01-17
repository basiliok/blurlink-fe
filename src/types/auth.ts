export interface TokenPayload {
    userId: string;
    email: string;
}

export interface AuthToken {
    token: string;
    expiresIn: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
