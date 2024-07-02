/**
 *
 * This is a custom error class added to avoid triggering catch block
 *  in controllers with returns 500 always
 *
 */

import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class HttpError extends Error {
	public readonly status: number;

	constructor(message: string, status: number = 500) {
		super(message);
		this.status = status;
	}
}

export const handleHttpError = (res: Response, error: any) => {
	if (error instanceof HttpError) {
		return res
			.status(error.status)
			.json({ success: false, message: error.message });
	} else {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			success: false,
			message: 'Server Error. Try Again Later.',
		});
	}
};
