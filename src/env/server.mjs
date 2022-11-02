// @ts-check
import { serverSchema } from './schema.mjs';

const _serverEnv = serverSchema.safeParse(process.env);

const formatErrors = (
	/** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
	errors
) =>
	Object.entries(errors)
		.map(([name, value]) => {
			if (value && '_errors' in value) return `${name}: ${value._errors.join(', ')}\n`;
		})
		.filter(Boolean);

if (_serverEnv.success === false) {
	console.error('❌ Invalid environment variables:\n', ...formatErrors(_serverEnv.error.format()));
	throw new Error('Invalid environment variables');
}

/**
 * Validate that server-side environment variables are not exposed to the client.
 */
for (let key of Object.keys(_serverEnv.data)) {
	if (key.includes('PUBLIC')) {
		console.warn('❌ You are exposing a server-side env-variable:', key);

		throw new Error('You are exposing a server-side env-variable');
	}
}

export const env = { ..._serverEnv.data };
