import { Router } from 'express';

import verifyAccessTokenMiddleware from '../middlewares/verifyAccessToken.middleware';
import validateRequiredParamsMiddleware from '../middlewares/validateRequiredParams.middleware';
import categoriesController from '../controllers/categories.controller';

const router = Router();

router.get(
	'/',
	verifyAccessTokenMiddleware(),
	categoriesController.getAllCategories
);

router.get(
	'/:id',
	verifyAccessTokenMiddleware(),
	categoriesController.getSingleCategory
);

router.post(
	'/',
	verifyAccessTokenMiddleware(),
	validateRequiredParamsMiddleware(['name', 'icon']),
	categoriesController.createCategory
);

router.put(
	'/:id',
	verifyAccessTokenMiddleware(),
	validateRequiredParamsMiddleware(['name', 'icon']),
	categoriesController.updateCategory
);

router.delete(
	'/:id',
	verifyAccessTokenMiddleware(),
	categoriesController.deleteCategory
);

export default router;
