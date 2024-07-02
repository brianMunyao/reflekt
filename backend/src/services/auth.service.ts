import { QueryResult } from 'pg';

import pool from '../configs/db.config';
import { comparePasswords } from '../utils/comparePasswords.util';

import { ILoginCredentials } from '../types/ILoginCredentials';
import { IUser, IUserNew } from '../types/IUser';
import { UserModel } from '../models/User.model';
import { HttpError } from '../utils/errors.util';
import { StatusCodes } from 'http-status-codes';
import { USERS_TABLE } from '../configs/constants.config';
import hashPassword from '../utils/hashPassword.util';

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

const registerUser = async (userInfo: IUserNew) => {
	// check if username exists
	const usernameExists: QueryResult<UserModel> = await pool.query(
		`SELECT username FROM ${USERS_TABLE} WHERE username = $1`,
		[userInfo.username]
	);

	if (usernameExists.rows.length > 0) {
		// username exists
		throw new HttpError('Username already exists', StatusCodes.CONFLICT);
	}

	// check if email exists
	const emailExists: QueryResult<UserModel> = await pool.query(
		`SELECT email FROM ${USERS_TABLE}  WHERE email = $1`,
		[userInfo.email]
	);

	if (emailExists.rows.length > 0) {
		// email exists
		throw new HttpError('Email already exists', StatusCodes.CONFLICT);
	}

	// hash password
	const hashedPassword = await hashPassword(userInfo.password);

	const newUser: QueryResult<IUser> = await pool.query(
		`
        INSERT INTO ${USERS_TABLE} (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING user_id, username, email, created_at
        `,
		[userInfo.username, userInfo.email, hashedPassword]
	);

	if (newUser.rows.length === 0) {
		// user not created
		throw new HttpError('Error registering the user. Try Again.');
	}

	return newUser.rows[0];
};

const authService = {
	loginUser,
	registerUser,
};

export default authService;
