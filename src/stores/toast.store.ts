import { create } from 'zustand';
import type { Toast, ToastVariant } from '../components/Toast/Toast.types';

interface ToastState {
    toastList: Toast[];
    addToast: (message: string, variant?: ToastVariant) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>()((set) => ({
    toastList: [],
    addToast: (message, variant) => {
        const id = crypto.randomUUID();
        set((state) => ({
            toastList: [...state.toastList, { id, message, variant }],
        }));
    },
    removeToast: (id) => {
        set((state) => ({
            toastList: state.toastList.filter((t) => t.id !== id),
        }));
    },
}));

// Optional hook : simplifies toast creation by exposing one method per variant.
export const useToast = () => {
    const addToast = useToastStore((state) => state.addToast);

    return {
        success: (message: string) => addToast(message, 'success'),
        error: (message: string) => addToast(message, 'error'),
        warning: (message: string) => addToast(message, 'warning'),
        info: (message: string) => addToast(message, 'info'),
    };
};
