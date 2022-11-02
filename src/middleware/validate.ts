import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import logger from '../lib/logger';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars
export default (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await schema.parseAsync({
			body: req.body,
			query: req.query,
			params: req.params
		});
		return next();
	} catch (error) {
		logger.error('Input Validation Error ', error);
		return res.status(400).json(error);
	}
};
