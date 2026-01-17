import { api } from '../../config/axios';
import type { ApiResponse, LoginRequest } from '../../types';

export const login = async (credentials: LoginRequest): Promise<any> => {
    const { data } = await api.post<ApiResponse>('/sign-in', credentials);
    return data.result;
};
