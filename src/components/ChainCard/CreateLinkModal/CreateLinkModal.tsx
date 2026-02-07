import { useState } from 'react';
import { Modal } from '../../Modal/Modal';
import { Line } from '../../Line';
import type { CreateLinkModalProps, CreateLinkForm } from './CreateLinkModal.types';

const initialForm: CreateLinkForm = {
    title: '',
    url: '',
};

export const CreateLinkModal = ({ isOpen, onClose, chainName }: CreateLinkModalProps) => {
    const [form, setForm] = useState<CreateLinkForm>(initialForm);

    const handleChange = (field: keyof CreateLinkForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleClose = () => {
        setForm(initialForm);
        onClose();
    };

    const handleSave = () => {
        console.log('Creating link:', form);
        setForm(initialForm);
        onClose();
    };

    const isFormValid = form.title.trim() !== '' && form.url.trim() !== '';

    return (
        <Modal title={`New Link - ${chainName}`} isOpen={isOpen} onClose={handleClose}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col rounded-[0.375rem] border border-[#3d444d] bg-[#0d1117]">
                    <input
                        type="text"
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className="w-full px-3 py-2 text-sm text-[#f0f6fc] focus:outline-none"
                    />
                    <Line />
                    <input
                        type="text"
                        placeholder="https://example.com"
                        value={form.url}
                        onChange={(e) => handleChange('url', e.target.value)}
                        className="w-full px-3 py-2 text-sm text-[#9198A1] focus:outline-none"
                    />
                </div>

                <div className="flex justify-end gap-2 border-t border-[#3d444d] pt-4">
                    <button
                        onClick={handleClose}
                        className="cursor-pointer rounded-[0.375rem] border border-[#3d444d] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#3d444d]"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!isFormValid}
                        className="cursor-pointer rounded-[0.375rem] bg-[#238636] px-4 py-2 text-sm text-[#f0f6fc] transition-colors hover:bg-[#29903b] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Crear link
                    </button>
                </div>
            </div>
        </Modal>
    );
};
