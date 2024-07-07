import { Knex } from 'knex';

const password = '$2a$10$hP15s7saWH0UVwtKb13C/.T2lJQHF5c4w4anWeFpRY0k2etNfUL92';

export async function seed(knex: Knex): Promise<void> {
	await knex('journal_entries').del();
	await knex('categories').del();
	await knex('users').del();

	// Inserts seed entries
	await knex('users').insert([
		{ username: 'admin', email: 'admin@gmail.com', password },
		{ username: 'admin1', email: 'admin1@gmail.com', password },
		{ username: 'admin2', email: 'admin2@gmail.com', password },
	]);

	// Inserts seed entries
	await knex('categories').insert([
		{ name: 'category 1', icon: 'icon1', user_id: 1 },
		{ name: 'category 2', icon: 'icon2', user_id: 1 },
		{ name: 'category 3', icon: 'icon3', user_id: 1 },
	]);
}
