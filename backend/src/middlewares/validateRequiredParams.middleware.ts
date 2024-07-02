import { NextFunction, Request, Response } from 'express';

/**
 * This middleware function is used to check the required fields and return
 * a required field error to the user.
 *
 */

export default (expectedParams: string[] = []) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const errors: { [key: string]: string } = {};

		expectedParams.forEach((param) => {
			if (!Object.keys(req.body).includes(param)) {
				errors[param] = `The ${param} field is required.`;
			}
		});

		if (Object.keys(errors).length > 0) {
			return res.status(400).json({
				errors,
			});
		}

		next();
	};
};
