import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('categories', (table) => {
		table.renameColumn('created_by', 'user_id');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('categories', (table) => {
		table.renameColumn('user_id', 'created_by');
	});
}
