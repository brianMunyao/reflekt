require('dotenv').config();
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';

import authRoutes from './routes/auth.route';
import usersRoutes from './routes/users.route';

const app: Application = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/api/auth/', authRoutes);
app.use('/api/users/', usersRoutes);

app.all('*', (req, res) => {
	console.log(req.url);
	return res
		.status(StatusCodes.NOT_FOUND)
		.json({ error: `The requested service(${req.url}) is not available.` });
});

app.listen(PORT, () => console.log(`Backend service running on PORT: ${PORT}`));
