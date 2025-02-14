import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
	generateRefreshToken,
	generateAccessToken,
} from '../utils/tokens.util';
import authService from '../services/auth.service';
import { handleHttpError } from '../utils/errors.util';
import categoriesService from '../services/categories.service';

const loginUser = async (req: Request, res: Response) => {
	try {
		const user = await authService.loginUser(req.body);

		return res.status(StatusCodes.OK).json({
			success: true,
			user,
			access_token: generateAccessToken({ user_id: user.user_id }),
			refresh_token: generateRefreshToken({ user_id: user.user_id }),
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const registerUser = async (req: Request, res: Response) => {
	try {
		const newUser = await authService.registerUser(req.body);

		// seed some basic categories after user has been successfully created
		await categoriesService.seedCategories(newUser.user_id);

		return res.status(StatusCodes.CREATED).json({
			success: true,
			user: newUser,
			access_token: generateAccessToken({ user_id: newUser.user_id }),
			refresh_token: generateRefreshToken({
				user_id: newUser.user_id,
			}),
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const authController = {
	loginUser,
	registerUser,
};

export default authController;
