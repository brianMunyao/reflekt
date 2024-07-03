import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table('journal_entries', (table) => {
		table.timestamp('entry_date').notNullable().defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.table('journal_entries', (table) => {
		table.dropColumn('entry_date');
	});
}
