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

export interface RegisterRequest {
    email: string;
    password: string;
    inviteCode: string;
}

export interface UserWithoutPassword {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}
