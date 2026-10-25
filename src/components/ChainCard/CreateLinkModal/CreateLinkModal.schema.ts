import { z } from 'zod';

export const bulkSimpleLinkItemSchema = z.object({
    name: z.string().trim().min(1, { message: 'Name is required' }),
    url: z.url({ protocol: /^(?!javascript$|data$)/i, message: 'Invalid URL format' }),
});
