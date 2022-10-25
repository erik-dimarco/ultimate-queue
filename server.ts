// import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import cors from 'cors';

import config from 'config';
import log from 'lib/logger';
import { restfulErrorHandler } from 'middleware';
import router from 'router';

const main = async () => {
	const app = express();

	const { port } = config.server;

	app.set('etag', false);
	app.use('/api/*', cors(config.corsOptions));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use('/api', router);
	app.use(restfulErrorHandler);

	app.listen(port, () => {
		log.info(`🚀 The server has started on port ${port}`);
	});
};

main();
