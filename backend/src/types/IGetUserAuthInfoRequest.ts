import { Request } from 'express';

/**
 * Request that may include the current user's id
 */
export interface IGetUserAuthInfoRequest extends Request {
	user: { user_id: number };
}
