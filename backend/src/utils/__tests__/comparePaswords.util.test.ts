import { comparePasswords } from '../comparePasswords.util';
import hashPassword from '../hashPassword.util';

const password = 'password';

const wrongPassword = 'wrongPassword';

test('It retuns true when passwords match', async () => {
	const passwordHashed = await hashPassword(password);
	const isPasswordMatch = await comparePasswords(password, passwordHashed);
	expect(isPasswordMatch).toBe(true);
});

test('It retuns false when passwords do not match', async () => {
	const passwordHashed = await hashPassword(password);
	const isPasswordMatch = await comparePasswords(
		wrongPassword,
		passwordHashed
	);
	expect(isPasswordMatch).toBe(false);
});
