import { QueryResult } from 'pg';
import { StatusCodes } from 'http-status-codes';

import { IUser, IUserUpdate } from '../types/IUser';
import { UserModel } from '../models/User.model';
import pool from '../configs/db.config';
import { USERS_TABLE } from '../configs/constants.config';
import { HttpError } from '../utils/errors.util';
import hashPassword from '../utils/hashPassword.util';

const updateUser = async (userId: number, userInfo: IUserUpdate) => {
	// check if new username is available
	const usernameExists: QueryResult<UserModel> = await pool.query(
		`SELECT username FROM ${USERS_TABLE} WHERE username = $1 AND user_id != $2`,
		[userInfo.username, userId]
	);

	if (usernameExists.rows.length > 0) {
		// username exists
		throw new HttpError('Username already exists', StatusCodes.CONFLICT);
	}

	// check if new email is available
	const emailExists: QueryResult<UserModel> = await pool.query(
		`SELECT email FROM ${USERS_TABLE}  WHERE email = $1 AND user_id != $2`,
		[userInfo.email, userId]
	);

	if (emailExists.rows.length > 0) {
		// email exists
		throw new HttpError('Email already exists', StatusCodes.CONFLICT);
	}

	// hash password
	const hashedPassword = await hashPassword(userInfo.password);

	const updatedUser: QueryResult<IUser> = await pool.query(
		`
			UPDATE ${USERS_TABLE}
			SET 
				email = $1,
				username = $2,
				password = $3,
				updated_at = $4
			WHERE user_id = $5
			RETURNING user_id, username, email, created_at;
        `,
		[
			userInfo.email,
			userInfo.username,
			hashedPassword,
			new Date().toUTCString(),
			userId,
		]
	);

	if (updatedUser.rows.length === 0) {
		// user not created
		throw new HttpError('Error updating the user. Try Again.');
	}

	return updatedUser.rows[0];
};

const usersService = {
	updateUser,
};

export default usersService;
