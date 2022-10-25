function int(str: string | undefined, radix?: number) {
	if (str === undefined) {
		return undefined;
	}

	return parseInt(str, radix);
}

export default {
	server: {
		port: int(process.env.APP_PORT) || 4002
	}
};
