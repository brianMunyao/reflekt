import request from 'supertest';
import app from '../../app';

describe('auth routes', () => {
	describe('/login', () => {
		test('It returns an error if a user does not exist', (done) => {
			request(app)
				.post('/api/auth/login')
				.send({ username: 'invalid', password: 'invalid' })
				.then((response) => {
					expect(response.statusCode).toBe(404);
				})
				.finally(() => done());
		});
		test('It returns an error if a user exists but the password is wrong', (done) => {
			request(app)
				.post('/api/auth/login')
				.send({ username: 'admin1', password: 'invalid' })
				.then((response) => {
					expect(response.statusCode).toBe(404);
				})
				.finally(() => done());
		});
		test('It returns an success if a user passes correct credentials', (done) => {
			request(app)
				.post('/api/auth/login')
				.send({ username: 'admin', password: 'password' })
				.then((response) => {
					expect(response.statusCode).toBe(200);
					expect(response.body.success).toBe(true);
					expect(response.body).toHaveProperty('access_token');
				})
				.finally(() => done());
		});
	});

	describe('/register', () => {
		test('It should return 400 when some details are missing', (done) => {
			request(app)
				.post('/api/auth/register')
				.send({ username: 'invalid' })
				.then((response) => {
					expect(response.statusCode).toBe(400);
				})
				.finally(() => done());
		});

		test('It returns a 409 error if a username already exists', (done) => {
			request(app)
				.post('/api/auth/register')
				.send({
					username: 'admin1',
					password: 'invalid',
					email: `email-${Date.now()}@gmail.com`,
				})
				.then((response) => {
					expect(response.statusCode).toBe(409);
				})
				.finally(() => done());
		});

		test('It returns an 201 success if a user passes correct credentials', (done) => {
			request(app)
				.post('/api/auth/register')
				.send({
					email: `email-${Date.now()}@gmail.com`,
					username: Date.now().toString(),
					password: 'mypassword',
				})
				.then((response) => {
					expect(response.statusCode).toBe(201);
				})
				.finally(() => done());
		});
	});
});
