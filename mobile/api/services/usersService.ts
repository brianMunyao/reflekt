import axiosClient from '../configs/axiosConfig';
import { IUpdateUserResponse, IUserUpdate } from '@/types/IUser';

const updateUser = async (updatedUser: IUserUpdate) => {
	try {
		const response = await axiosClient.put<IUpdateUserResponse>(
			`/users/`,
			updatedUser
		);

		return response.data;
	} catch (error) {
		return {
			success: false,
			message: 'Server Error. Try Again Later.',
		};
	}
};

const usersService = {
	updateUser,
};

export default usersService;
