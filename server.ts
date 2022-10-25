// import cors from 'cors';
import express from 'express';
import 'reflect-metadata';

import config from 'config';
import log from 'lib/logger';

const main = async () => {
	const app = express();

	const { port } = config.server;

	app.set('etag', false);
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.listen(port, () => {
		log.info(`🚀 The server has started on port ${port}`);
	});
};

main();
