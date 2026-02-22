import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import { useUserStore } from '../stores/user.store';
import { createBulkLinks, getChainsBySpaceId, getLinksByChainId, getSpace, login } from './services';
import { decodeJwt } from '../utils/jwt';
import type { Space, Chain, CreateBulkLinksRequest, LinkItem } from '../types/space';

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,
        onSuccess: (result) => {
            setAuth(result.token);
            const { userId, email } = decodeJwt(result.token);
            setUser(userId, email);
            navigate('/home');
        },
    });
};

export const useSpace = () => {
    return useQuery<Space[]>({
        queryKey: ['space'],
        queryFn: getSpace,
    });
};

export const useChainsBySpaceId = (spaceId?: string) => {
    return useQuery<Chain[]>({
        queryKey: ['chains', spaceId],
        queryFn: () => getChainsBySpaceId(spaceId as string),
        enabled: Boolean(spaceId),
    });
};

export const useLinksByChainId = (spaceId?: string, chainId?: string) => {
    return useQuery<LinkItem[]>({
        queryKey: ['links', spaceId, chainId],
        queryFn: () => getLinksByChainId(spaceId as string, chainId as string),
        enabled: Boolean(spaceId) && Boolean(chainId),
    });
};

export const useCreateBulkLinks = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: CreateBulkLinksRequest) => createBulkLinks(request),
        onSuccess: (_data, request) => {
            queryClient.invalidateQueries({
                queryKey: ['links', request.spaceId, request.chainId],
            });
        },
    });
};
