import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IAuthenticatedRequest } from '../types/IAuthenticatedRequest';
import { HttpError, handleHttpError } from '../utils/errors.util';
import usersService from '../services/users.service';

const updateUser = async (req: IAuthenticatedRequest, res: Response) => {
	try {
		if (!req.user)
			throw new HttpError(
				'Unauthorized Access. Please Log in.',
				StatusCodes.UNAUTHORIZED
			);

		const updatedUser = await usersService.updateUser(
			req.user.user_id,
			req.body
		);

		return res.status(StatusCodes.OK).json({
			success: true,
			data: {
				user: updatedUser,
			},
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const usersController = {
	updateUser,
};

export default usersController;
