import express from 'express';
import routes from './routes';

const router = express.Router();

routes.forEach(({ method, path, controller }) => {
	router[method](path, controller);
});

export default router;
