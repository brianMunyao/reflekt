import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
	ssl:
		process.env.NODE_ENV === 'production'
			? { rejectUnauthorized: false } // for security in prod
			: undefined,
});

export default pool;
