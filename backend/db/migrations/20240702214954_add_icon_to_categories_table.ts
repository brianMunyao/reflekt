import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table('categories', (table) => {
		table.string('icon').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.table('categories', (table) => {
		table.dropColumn('icon');
	});
}
