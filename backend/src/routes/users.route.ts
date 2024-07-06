import { Router } from 'express';

import verifyAccessTokenMiddleware from '../middlewares/verifyAccessToken.middleware';
import usersController from '../controllers/users.controller';
import validateRequiredParamsMiddleware from '../middlewares/validateRequiredParams.middleware';

const router = Router();

router.put(
	'/',
	verifyAccessTokenMiddleware,
	validateRequiredParamsMiddleware(['username', 'email', 'password']),
	usersController.updateUser
);

export default router;
