import { ILoginCredentials, IUserNew } from '@/types/IUser';
import axiosClient from '../configs/axiosConfig';

const registerUser = async (newUser: IUserNew) => {
	try {
		const response = await axiosClient.post('/auth/register/', newUser);

		return response.data;
	} catch (error) {
		return {
			message: 'Server Error. Try Again Later.',
		};
	}
};

const loginUser = async (loginCredentials: ILoginCredentials) => {
	try {
		const response = await axiosClient.post(
			'/auth/login/',
			loginCredentials
		);

		return response.data;
	} catch (error) {
		return {
			message: 'Server Error. Try Again Later.',
		};
	}
};

const authService = {
	registerUser,
	loginUser,
};

export default authService;
