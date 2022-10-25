import express from 'express';

import routes from './routes';

const router = express.Router();

//Route registration for non-graphQL:endpoints
routes.forEach(({ method, path, controller }) => {
	router[method](path, controller);
});

export default router;
