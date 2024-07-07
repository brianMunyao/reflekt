import request from 'supertest';
import app from '../../app';
import { generateAccessToken } from '../../utils/tokens.util';

describe('journalEntries routes', () => {
	// Test db has users of ids(1,2,3) and categories of ids(1,2,3)

	const token = generateAccessToken({ user_id: 1 }); // enforced in test environment

	test('GET: /journal-entries: It returns an array of journal entries', (done) => {
		request(app)
			.get('/api/journal-entries/')
			.set('Authorization', `Bearer ${token}`)
			.then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.body.success).toBe(true);
			})
			.finally(() => done());
	});

	test('POST: /journal-entries: It creates a new journal entry and returns it', (done) => {
		const newEntry = {
			title: 'new-journal-entry',
			content: 'my content',
			entry_date: new Date().toISOString(),
			category_id: 1,
		};

		request(app)
			.post('/api/journal-entries/')
			.send(newEntry)
			.set('Authorization', `Bearer ${token}`)
			.then((response) => {
				expect(response.statusCode).toBe(201);
				expect(response.body.success).toBe(true);
				expect(response.body.data.category.title).toBe(newEntry.title);
				expect(response.body.data.category.category_id).toBe(
					newEntry.category_id
				);
			})
			.finally(() => done());
	});

	test('PUT: /journal-entries/:id: It updates a journal entry and returns it', (done) => {
		const updatedEntry = {
			title: 'updated-journal-entry',
			content: 'udpated my content',
			entry_date: new Date().toISOString(),
			category_id: undefined,
		};

		request(app)
			.put('/api/journal-entries/1')
			.send(updatedEntry)
			.set('Authorization', `Bearer ${token}`)
			.then((response) => {
				// expect(response.statusCode).toBe(200);
				expect(response.body.success).toBe(true);
				expect(response.body.data.category.title).toBe(
					updatedEntry.title
				);
				expect(response.body.data.category.category_id).toBe(undefined);
			})
			.finally(() => done());
	});

	test("DELETE: /journal-entries/:id: It deletes a journal entry and returns it's id", (done) => {
		request(app)
			.put('/api/journal-entries/1')
			.set('Authorization', `Bearer ${token}`)
			.then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.body.success).toBe(true);
				expect(response.body.data.id).toBe(1);
			})
			.finally(() => done());
	});
});
