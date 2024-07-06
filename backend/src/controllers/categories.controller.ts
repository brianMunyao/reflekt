import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IAuthenticatedRequest } from '../types/IAuthenticatedRequest';
import { HttpError, handleHttpError } from '../utils/errors.util';
import categoriesService from '../services/categories.service';

const getAllCategories = async (req: IAuthenticatedRequest, res: Response) => {
	try {
		if (!req.user)
			throw new HttpError(
				'Unauthorized Access. Please Log in.',
				StatusCodes.UNAUTHORIZED
			);

		const categories = await categoriesService.getAllCategories(
			req.user.user_id
		);

		return res.status(StatusCodes.OK).json({
			success: true,
			data: { categories },
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const getSingleCategory = async (req: IAuthenticatedRequest, res: Response) => {
	try {
		if (!req.user)
			throw new HttpError(
				'Unauthorized Access. Please Log in.',
				StatusCodes.UNAUTHORIZED
			);

		const category = await categoriesService.getSingleCategory(
			req.user.user_id,
			Number(req.params.id)
		);

		return res.status(StatusCodes.OK).json({
			success: true,
			data: { category },
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const createCategory = async (req: IAuthenticatedRequest, res: Response) => {
	try {
		if (!req.user)
			throw new HttpError(
				'Unauthorized Access. Please Log in.',
				StatusCodes.UNAUTHORIZED
			);

		const createdCategory = await categoriesService.createCategory(
			req.user.user_id,
			req.body
		);

		return res.status(StatusCodes.CREATED).json({
			success: true,
			data: { category: createdCategory },
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const updateCategory = async (req: IAuthenticatedRequest, res: Response) => {
	try {
		if (!req.user)
			throw new HttpError(
				'Unauthorized Access. Please Log in.',
				StatusCodes.UNAUTHORIZED
			);

		const updatedCategory = await categoriesService.updateCategory(
			req.user.user_id,
			Number(req.params.id),
			req.body
		);

		return res.status(StatusCodes.OK).json({
			success: true,
			data: { category: updatedCategory },
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const deleteCategory = async (req: IAuthenticatedRequest, res: Response) => {
	try {
		if (!req.user)
			throw new HttpError(
				'Unauthorized Access. Please Log in.',
				StatusCodes.UNAUTHORIZED
			);

		const deletedCategoryId = await categoriesService.deleteCategory(
			req.user.user_id,
			Number(req.params.id)
		);

		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Category deleted successfully',
			data: {
				id: deletedCategoryId,
			},
		});
	} catch (error) {
		handleHttpError(res, error);
	}
};

const categoriesController = {
	getAllCategories,
	getSingleCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};

export default categoriesController;
