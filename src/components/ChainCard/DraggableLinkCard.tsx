import { useDraggable, useDroppable } from '@dnd-kit/core';
import type { SimpleLink } from '../../types';
import { SimpleLinkCard } from '../SimpleLinkCard/SimpleLinkCard';

interface DraggableLinkCardProps {
    link: SimpleLink;
    dropIndicator: 'before' | 'after' | null;
}

/* Este componente es el card en el grid que se queda quieto, pero se puede agarrar para arrastrarlo */
export const DraggableLinkCard = ({ link, dropIndicator }: DraggableLinkCardProps) => {
    const { setNodeRef: setDraggableRef, attributes, listeners } = useDraggable({ id: link.id });
    const { setNodeRef: setDroppableRef } = useDroppable({ id: link.id });

    const setNodeRef = (node: HTMLElement | null) => {
        setDraggableRef(node);
        setDroppableRef(node);
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                touchAction: 'manipulation',
                position: 'relative',
            }}
        >
            {dropIndicator === 'before' && (
                <div className="pointer-events-none absolute top-0 bottom-0 -left-[5px] w-[2px] rounded-full bg-[#3b82f6]" />
            )}
            {dropIndicator === 'after' && (
                <div className="pointer-events-none absolute top-0 -right-[5px] bottom-0 w-[2px] rounded-full bg-[#3b82f6]" />
            )}
            <SimpleLinkCard link={link} />
        </div>
    );
};
