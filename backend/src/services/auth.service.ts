import { QueryResult } from 'pg';

import pool from '../configs/db.config';
import { comparePasswords } from '../utils/comparePasswords.util';

import { ILoginCredentials } from '../types/ILoginCredentials';
import { IUser } from '../types/IUser';
import { UserModel } from '../models/User.model';
import { HttpError } from '../utils/errors.util';
import { StatusCodes } from 'http-status-codes';

const loginUser = async (loginCredentials: ILoginCredentials) => {
	const user: QueryResult<UserModel> = await pool.query(
		`SELECT user_id, username, email, password, created_at FROM users WHERE username = $1`,
		[loginCredentials.username]
	);

	if (user.rowCount === 0) {
		// User not found
		throw new HttpError(
			'Invalid username or password.',
			StatusCodes.NOT_FOUND
		);
	}

	const foundUser = user.rows[0];
	const isPasswordMatch = await comparePasswords(
		loginCredentials.password,
		foundUser.password
	);

	if (!isPasswordMatch) {
		// Invalid password
		throw new HttpError(
			'Invalid username or password.',
			StatusCodes.NOT_FOUND
		);
	}

	const result: IUser = {
		user_id: foundUser.user_id,
		email: foundUser.email,
		username: foundUser.username,
		created_at: foundUser.created_at,
		updated_at: foundUser.updated_at,
	};

	return result;
};

const authService = {
	loginUser,
};

export default authService;
