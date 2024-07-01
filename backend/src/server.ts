require('dotenv').config();
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';

const app: Application = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// routers

app.all('*', (_, res) => {
	return res
		.status(StatusCodes.NOT_FOUND)
		.json({ error: 'The requested service is not available.' });
});

app.listen(PORT, () => console.log(`Backend service running on PORT: ${PORT}`));
