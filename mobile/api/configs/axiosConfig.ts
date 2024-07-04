import { ACCESS_TOKEN_KEY } from '@/constants/LocalStoreKeys';
import { getToken } from '@/utils/getTokenUtil';
import localStore from '@/utils/localStoreUtil';
import axios from 'axios';

const axiosClient = axios.create({
	baseURL: process.env.API_URL,
	timeout: 10000,
});

// interceptor to include the token in headers
axiosClient.interceptors.request.use(
	async (config) => {
		// do not append auth token in auth paths
		if (
			!(config.url?.includes('login') && config.url?.includes('register'))
		) {
			const token = await getToken();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// interceptor to centrally check unauthorized access
axiosClient.interceptors.response.use(
	async (response) => {
		if (response.status === 401) {
			await localStore.removeData(ACCESS_TOKEN_KEY);
		}

		return response;
	},
	(error) => {
		// Handle error
		return Promise.reject(error);
	}
);

export default axiosClient;
