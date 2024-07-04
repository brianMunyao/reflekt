import { ACCESS_TOKEN_KEY } from '@/constants/LocalStoreKeys';

import localStore from './localStoreUtil';

export const getToken = async () => {
	const token = await localStore.getData(ACCESS_TOKEN_KEY);

	return String(token) || null;
};
