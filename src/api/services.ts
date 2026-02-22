import { api } from '../config/axios';
import type {
    ApiResponse,
    BulkSimpleLinksResponse,
    Chain,
    CreateBulkLinksRequest,
    LinkItem,
    LoginRequest,
    Space,
} from '../types';

export const login = async (credentials: LoginRequest): Promise<any> => {
    const { data } = await api.post<ApiResponse>('/sign-in', credentials);
    return data.result;
};

export const getSpace = async (): Promise<Space[]> => {
    const { data } = await api.get<ApiResponse>('/space');
    return data.result;
};

export const getChainsBySpaceId = async (spaceId: string): Promise<Chain[]> => {
    const { data } = await api.get<ApiResponse>(`/space/${spaceId}/chain`);
    return data.result;
};

export const getLinksByChainId = async (spaceId: string, chainId: string): Promise<LinkItem[]> => {
    const { data } = await api.get<ApiResponse>(`/space/${spaceId}/chain/${chainId}/link`);
    return data.result;
};

export const createBulkLinks = async (request: CreateBulkLinksRequest): Promise<BulkSimpleLinksResponse> => {
    const { data } = await api.post<ApiResponse>('/link/simple/bulk', request);
    return data.result;
};
