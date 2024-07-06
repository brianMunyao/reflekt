import { Request } from 'express';

/**
 * Request that may include the current user's id
 */
export interface IAuthenticatedRequest extends Request {
	user?: { user_id: number };
}
