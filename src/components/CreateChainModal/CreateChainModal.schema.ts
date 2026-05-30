import { z } from 'zod';

export const createChainFormSchema = z.object({
    chainName: z.string().trim().min(1, { message: 'Name is required' }),
});
