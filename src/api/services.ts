import { api } from '../config/axios';
import type {
    ApiResponse,
    BulkSimpleLinksResponse,
    Chain,
    CreateBulkLinksRequest,
    CreateChainRequest,
    UpdateChainParams,
    DeleteSimpleLinkParams,
    LinkItem,
    LoginRequest,
    RegisterRequest,
    SimpleLink,
    Space,
    UpdateSimpleLinkParams,
    UserWithoutPassword,
} from '../types';

export const login = async (credentials: LoginRequest): Promise<any> => {
    const { data } = await api.post<ApiResponse>('/sign-in', credentials);
    return data.result;
};

export const register = async (request: RegisterRequest): Promise<UserWithoutPassword> => {
    const { data } = await api.post<ApiResponse>('/user', request);
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

export const createChain = async (request: CreateChainRequest): Promise<Chain> => {
    const { data } = await api.post<ApiResponse>('/chain', request);
    return data.result;
};

export const updateChain = async ({ chainId, body }: UpdateChainParams): Promise<Chain> => {
    const { data } = await api.patch<ApiResponse>(`/chain/${chainId}`, body);
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

export const updateSimpleLink = async ({ linkId, body }: UpdateSimpleLinkParams): Promise<SimpleLink> => {
    const { data } = await api.patch<ApiResponse>(`/link/simple/${linkId}`, body);
    return data.result;
};

export const deleteSimpleLink = async ({ linkId, body }: DeleteSimpleLinkParams): Promise<void> => {
    await api.delete(`/link/${linkId}`, { data: body });
};
