import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../db/client';
import logger from 'lib/logger';
import { IRoute } from 'types';
import { validate } from '../middleware';

const dataSchema = z.object({
	body: z.object({
		taskIdentifier: z.string({
			required_error: 'Task Identifier is required'
		}),
		data: z.any().optional(),
		runAt: z.date().optional(),
		maxAttempts: z.number().optional()
	})
});

export default {
	method: 'post',
	path: '/job',
	controller: async (req: Request, res: Response) => {
		logger.info('Received Add Job request', { body: req.body });

		validate(dataSchema)(req, res, async () => {
			const { taskIdentifier, data, runAt, maxAttempts } = req.body;

			const job = await prisma.jobs.create({
				data: {
					taskIdentifier,
					payload: data,
					runAt,
					maxAttempts
				}
			});

			return res.status(200).json(job);
		});
	}
} as IRoute;
