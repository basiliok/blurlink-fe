import { z } from 'zod';

export const bulkSimpleLinkItemSchema = z.object({
    name: z.string().trim().min(1, { message: 'Name is required' }),
    url: z.url({ protocol: /^(?!javascript$|data$)/i, message: 'Invalid URL format' }),
});

export const createBulkLinksSchema = z.object({
    spaceId: z.string().min(30, { message: 'Space ID is required' }),
    chainId: z.string().min(30, { message: 'Chain ID is required' }),
    links: z
        .array(bulkSimpleLinkItemSchema)
        .min(1, { message: 'At least one link is required' })
        .max(15, { message: 'Maximum 15 links allowed per request' }),
});
