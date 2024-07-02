import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IGetUserAuthInfoRequest } from '../types/IGetUserAuthInfoRequest';
import { HttpError } from '../utils/errors.util';
import usersService from '../services/users.service';

const updateUser = async (req: IGetUserAuthInfoRequest, res: Response) => {
	try {
		const updatedUser = await usersService.updateUser(
			req.user.user_id,
			req.body
		);

		return res.status(StatusCodes.OK).json({
			...updatedUser,
		});
	} catch (error) {
		if (error instanceof HttpError) {
			return res.status(error.status).json({ message: error.message });
		} else {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: 'Server Error. Try Again Later.',
			});
		}
	}
};

const usersController = {
	updateUser,
};

export default usersController;
