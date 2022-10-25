import { isBoom } from 'boom';
import { Request, Response, NextFunction } from 'express';
import logger from '../lib/logger';

/***
 * This error handler is primarily for errors within the RESTful
 * routes. It will catch any errors thrown by the routes and
 * return a JSON response with the error message.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars
export default (err: any, req: Request, res: Response, next: NextFunction): Response<any> => {
	if (isBoom(err)) {
		return res.status(err.output.statusCode).json(err.output.payload);
	} else if (err.statusCode) {
		logger.error('Error ', err);

		return res.status(err.statusCode).json({
			statusCode: err.statusCode,
			error: err.error,
			message: err.message
		});
	}
	// All other logging for errors should be done at Repo or controller layer
	logger.error('Server error ', err);

	return res.status(500).json({
		statusCode: 500,
		error: 'Server Error',
		message: 'There has been a server error'
	});
};
