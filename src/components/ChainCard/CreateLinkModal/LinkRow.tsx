import { Line } from '../../Line';
import { CheckCircleIcon, CircleIcon, XCircleIcon } from '../../../assets/icons';
import { bulkSimpleLinkItemSchema } from './CreateLinkModal.schema';
import { useState, type ReactElement } from 'react';
import type { BulkSimpleLinkItem } from '../../../types';
import type { LinkRowProps, LinkRowStatus } from './CreateLinkModal.types';

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
    const [link, setLink] = useState<BulkSimpleLinkItem>({ name: '', url: '' });
    const [status, setStatus] = useState<LinkRowStatus>('empty');

    const normalizeLinkForm = (link: BulkSimpleLinkItem): BulkSimpleLinkItem => ({
        name: link.name.trim(),
        url: link.url.trim(),
    });

    const validateLink = (link: BulkSimpleLinkItem): LinkRowStatus => {
        if (!link.name && !link.url) return 'empty';
        return bulkSimpleLinkItemSchema.safeParse(link).success ? 'valid' : 'invalid';
    };

    const handleChange = (field: 'name' | 'url', value: string) => {
        const updatedLink = { ...link, [field]: value };
        const normalizedLink = normalizeLinkForm(updatedLink);

        setLink(updatedLink);

        const linkStatus = validateLink(normalizedLink);
        setStatus(linkStatus);

        onLinkRowChange(index, { link: normalizedLink, status: linkStatus });
    };

    return (
        <div className="flex w-full flex-row gap-2">
            <div
                className={`flex w-[calc(100%-2.5rem)] rounded-[0.375rem] border bg-[#0d1117] ${borderByStatus[status]}`}
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
    );
};
