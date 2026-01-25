import { api } from '../../config/axios';
import type { ApiResponse, Space, Chain, Link } from '../../types';

export const spaceService = {
    getSpace: async (): Promise<Space[]> => {
        const { data } = await api.get<ApiResponse>(`/space`);
        return data.result;
    },

    getChainsBySpaceId: async (spaceId: string): Promise<Chain[]> => {
        const { data } = await api.get<ApiResponse>(`/space/${spaceId}/chain`);
        return data.result;
    },

    getLinksByChainId: async (spaceId: string, chainId: string): Promise<Link[]> => {
        const { data } = await api.get<ApiResponse>(`/space/${spaceId}/chain/${chainId}/link`);
        return data.result;
    },
};
