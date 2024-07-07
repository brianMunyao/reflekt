import request from 'supertest';
import app from '../../app';
import { generateAccessToken } from '../../utils/tokens.util';

describe('categories routes', () => {
	// Test db has users of ids(1,2,3) and categories of ids(1,2,3)

	const token = generateAccessToken({ user_id: 1 }); // enforced in test environment

	test('GET: /categories: It returns an array of categories', (done) => {
		request(app)
			.get('/api/categories/')
			.set('Authorization', `Bearer ${token}`)
			.then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.body.success).toBe(true);
			})
			.finally(() => done());
	});

	test('POST: /categories: It creates a new category and returns it', (done) => {
		const newCategoryName = 'new-category-name';
		const newCategoryIcon = 'briefcase-outline';

		request(app)
			.post('/api/categories/')
			.send({ name: newCategoryName, icon: newCategoryIcon })
			.set('Authorization', `Bearer ${token}`)
			.then((response) => {
				expect(response.statusCode).toBe(201);
				expect(response.body.success).toBe(true);
				expect(response.body.data.category.name).toBe(newCategoryName);
				expect(response.body.data.category.icon).toBe(newCategoryIcon);
			})
			.finally(() => done());
	});

	test('PUT: /categories/:id: It updates a category and returns it', (done) => {
		const updatedCategoryName = 'Category 2 - updated';
		const updatedCategoryIcon = 'bus-outline';

		request(app)
			.put('/api/categories/1')
			.send({ name: updatedCategoryName, icon: updatedCategoryIcon })
			.set('Authorization', `Bearer ${token}`)
			.then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.body.success).toBe(true);
				expect(response.body.data.category.name).toBe(
					updatedCategoryName
				);
				expect(response.body.data.category.icon).toBe(
					updatedCategoryIcon
				);
			})
			.finally(() => done());
	});

	test('DELETE: /categories/:id: It deletes a category and returns its id', (done) => {
		request(app)
			.put('/api/categories/3')
			.set('Authorization', `Bearer ${token}`)
			.then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.body.success).toBe(true);
				expect(response.body.data.id).toBe(3);
			})
			.finally(() => done());
	});
});
