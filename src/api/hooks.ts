import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import { useUserStore } from '../stores/user.store';
import { useToast } from '../stores/toast.store';
import {
    createBulkLinks,
    createChain,
    updateChain,
    deleteSimpleLink,
    getChainsBySpaceId,
    getLinksByChainId,
    getSpace,
    login,
    register,
    updateSimpleLink,
} from './services';
import { decodeJwt } from '../utils/jwt';
import type { Space, Chain, LinkItem } from '../types/space';

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();
    const toast = useToast();

    return useMutation({
        mutationFn: login,
        onSuccess: (result) => {
            setAuth(result.token);
            const { userId, email } = decodeJwt(result.token);
            setUser(userId, email);
            toast.success('Signed in successfully');
            navigate('/home');
        },
    });
};

export const useRegister = () => {
    const navigate = useNavigate();
    const toast = useToast();

    return useMutation({
        mutationFn: register,
        onSuccess: () => {
            toast.success('Account created successfully');
            navigate('/');
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

export const useCreateChain = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: createChain,
        onSuccess: (_data, request) => {
            toast.success('Group created successfully');
            queryClient.invalidateQueries({ queryKey: ['chains', request.spaceId] });
        },
    });
};

export const useUpdateChain = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: updateChain,
        onSuccess: (_data, { body }) => {
            toast.success('Group updated successfully');
            queryClient.invalidateQueries({ queryKey: ['chains', body.spaceId] });
        },
    });
};

export const useLinksByChainId = (spaceId?: string, chainId?: string) => {
    return useQuery<LinkItem[]>({
        queryKey: ['links', chainId],
        queryFn: () => getLinksByChainId(spaceId as string, chainId as string),
        enabled: Boolean(spaceId) && Boolean(chainId),
    });
};

export const useCreateBulkLinks = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: createBulkLinks,
        onSuccess: (_data, request) => {
            toast.success('Links created successfully');
            queryClient.invalidateQueries({ queryKey: ['links', request.chainId] });
        },
    });
};

export const useUpdateSimpleLink = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: updateSimpleLink,
        onSuccess: (_data, { body }) => {
            toast.success('Link updated successfully');
            queryClient.invalidateQueries({ queryKey: ['links', body.chainId] });
        },
    });
};

export const useReorderSimpleLink = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: updateSimpleLink,
        onError: () => {
            toast.error('Failed to reorder link');
        },
        onSettled: (_data, _err, { body }) => {
            queryClient.invalidateQueries({ queryKey: ['links', body.chainId] });
        },
    });
};

export const useDeleteSimpleLink = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation({
        mutationFn: deleteSimpleLink,
        onSuccess: (_data, { body }) => {
            toast.success('Link deleted successfully');
            queryClient.invalidateQueries({ queryKey: ['links', body.chainId] });
        },
    });
};
