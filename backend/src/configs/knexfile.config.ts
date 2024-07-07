import type { Knex } from 'knex';
import path from 'path';

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const knexConfig: Knex.Config = {
	client: 'pg',
	connection: {
		user: process.env.DB_USER,
		password: String(process.env.DB_PASSWORD),
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		database: process.env.DB_NAME,
	},
	migrations: {
		tableName: 'knex_migrations',
		directory: '../../db/migrations',
	},
	seeds: {
		directory: './seeds',
	},
};

export default knexConfig;
