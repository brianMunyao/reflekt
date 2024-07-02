import jwt from 'jsonwebtoken';

interface Payload {
	user_id: number;
}

export const generateAccessToken = (user: Payload) => {
	if (process.env.AUTH_SECRET_KEY) {
		return jwt.sign(user, process.env.AUTH_SECRET_KEY, { expiresIn: '1d' });
	}

	console.error('ERROR:', 'Environment not setup properly');
	throw new Error('Environment not setup properly');
};
export const generateRefreshToken = (user: Payload) => {
	if (process.env.REFRESH_SECRET_KEY) {
		return jwt.sign(user, process.env.REFRESH_SECRET_KEY, {
			expiresIn: '7d',
		});
	}

	console.error('ERROR:', 'Environment not setup properly');
	throw new Error('Environment not setup properly');
};

export const verifyAccessToken = (accessToken: string) => {
	return new Promise((resolve, reject) => {
		jwt.verify(
			accessToken,
			process.env.AUTH_SECRET_KEY || '',
			(err, decoded) => {
				if (err) {
					reject({ message: 'Unauthorized Access. Please Log in.' });
				} else {
					resolve(decoded as Payload);
				}
			}
		);
	});
};

export const verifyRefreshToken = (refreshToken: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		jwt.verify(
			refreshToken,
			process.env.REFRESH_SECRET_KEY || '',
			(err, decoded) => {
				if (err || decoded === undefined) {
					reject({ message: 'Invalid refresh token' });
				} else {
					resolve(decoded);
				}
			}
		);
	});
};
