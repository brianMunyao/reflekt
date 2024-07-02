// TODO: Separate this to a different service

import pool from '../src/configs/db.config';

const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
      category_id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      created_by INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (created_by) REFERENCES users(user_id)
  );

  CREATE TABLE IF NOT EXISTS journal_entries (
      entry_id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      title VARCHAR(100) NOT NULL,
      content TEXT NOT NULL,
      category_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (user_id) REFERENCES users(user_id),
      FOREIGN KEY (category_id) REFERENCES categories(category_id)
  );
`;

const setupDatabase = async () => {
	let client;
	try {
		client = await pool.connect();

		await client.query(createTablesQuery);

		console.log('Database setup completed successfully.');
	} catch (err) {
		console.error('Error setting up database:', err);
	} finally {
		if (client) {
			client.release();
		}
	}
};

setupDatabase();
