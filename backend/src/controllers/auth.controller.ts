import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
	generateRefreshToken,
	generateAccessToken,
} from '../utils/tokens.util';
import authService from '../services/auth.service';
import { handleHttpError } from '../utils/errors.util';

const loginUser = async (req: Request, res: Response) => {
	try {
		const user = await authService.loginUser(req.body);

		return res.status(StatusCodes.OK).json({
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

		return res.status(StatusCodes.CREATED).json({
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
