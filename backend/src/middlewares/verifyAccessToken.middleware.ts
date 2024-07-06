import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IAuthenticatedRequest } from '../types/IAuthenticatedRequest';
import { verifyAccessToken } from '../utils/tokens.util';

/**
 * Used to block access from users without a valid token
 *
 */
const verifyAccessTokenMiddleware = (
	req: IAuthenticatedRequest, // Request obj that may include user object
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: 'Unauthorized Access. Please Log in.' });
	}

	verifyAccessToken(token)
		.then((userInfo: any) => {
			req.user = userInfo;
			next();
		})
		.catch(() => {
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json({ message: 'Unauthorized Access. Please Log in.' });
		});
};

export default verifyAccessTokenMiddleware;
