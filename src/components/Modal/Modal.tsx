import ReactDOM from 'react-dom';
import { XIcon } from '../../assets/icons';
import type { ModalProps } from './Modal.types';
import { useDevice } from '../../hooks';

export const Modal = ({ title, customTitle, isOpen, onClose, children, maxWidth = 'max-w-160' }: ModalProps) => {
    const isMobile = useDevice() === 'mobile';

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 flex justify-center bg-black/60 ${isMobile ? 'items-end' : 'items-center'}`}
            onClick={onClose}
        >
            <div
                className={`relative w-full min-w-90 ${maxWidth} mx-3 my-20 rounded-[0.375rem] border border-[#3d444d] bg-[#161b22] shadow-lg`}
                style={{ animation: 'slide-in-bottom 0.2s ease-out both' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#3d444d] px-4 py-3">
                    {customTitle
                        ? customTitle
                        : title && <h2 className="text-base font-medium text-[#f0f6fc]">{title}</h2>}
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center text-[#9198A1] transition-colors hover:text-[#f0f6fc] active:text-[#768390]"
                    >
                        <XIcon size="1.25rem" />
                    </button>
                </div>

                <div className="p-4">{children}</div>
            </div>
        </div>,
        document.body,
    );
};
