// @ts-check
import { z } from 'zod';

export const serverSchema = z.object({
	DATABASE_URL: z.string().url(),
	NODE_ENV: z.enum(['development', 'test', 'production'])
});
