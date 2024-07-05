// Added these functions separately to make the package easily swappable

import { Toast } from 'toastify-react-native';

const POSITION = 'top';

const success = (message: string) => {
	Toast.success(message, POSITION);
};

const warn = (message: string) => {
	Toast.warn(message, POSITION);
};

const info = (message: string) => {
	Toast.info(message, POSITION);
};

const error = (message: string) => {
	Toast.error(message, POSITION);
};

const showToastsUtil = {
	success,
	warn,
	info,
	error,
};

export default showToastsUtil;
