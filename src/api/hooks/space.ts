import { useQuery } from '@tanstack/react-query';
import { spaceService } from '../services/space';
import type { Space, Chain, Link } from '../../types/space';

export const useSpace = () => {
    return useQuery<Space[]>({
        queryKey: ['space'],
        queryFn: spaceService.getSpace,
    });
};

export const useChainsBySpaceId = (spaceId: string | undefined) => {
    return useQuery<Chain[]>({
        queryKey: ['chains', spaceId],
        queryFn: () => spaceService.getChainsBySpaceId(spaceId!),
        enabled: !!spaceId,
    });
};

export const useLinksByChainId = (spaceId: string | undefined, chainId: string | undefined) => {
    return useQuery<Link[]>({
        queryKey: ['links', spaceId, chainId],
        queryFn: () => spaceService.getLinksByChainId(spaceId!, chainId!),
        enabled: !!spaceId && !!chainId,
    });
};
