import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { XIcon } from '../../assets/icons';
import { useToastStore } from '../../stores/toast.store';
import { TOAST_DURATION } from '../../constants/toast';
import type { Toast, ToastVariant } from './Toast.types';

const variantStyles: Record<ToastVariant, string> = {
    success: 'border-l-[#3fb950]',
    error: 'border-l-[#f85149]',
    warning: 'border-l-[#d29922]',
    info: 'border-l-[#58a6ff]',
};

const ToastItem = ({ id, message, variant = 'info' }: Toast) => {
    const removeToast = useToastStore((state) => state.removeToast);

    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleRemove = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => removeToast(id), 200);
    }, [removeToast, id]);

    useEffect(() => {
        timerRef.current = setTimeout(handleRemove, TOAST_DURATION);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [handleRemove]);

    return (
        <div
            className={`border-input-border pointer-events-auto flex w-80 gap-3 rounded-md border border-l-4 bg-[#161b22] px-4 py-3 shadow-2xl ${variantStyles[variant]}`}
            style={{
                animation: isClosing ? 'slide-out-right 0.2s ease-out both' : 'slide-in-right 0.4s ease-out both',
            }}
        >
            <p className="text-primary-text flex-1 text-sm">{message}</p>
            <button
                type="button"
                onClick={handleRemove}
                className="hover:text-primary-text flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center text-[#9198A1] transition-colors"
            >
                <XIcon size="1.25rem" />
            </button>
        </div>
    );
};

export const ToastContainer = () => {
    const toastList = useToastStore((state) => state.toastList);

    return ReactDOM.createPortal(
        <div className="pointer-events-none fixed top-8 right-4 z-100 flex flex-col gap-3">
            {toastList.map((toast) => (
                <ToastItem key={toast.id} {...toast} />
            ))}
        </div>,
        document.body,
    );
};
