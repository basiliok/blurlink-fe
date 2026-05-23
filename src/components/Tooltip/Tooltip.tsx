import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { TooltipPlacement, TooltipProps } from './Tooltip.types';

export const Tooltip = ({
    message,
    children,
    placement = 'bottom',
    maxWidth: tooltipMaxWidth = 270,
    arrow = false,
    offset = 8,
    className,
    triggerClassName,
    transitionDuration = 150,
    size = 'normal',
}: TooltipProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({
        top: 0,
        left: 0,
        transform: '',
    });
    const [opacity, setOpacity] = useState(0);

    const tooltipTriggerRef = useRef<HTMLDivElement>(null);
    const fadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const sizeClasses = size === 'small' ? 'py-2 px-2.5 text-xs' : 'py-2.5 px-3.5 text-sm';
    const showArrow = arrow && size !== 'small';

    const updateTooltipPosition = useCallback(() => {
        if (!tooltipTriggerRef.current) return;

        const triggerBox = tooltipTriggerRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;
        let transform = '';

        switch (placement) {
            case 'top-start':
                top = triggerBox.top - offset;
                left = triggerBox.left;
                transform = 'translateY(-100%)';
                break;
            case 'top':
                top = triggerBox.top - offset;
                left = triggerBox.left + triggerBox.width / 2;
                transform = 'translate(-50%, -100%)';
                break;
            case 'top-end':
                top = triggerBox.top - offset;
                left = triggerBox.left + triggerBox.width;
                transform = 'translate(-100%, -100%)';
                break;
            case 'right-start':
                top = triggerBox.top;
                left = triggerBox.left + triggerBox.width + offset;
                break;
            case 'right':
                top = triggerBox.top + triggerBox.height / 2;
                left = triggerBox.left + triggerBox.width + offset;
                transform = 'translateY(-50%)';
                break;
            case 'right-end':
                top = triggerBox.top + triggerBox.height;
                left = triggerBox.left + triggerBox.width + offset;
                transform = 'translateY(-100%)';
                break;
            case 'bottom-start':
                top = triggerBox.top + triggerBox.height + offset;
                left = triggerBox.left;
                break;
            case 'bottom':
                top = triggerBox.top + triggerBox.height + offset;
                left = triggerBox.left + triggerBox.width / 2;
                transform = 'translateX(-50%)';
                break;
            case 'bottom-end':
                top = triggerBox.top + triggerBox.height + offset;
                left = triggerBox.left + triggerBox.width;
                transform = 'translateX(-100%)';
                break;
            case 'left-start':
                top = triggerBox.top;
                left = triggerBox.left - tooltipMaxWidth - offset;
                break;
            case 'left':
                top = triggerBox.top + triggerBox.height / 2;
                left = triggerBox.left - tooltipMaxWidth - offset;
                transform = 'translateY(-50%)';
                break;
            case 'left-end':
                top = triggerBox.top + triggerBox.height;
                left = triggerBox.left - tooltipMaxWidth - offset;
                transform = 'translateY(-100%)';
                break;
        }

        setTooltipPosition({ top, left, transform });
    }, [placement, tooltipMaxWidth, offset]);

    const arrowPlacementMap: Record<TooltipPlacement, string> = {
        'top-start': 'rounded-br-xs top-full left-[0.8535rem] -translate-y-1/2',
        top: 'rounded-br-xs top-full left-1/2 -translate-x-1/2 -translate-y-1/2',
        'top-end': 'rounded-br-xs top-full right-[0.8535rem] -translate-y-1/2',

        'right-start': 'rounded-bl-xs top-[0.8535rem] left-0 -translate-x-1/2',
        right: 'rounded-bl-xs top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
        'right-end': 'rounded-bl-xs bottom-[0.8535rem] left-0 -translate-x-1/2',

        'bottom-start': 'rounded-tl-xs top-0 left-[0.8535rem] -translate-y-1/2',
        bottom: 'rounded-tl-xs top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'bottom-end': 'rounded-tl-xs top-0 right-[0.8535rem] -translate-y-1/2',

        'left-start': 'rounded-tr-xs top-[0.8535rem] right-0 translate-x-1/2',
        left: 'rounded-tr-xs top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
        'left-end': 'rounded-tr-xs bottom-[0.8535rem] right-0 translate-x-1/2',
    };

    const getArrowPositionClass = arrowPlacementMap[placement] ?? '';

    const clearTimeoutIfExists = useCallback(() => {
        if (fadeOutTimeoutRef.current) {
            clearTimeout(fadeOutTimeoutRef.current);
            fadeOutTimeoutRef.current = null;
        }
    }, []);

    const hideTooltip = useCallback(() => {
        setOpacity(0);
        clearTimeoutIfExists();

        fadeOutTimeoutRef.current = setTimeout(() => {
            setIsMounted(false);
        }, transitionDuration);
    }, [transitionDuration, clearTimeoutIfExists]);

    useEffect(() => {
        if (isMounted) window.addEventListener('scroll', hideTooltip, true);

        return () => {
            window.removeEventListener('scroll', hideTooltip, true);
        };
    }, [isMounted, hideTooltip]);

    const handlePointerEnter = () => {
        clearTimeoutIfExists();
        updateTooltipPosition();
        setIsMounted(true);

        requestAnimationFrame(() => {
            setOpacity(1);
        });
    };

    const handlePointerLeave = () => {
        hideTooltip();
    };

    if (!message) {
        return <>{children}</>;
    }

    return (
        <>
            <div
                ref={tooltipTriggerRef}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
                className={triggerClassName}
            >
                {children}
            </div>

            {isMounted &&
                createPortal(
                    <div
                        className={`text-primary-text pointer-events-none fixed z-9999 flex items-center justify-center rounded-md bg-[#373e47] ${sizeClasses} ${className}`}
                        style={{
                            top: `${tooltipPosition.top}px`,
                            left: `${tooltipPosition.left}px`,
                            transform: tooltipPosition.transform,
                            maxWidth: `${tooltipMaxWidth}px`,
                            transition: `opacity ${transitionDuration}ms ease-in-out`,
                            opacity,
                        }}
                    >
                        <span className="leading-none [text-edge:cap_alphabetic]">{message}</span>
                        {showArrow && (
                            <div
                                className={`absolute h-[0.7071rem] w-[0.7071rem] rotate-45 bg-[#373e47] ${getArrowPositionClass}`}
                            />
                        )}
                    </div>,
                    document.body,
                )}
        </>
    );
};
