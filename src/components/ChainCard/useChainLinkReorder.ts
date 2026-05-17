import { useMemo, useState } from 'react';
import {
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragMoveEvent,
    type DragStartEvent,
} from '@dnd-kit/core';
import { useQueryClient } from '@tanstack/react-query';
import type { LinkItem, SimpleLink } from '../../types';
import { useReorderSimpleLink } from '../../api';
import { rankBetween, sortByRank } from '../../utils/linkRank';

type DropSide = 'before' | 'after' | null;
interface DropTarget {
    id: string;
    insertSide: 'before' | 'after';
}

export const useChainLinkReorder = (chainId: string, links: LinkItem[] | undefined) => {
    const [draggedLinkId, setDraggedLinkId] = useState<string | null>(null);
    const [dropTarget, setDropTarget] = useState<DropTarget | null>(null);

    const { mutate: reorderLink } = useReorderSimpleLink();
    const queryClient = useQueryClient();

    const sortedSimples = useMemo<SimpleLink[]>(() => {
        if (!links) return [];
        const simples = links.filter((link): link is SimpleLink => link.type === 'simple');
        return sortByRank(simples);
    }, [links]);

    const draggedLink = useMemo<SimpleLink | null>(() => {
        if (!draggedLinkId) return null;
        return sortedSimples.find((link) => link.id === draggedLinkId) ?? null;
    }, [draggedLinkId, sortedSimples]);

    const dragTriggers = useSensors(
        // para mouse (pixeles)
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        // para touch (milisegundos, pixeles)
        useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    );

    const getDropIndicator = (linkId: string): DropSide => {
        if (!dropTarget || dropTarget.id !== linkId) return null;
        return dropTarget.insertSide;
    };

    const onDragStart = (event: DragStartEvent) => {
        setDraggedLinkId(String(event.active.id));
    };

    // Se ejecuta cuando el cursor se mueve sobre los cards (over), mientras se esta arrastrando el link (active)
    const onDragMove = ({ active, over }: DragMoveEvent) => {
        if (!over || active.id === over.id) {
            setDropTarget(null);
            return;
        }

        const activeRect = active.rect.current.translated;
        const overRect = over.rect;
        if (!activeRect) {
            setDropTarget(null);
            return;
        }

        const activeCenter = activeRect.left + activeRect.width / 2;
        const overCenter = overRect.left + overRect.width / 2;
        const insertSide = activeCenter < overCenter ? 'before' : 'after';

        setDropTarget({ id: String(over.id), insertSide });
    };

    const onDragCancel = () => {
        setDraggedLinkId(null);
        setDropTarget(null);
    };

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        // oculta el indicador y el link arrastrado.
        setDraggedLinkId(null);
        setDropTarget(null);
        if (!over || active.id === over.id) return;
        if (!dropTarget) return;

        // creamos la nueva lista de links si el link arrastrado y encontramos el indice donde se insertara el link arrastrado.
        const activeLink = sortedSimples.find((link) => link.id === active.id);
        if (!activeLink) return;
        const linksWithoutActive = sortedSimples.filter((link) => link.id !== active.id);
        const overIndex = linksWithoutActive.findIndex((link) => link.id === over.id);
        if (overIndex === -1) return;
        const insertIndex = dropTarget.insertSide === 'before' ? overIndex : overIndex + 1;

        // verificamos si el orden de links cambio, si no cambio no hacemos nada.
        const newList = [...linksWithoutActive];
        newList.splice(insertIndex, 0, activeLink);
        const noChange = newList.every((l, i) => l.id === sortedSimples[i].id);
        if (noChange) return;

        // con el indice del insercion, creamos un nuevo rank para el link arrastrado.
        const linkBefore = linksWithoutActive[insertIndex - 1] ?? null;
        const linkAfter = linksWithoutActive[insertIndex] ?? null;
        const newRank = rankBetween(linkBefore?.rank ?? null, linkAfter?.rank ?? null);

        // creamos el nuevo arreglo de links, que se guarda en cache para mostrar sin espera la nueva posicion en pantalla.
        const previousLinks = queryClient.getQueryData<LinkItem[]>(['links', chainId]);
        const optimisticLinks = sortedSimples.map((l) => (l.id === activeLink.id ? { ...l, rank: newRank } : l));
        queryClient.setQueryData(['links', chainId], optimisticLinks);

        reorderLink(
            {
                linkId: activeLink.id,
                body: {
                    chainId: activeLink.chainId,
                    name: activeLink.name,
                    url: activeLink.url,
                    note: activeLink.note,
                    rank: newRank,
                },
            },
            {
                onError: () => {
                    if (previousLinks) {
                        queryClient.setQueryData(['links', chainId], previousLinks);
                    }
                },
            },
        );
    };

    return {
        sortedSimples,
        dragTriggers,
        draggedLink,
        getDropIndicator,
        handlers: { onDragStart, onDragMove, onDragEnd, onDragCancel },
    };
};
