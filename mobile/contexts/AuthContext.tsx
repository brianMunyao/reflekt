import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import { router } from 'expo-router';

import { ILoginCredentials, IUser, IUserNew } from '@/types/IUser';
import localStore from '@/utils/localStoreUtil';
import {
	ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
	USER_KEY,
} from '@/constants/LocalStoreKeys';
import authService from '@/api/services/authService';

interface IAuthContext {
	user: IUser | null;
	loading: boolean;
	login: (loginCredential: ILoginCredentials) => Promise<any>;
	register: (newUser: IUserNew) => Promise<any>;
	logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getUserInfo = async () => {
			// check if the userInfo and token are available in the local store
			const userInfo: IUser | null = await localStore.getData(USER_KEY);
			const token: string | null = await localStore.getData(
				ACCESS_TOKEN_KEY
			);

			if (!userInfo || !token) {
				// take them to login

				await localStore.removeData(USER_KEY);
				await localStore.removeData(ACCESS_TOKEN_KEY);
				await localStore.removeData(REFRESH_TOKEN_KEY);

				router.replace('/login');
			} else {
				setUser(userInfo);
			}

			setLoading(false);
		};

		getUserInfo();
	});

	const register = async (newUser: IUserNew) => {
		const response = await authService.registerUser(newUser);

		if (response.success) {
			const _user = response.user;
			const _accessToken = response.access_token;
			const _refreshToken = response.refresh_token;

			await localStore.setData(USER_KEY, _user);
			await localStore.setData(ACCESS_TOKEN_KEY, _accessToken);
			await localStore.setData(REFRESH_TOKEN_KEY, _refreshToken);

			// take them to the homepage
			// this is handled in the register page
		}

		return response;
	};

	const login = async (loginCredentials: ILoginCredentials) => {
		const response = await authService.loginUser(loginCredentials);

		if (response.success) {
			const _user = response.user;
			const _accessToken = response.access_token;
			const _refreshToken = response.refresh_token;

			await localStore.setData(USER_KEY, _user);
			await localStore.setData(ACCESS_TOKEN_KEY, _accessToken);
			await localStore.setData(REFRESH_TOKEN_KEY, _refreshToken);

			// take them to the homepage
			// this is handled in the login page
		}

		return response;
	};

	const logout = async () => {
		// clear everything and move them to login
		await localStore.removeData(USER_KEY);
		await localStore.removeData(ACCESS_TOKEN_KEY);
		await localStore.removeData(REFRESH_TOKEN_KEY);

		setUser(null);

		router.replace('/login');
	};

	return (
		<AuthContext.Provider
			value={{ loading, user, login, register, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = (): IAuthContext => {
	const context = useContext(AuthContext);

	if (!context) throw new Error('AuthContext not in AuthProvider');

	return context;
};

export { AuthProvider, useAuth };
