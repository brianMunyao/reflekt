import { ILoginCredentials } from '@/types/IUser';
import axiosClient from '../configs/axiosConfig';

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
	loginUser,
};

export default authService;
