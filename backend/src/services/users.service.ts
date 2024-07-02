import { QueryResult } from 'pg';

import { IUserUpdate } from '../types/IUser';
import { UserModel } from '../models/User.model';
import pool from '../configs/db.config';
import { USERS_TABLE } from '../configs/constants.config';

const updateUser = async (userId: number, userInfo: IUserUpdate) => {
	// check if new username is available
	const usernameExists: QueryResult<UserModel> = await pool.query(
		`SELECT username FROM ${USERS_TABLE} WHERE username = $1 AND user_id`,
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

const usersService = {
	updateUser,
};

export default usersService;
