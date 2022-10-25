import { Response } from 'express';
import { IRoute } from 'types';

export default {
	method: 'post',
	path: '/queue',
	controller: async (req: Request, res: Response) => {
		const queue = {
			queue: true,
			nodeEnv: process.env.NODE_ENV
		};

		return res.status(200).send(queue);
	}
} as IRoute;
