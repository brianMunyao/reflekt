import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';

import authRoutes from './routes/auth.route';
import usersRoutes from './routes/users.route';
import categoriesRoutes from './routes/categories.route';
import journalEntriesRoutes from './routes/journalEntries.route';

const app: Application = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/api/auth/', authRoutes);
app.use('/api/users/', usersRoutes);
app.use('/api/categories/', categoriesRoutes);
app.use('/api/journal-entries/', journalEntriesRoutes);

app.all('*', (req, res) => {
	console.log(req.url);
	return res
		.status(StatusCodes.NOT_FOUND)
		.json({ error: `The requested service(${req.url}) is not available.` });
});

export default app;
