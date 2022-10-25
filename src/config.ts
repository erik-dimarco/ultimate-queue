import { CorsOptions } from 'cors';

function int(str: string | undefined, radix?: number) {
	if (str === undefined) {
		return undefined;
	}

	return parseInt(str, radix);
}

export default {
	server: {
		port: int(process.env.APP_PORT) || 4002
	},
	corsOptions: {
		origins: process.env.NODE_ENV !== 'local' ? /\.ultimate-queue-production.up.railway\.app$/ : '*'
	} as CorsOptions
};
