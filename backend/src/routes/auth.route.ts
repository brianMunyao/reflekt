import { Router } from 'express';

import authController from '../controllers/auth.controller';
import validateRequiredParamsMiddleware from '../middlewares/validateRequiredParams.middleware';

const router = Router();

router.post(
	'/login',
	validateRequiredParamsMiddleware(['username', 'password']),
	authController.loginUser
);

router.post(
	'/register',
	validateRequiredParamsMiddleware(['username', 'email', 'password']),
	authController.registerUser
);

export default router;
