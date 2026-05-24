import { Line } from '../../Line';
import { CaretDownIcon, CheckCircleIcon, CircleIcon, XCircleIcon } from '../../../assets/icons';
import { bulkSimpleLinkItemSchema } from './CreateLinkModal.schema';
import { useState, type ReactElement } from 'react';
import type { LinkFormItem } from '../../../types';
import type { LinkRowProps, LinkRowStatus } from './CreateLinkModal.types';
import { LinkIcon } from '../../LinkIcon';
import { IconPicker } from '../../IconPicker/IconPicker';

const borderByStatus: Record<LinkRowStatus, string> = {
    empty: 'border-[#3d444d]',
    valid: 'border-[#3fb950]',
    invalid: 'border-[#f85149]',
};

const iconByStatus: Record<LinkRowStatus, ReactElement> = {
    empty: <CircleIcon size="1.5rem" color="#3d444d" />,
    valid: <CheckCircleIcon size="1.5rem" color="#3fb950" />,
    invalid: <XCircleIcon size="1.5rem" color="#f85149" />,
};

export const LinkRow = ({ index, onLinkRowChange }: LinkRowProps) => {
    const [link, setLink] = useState<LinkFormItem>({ name: '', url: '', icon: 'default' });
    const [status, setStatus] = useState<LinkRowStatus>('empty');
    const [showIconPicker, setShowIconPicker] = useState(false);

    const normalizeLinkForm = (link: LinkFormItem): LinkFormItem => ({
        name: link.name.trim(),
        url: link.url.trim(),
        icon: link.icon,
    });

    const validateLink = (link: LinkFormItem): LinkRowStatus => {
        if (!link.name && !link.url) return 'empty';
        return bulkSimpleLinkItemSchema.safeParse(link).success ? 'valid' : 'invalid';
    };

    const handleChange = (field: 'name' | 'url' | 'icon', value: string) => {
        const updatedLink = { ...link, [field]: value };
        const normalizedLink = normalizeLinkForm(updatedLink);

        setLink(updatedLink);

        const linkStatus = validateLink(normalizedLink);
        setStatus(linkStatus);

        onLinkRowChange(index, { link: normalizedLink, status: linkStatus });
        setShowIconPicker(false);
    };

    const handleIconChange = (icon: string) => {
        handleChange('icon', icon);
    };

    return (
        <div className="flex flex-col">
            <div className="flex w-full flex-row gap-2">
                <button
                    type="button"
                    onClick={() => setShowIconPicker((prev) => !prev)}
                    className={`flex h-9.5 w-14 cursor-pointer items-center justify-center gap-1 rounded-md border transition-colors hover:bg-[#1c2128] ${
                        showIconPicker ? 'border-[#2f81f7] bg-[#1c2128]' : 'border-input-border hover:bg-[#1c2128]'
                    }`}
                >
                    <LinkIcon name={link.name} iconName={link.icon} size="small" />
                    <CaretDownIcon size="1rem" color="#9198A1" />
                </button>
                <div
                    className={`flex w-[calc(100%-6.5rem)] rounded-[0.375rem] border bg-[#0d1117] ${borderByStatus[status]}`}
                >
                    <input
                        id={`name-${index}`}
                        type="text"
                        placeholder="Name"
                        value={link.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        autoFocus={index === 0}
                        autoComplete="off"
                        className="min-w-0 flex-5 px-3 py-2 text-sm text-[#b3bbc5] focus:outline-none"
                    />
                    <Line orientation="vertical" borderColorClassName={borderByStatus[status]} />
                    <input
                        id={`url-${index}`}
                        type="text"
                        placeholder="https://example.com"
                        value={link.url}
                        onChange={(e) => handleChange('url', e.target.value)}
                        autoComplete="off"
                        className="min-w-0 flex-6 px-3 py-2 text-sm text-[#b3bbc5] focus:outline-none"
                    />
                </div>
                <div className="flex w-8 items-center justify-center">{iconByStatus[status]}</div>
            </div>
            <div
                className={`overflow-hidden transition-all duration-200 ease-out ${
                    showIconPicker ? 'mt-2 h-27' : 'mt-0 h-0'
                }`}
            >
                <IconPicker value={link.icon} onChange={handleIconChange} />
            </div>
        </div>
    );
};
