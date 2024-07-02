import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('users', (table) => {
		table.increments('user_id').primary();
		table.string('username', 50).unique().notNullable();
		table.string('password', 255).notNullable();
		table.string('email', 100).unique().notNullable();
		table
			.timestamp('created_at', { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
		table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('users');
}
