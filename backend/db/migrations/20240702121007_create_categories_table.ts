import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('categories', (table) => {
		table.increments('category_id').primary();
		table.string('name', 50).notNullable();
		table
			.integer('created_by')
			.notNullable()
			.references('user_id')
			.inTable('users');
		table
			.timestamp('created_at', { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
		table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('categories');
}
