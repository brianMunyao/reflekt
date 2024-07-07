import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('journal_entries', (table) => {
		table.increments('entry_id').primary();
		table
			.integer('user_id')
			.notNullable()
			.references('user_id')
			.inTable('users');
		table.string('title', 100).notNullable();
		table.text('content').notNullable();
		table
			.integer('category_id')
			.nullable()
			.references('category_id')
			.inTable('categories');
		table
			.timestamp('created_at', { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
		table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('journal_entries');
}
