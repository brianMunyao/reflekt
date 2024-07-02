/**
 *
 * This is a custom error class added to avoid triggering catch block
 *  in controllers with returns 500 always
 *
 */
export class HttpError extends Error {
	public readonly status: number;

	constructor(message: string, status: number = 500) {
		super(message);
		this.status = status;
	}
}
